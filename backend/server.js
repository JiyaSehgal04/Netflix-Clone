import express from "express"; 


import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import { ENV_VARS } from "./config/enVars.js";

import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const PORT= ENV_VARS.PORT

// console.log("MONGO_URI: ",process.env.MONGO_URI);
//IMPORTANT
app.use(express.json());//to use req.body-->allow us to use it
app.use(cookieParser());

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);


app.listen(PORT, () => {
    console.log("Server started at http://localhost:"+ PORT); 
    connectDB();
    // Change https to http
});


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+ ENV_VARS.TMDB_API_KEY
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err)); 












