import express from "express";
import publicationController from "../controllers/publication.contoller.js";

const router = express.Router();

router.get("/", publicationController.getPublications);
router.post("/", publicationController.createPublication);
router.delete("/:id", publicationController.deletePublication);

export default router;
