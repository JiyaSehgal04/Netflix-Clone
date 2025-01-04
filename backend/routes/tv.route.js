import express from "express";

import { getTVTrailers } from "../controllers/tv.controller.js";
import { getTrendingTV } from "../controllers/tv.controller.js";
import { getTVDetails } from "../controllers/tv.controller.js";
import { getSimilarTV}from "../controllers/tv.controller.js";
import { getTVByCategory }from "../controllers/tv.controller.js";


const router = express.Router();

router.get("/trending",getTrendingTV);
router.get("/:id/trailers",getTVTrailers);
router.get("/:id/details",getTVDetails); 
router.get("/:id/similar",getSimilarTV);
router.get("/:category",getTVByCategory);

export default router;