import mssql from "mssql";

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

export default sqlConfig;
