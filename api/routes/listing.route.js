import express from "express";
import { createListing } from "../controllers/listing.controllers.js";
import { verifyToken } from "../util/verifyUser.js";

const router =express.Router();

router.post("/create", verifyToken ,createListing);

export default router;