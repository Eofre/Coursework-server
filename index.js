"use strict";

import express from "express";
import publRouter from "./routes/publication.router.js";
import subRouter from "./routes/subscriber.router.js";
import subscriptionRouter from "./routes/subscription.router.js";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/publications", publRouter);
app.use("/subscribers", subRouter);
app.use("/subscriptions", subscriptionRouter);

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
