"use strict";

import express from "express";
import mssql from "mssql";

const PORT = 5000;

const app = express();

const sqlConfig = {
  user: "sa",
  password: "12345",
  database: "Publications3",
  port: 1433,
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },
};

async function startApp() {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await mssql.connect(sqlConfig);
    const result = await mssql.query`select * from PUBLICATIONS`;
    console.dir(result);
    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}

startApp();
