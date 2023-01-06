import express from "express";
import subscriberController from "../controllers/subscriber.controller.js";

const router = express.Router();

router.get("/", subscriberController.getSubscribers);
router.post("/", subscriberController.createSubscriber);
router.delete("/:id", subscriberController.deleteSubscriber);
router.put("/", subscriberController.updateSubscriber);

export default router;
