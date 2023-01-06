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
  async createSubscription(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const { id, index, monthOfSub, startDate } = req.body;
      const result =
        await mssql.query`INSERT SUBSCRIBER_HAS_PUBLICATION VALUES (${index}, ${id}, ${monthOfSub}, ${startDate})`;
      res.json(result.recordset);
    } catch (err) {
      console.log(err);
    }
  }
  async deleteSubscription(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const { id, index, monthOfSub, startDate } = req.body;
      const result =
        await mssql.query`DELETE FROM SUBSCRIBERS WHERE "Index" = ${index} AND "Id" = ${id} AND "MonthOfSub" = ${monthOfSub} AND "StartDate" = ${startDate}`;
      res.json(result.recordset);
    } catch (err) {
      console.log(err.message);
    }
  }
}

export default new SubscriptionController();
