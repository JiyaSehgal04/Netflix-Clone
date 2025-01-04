import axios from 'axios';
//fetch data from the api
import { ENV_VARS } from '../config/enVars.js';

  
//   fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


export const fetchfromTMDB= async (url) => {

const options = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+ENV_VARS.TMDB_API_KEY
    }
  };

  try{
    const response = await axios.get(url, options);
    if(response.status !=200){
      throw new Error('Failed to fetch data');
    }
    return response.data;
  }

  catch(error){
    console.error('Error in fetchfromTMBD:',error.message);
    throw error;
  }
};