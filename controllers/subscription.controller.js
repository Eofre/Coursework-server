import sqlConfig from "../configs/db.js";
import mssql from "mssql";

class SubscriptionController {
  async getSubscriptions(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const result =
        await mssql.query`select * from SUBSCRIBER_HAS_PUBLICATION`;
      res.json(result.recordset);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new SubscriptionController();
