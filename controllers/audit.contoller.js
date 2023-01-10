import sqlConfig from "../configs/db.js";
import mssql from "mssql";

class AuditController {
  async getAudit(req, res) {
    try {
      await mssql.connect(sqlConfig);

      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit) || 8;
      const offset = parseInt(page * limit - limit);

      const result =
        await mssql.query`SELECT * FROM SimpleAudit ORDER BY "ID" OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;

      const numberOfEvents =
        await mssql.query`SELECT COUNT(*) as count FROM SimpleAudit`;

      const events = result.recordset;

      const numberOfPages = Math.ceil(
        numberOfEvents.recordset[0].count / limit
      );

      res.json({ events, numberOfPages });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
}

export default new AuditController();
