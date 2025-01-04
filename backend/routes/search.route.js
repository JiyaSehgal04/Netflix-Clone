import express from "express";
import { searchPerson, searchMovie, searchTV } from "../controllers/search.controller.js";
import { getSearchHistory } from "../controllers/search.controller.js";
import { removeItemFromSearchHistory } from "../controllers/search.controller.js";

const router=express.Router();


router.get("/person/:query",searchPerson);
router.get("/movie/:query",searchMovie);
router.get("/tv/:query",searchTV);



router.get("/history",getSearchHistory);
router.delete("/history/:id",removeItemFromSearchHistory);
 


export default router;