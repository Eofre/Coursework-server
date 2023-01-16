import sqlConfig from "../configs/db.js";
import mssql from "mssql";

class SubscriptionController {
  // SUBSCRIBER_HAS_PUBLICATION
  async getSubscriptions(req, res) {
    try {
      await mssql.connect(sqlConfig);

      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit) || 8;
      const query = `%${req.query.query}%` || `%%`;
      const offset = parseInt(page * limit - limit);
      let numberOfSubscriptions = 1;

      const result =
        await mssql.query`SELECT * FROM SUBSCRIBER_HAS_PUBLICATION where ID like ${query} ORDER BY "idEntry" OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;

      if (query === `%%`) {
        numberOfSubscriptions =
          await mssql.query`SELECT COUNT(*) as count FROM SUBSCRIBER_HAS_PUBLICATION`;
      } else {
        numberOfSubscriptions =
          await mssql.query`SELECT COUNT(*) as count FROM SUBSCRIBER_HAS_PUBLICATION where ${type} like ${query}`;
      }

      const subscriptions = result.recordset;

      const numberOfPages = Math.ceil(
        numberOfSubscriptions.recordset[0].count / limit
      );
      for (let i = 0; i < subscriptions.length; i++) {
        subscriptions[i].StartDate = String(subscriptions[i].StartDate);
      }
      res.json({ subscriptions, numberOfPages });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
  async createSubscription(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const { indexPublication, idSubscriber, monthOfSub, startDate } =
        req.body;
      const result =
        await mssql.query`INSERT SUBSCRIBER_HAS_PUBLICATION VALUES (${indexPublication}, ${idSubscriber}, ${monthOfSub}, ${startDate})`;
      res.json(result.recordset);
    } catch (err) {
      let messageError = `The INSERT statement conflicted with the CHECK constraint "CHK_StartDate". The conflict occurred in database "Publications3", table "dbo.SUBSCRIBER_HAS_PUBLICATION", column 'StartDate'.`;
      if (err.message === messageError) {
        res.status(500).json({
          message: "It is impossible to set a date that has not yet occurred",
        });
      }
      console.log(err);
    }
  }
  async deleteSubscription(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const id = req.params.id;
      const result =
        await mssql.query`DELETE FROM SUBSCRIBER_HAS_PUBLICATION WHERE "idEntry" = ${id}`;
      res.json(result.recordset);
    } catch (err) {
      console.log(err.message);
    }
  }
  async updateSubscription(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const { idEntry, indexPublication, idSubscriber, monthOfSub, startDate } =
        req.body;
      const result =
        await mssql.query`UPDATE SUBSCRIBER_HAS_PUBLICATION SET "Index" = ${indexPublication}, ID = ${idSubscriber},  MonthOfSub = ${monthOfSub}, StartDate = ${startDate} WHERE "idEntry" = ${idEntry}`;
      res.json(result.recordset);
    } catch (err) {
      let messageError = `The INSERT statement conflicted with the CHECK constraint "CHK_StartDate". The conflict occurred in database "Publications3", table "dbo.SUBSCRIBER_HAS_PUBLICATION", column 'StartDate'.`;
      if (err.message === messageError) {
        res.status(500).json({
          message: "It is impossible to set a date that has not yet occurred",
        });
      }
      console.log(err);
    }
  }
}

export default new SubscriptionController();
