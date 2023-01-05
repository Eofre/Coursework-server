"use strict";

import express from "express";
import publicationRouter from "./routes/publication.router.js";
import subscriberRouter from "./routes/subscriber.router.js";
import subscriptionRouter from "./routes/subscription.router.js";
import cors from "cors";

const PORT = 5000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use("/publications", publicationRouter);
app.use("/subscribers", subscriberRouter);
app.use("/subscriptions", subscriptionRouter);

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
