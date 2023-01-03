import sqlConfig from "../configs/db.js";
import mssql from "mssql";

class PublicationController {
  async getPublications(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const result = await mssql.query`select * from PUBLICATIONS`;
      res.json(result.recordset);
    } catch (err) {
      console.log(err);
    }
  }
  async createPublication(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const { title, cost } = req.body;
      const result =
        await mssql.query`INSERT PUBLICATIONS VALUES (${title}, ${cost})`;
      res.json(result.recordset);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new PublicationController();
