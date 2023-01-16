import express from "express";
import subscriptionController from "../controllers/subscription.controller.js";

const router = express.Router();

router.get("/", subscriptionController.getSubscriptions);
router.post("/", subscriptionController.createSubscription);
router.delete("/:id", subscriptionController.deleteSubscription);
router.put("/", subscriptionController.updateSubscription);

export default router;
