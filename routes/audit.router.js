import express from "express";
import auditController from "../controllers/audit.contoller.js";

const router = express.Router();

router.get("/", auditController.getAudit);

export default router;
