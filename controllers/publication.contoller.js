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
}

export default new PublicationController();
