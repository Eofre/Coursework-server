import express from "express";
import subscriberController from "../controllers/subscriber.controller.js";

const router = express.Router();

router.get("/", subscriberController.getSubscribers);

export default router;
