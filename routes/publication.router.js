import express from "express";
import publicationController from "../controllers/publication.contoller.js";

const router = express.Router();

router.get("/", publicationController.getPublications);

export default router;
