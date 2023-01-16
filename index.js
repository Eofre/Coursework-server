"use strict";

import express from "express";
import publicationRouter from "./routes/publication.router.js";
import subscriberRouter from "./routes/subscriber.router.js";
import subscriptionRouter from "./routes/subscription.router.js";
import auditRouter from "./routes/audit.router.js";
import cors from "cors";

const PORT = 5000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use("/publications", publicationRouter);
app.use("/subscribers", subscriberRouter);
app.use("/subscriptions", subscriptionRouter);
app.use("/audit", auditRouter);

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
