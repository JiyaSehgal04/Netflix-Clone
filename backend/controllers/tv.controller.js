import { fetchfromTMDB } from "../services/tmdb.services.js";

export async function getTrendingTV(req,res){

    try{
        const data=await fetchfromTMDB(`https://api.themoviedb.org/3/trending/tv/day?language=en-US`);
        const randomTV = data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({success:true,content: randomTV });//use a generic word

    }
    catch(error){
        console.error(error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export async function getTVTrailers(req,res){
    const{ id }=req.params;

    try{
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        console.log("Trailer data fetched:",data);
        //making it dynamic
        res.json({success: true,trailers: data.results})
        }
     catch(error){
        console.error(error.message);
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal Server Error"});
        

     }
}


export async function getTVDetails (req,res) {

    const { id }=req.params;
    try{
        const data=await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({success:true,content:data});
    }
    catch(error){
        console.error(error.message);
        if(error.message.includes("404")){
            return res.status(404).json({success:false,message:"TV not found"});
        }
        res.status(500).json({success:false,message:"Internal Server Error"});
    }

    } 


export async function getSimilarTV(req,res) {
    try{
        const{ id }=req.params;
        const data=await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success:true, similar:data.results});
    }
     
    catch(error){
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
} 


export async function getTVByCategory(req,res){
    const {category}=req.params;
    try{
        const data=await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({success:true,content:data.results});
        }
        catch(error){
            res.status(500).json({success:false,message:"Internal Server Error"});
        }
}
