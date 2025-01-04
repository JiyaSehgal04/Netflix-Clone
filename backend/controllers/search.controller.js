import { fetchfromTMDB } from "../services/tmdb.services.js";
import { User } from "../models/user.model.js";



export async function searchPerson(req,res){
    const{ query }=req.params;
try{
    const response=await fetchfromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
     if(response.results.length==0){
        return res.status(404).json({message:"Person not found"});
     }
     //if the person is found
     res.status(200).json({success:true,content:response.results});
     await User.findByIdAndUpdate(req.user._id, {
        $push:{
            searchHistory:{
                id:response.results[0].id,
                image:response.results[0].profile_path,
                title:response.results[0].name,
                searchType:"person",
                createdAt: new Date(),
            },
        },
     });
}
catch(error){
    console.log("Error in searchPerson controller:",error.message);
    return res.status(500).json({message:"Error searching person"});
}
}

//we must also store the search history

export async function searchMovie(req,res){
    const{ query }=req.params;
    try{
        const response=await fetchfromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length ==0){
            return res.status(404).json({message:"Movie not found"});
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchType:"movie",
                    createdAt: new Date(),
                },
            },
        });


    res.status(200).json({success:true,content:response.results});

    }catch(error){
    console.log("Error in searchMovie controller:",error.message);
    return res.status(500).json({success:false, message:"Error searching movie"});
}
}

export async function searchTV(req,res) {
    const{ query }=req.params;
    try{
        const response =await fetchfromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length ==0){
            return res.status(404).json({message:"TV not found"});
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType:"tv",
                    createdAt: new Date(),
                },
            },
        });
    }
    catch(error){ 
    console.log("Error in searchTV controller:",error.message);
    return res.status(500).json({success:false, message:"Error searching tv"});
    }
    
}



export async function getSearchHistory(req,res){
    try{
        res.status(200).json({success:true,content: req.user.searchHistory });
    }catch(error){
        console.log("Error in getSearchHistory controller:",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}
 

export async function removeItemFromSearchHistory(req,res){
    let { id }=req.params;
    // console.log(typeof id);

    id= parseInt(id);

    try{
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                searchHistory:{id: id},
            },
        });

        res.status(200).json({success:true,content:"Item removed from search history" });
    }catch(error){
        console.log("Error in getSearchHistory controller:",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}