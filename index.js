"use strict";

import express from "express";
import publRouter from "./routes/publication.router.js";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use("/publications", publRouter);

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
