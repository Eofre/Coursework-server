import sqlConfig from "../configs/db.js";
import mssql from "mssql";

class SubscriberController {
  async getSubscribers(req, res) {
    try {
      await mssql.connect(sqlConfig);

      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit) || 8;
      const query = `%${req.query.query}%` || `%%`;
      const offset = parseInt(page * limit - limit);
      let numberOfsubscribers = 1;

      const result =
        await mssql.query`SELECT * FROM SUBSCRIBERS where FullName like ${query} ORDER BY "ID" OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;

      if (query === `%%`) {
        numberOfsubscribers =
          await mssql.query`SELECT COUNT(*) as count FROM SUBSCRIBERS`;
      } else {
        numberOfsubscribers =
          await mssql.query`SELECT COUNT(*) as count FROM SUBSCRIBERS where FullName like ${query}`;
      }

      const subscribers = result.recordset;

      const numberOfPages = Math.ceil(
        numberOfsubscribers.recordset[0].count / limit
      );

      res.json({ subscribers, numberOfPages });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
  async createSubscriber(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const { fullName, address } = req.body;
      const result =
        await mssql.query`INSERT SUBSCRIBERS VALUES (${fullName}, ${address})`;
      res.json(result.recordset);
    } catch (err) {
      console.log(err);
    }
  }
  async deleteSubscriber(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const id = req.params.id;
      const result =
        await mssql.query`DELETE FROM SUBSCRIBERS WHERE "ID" = ${id}`;
      res.json(result.recordset);
    } catch (err) {
      res.status(456).json({
        message:
          "This entry cannot be deleted because it is used in the Subscription table",
      });
    }
  }
  async updateSubscriber(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const { id, fullName, address } = req.body;
      const result =
        await mssql.query`UPDATE SUBSCRIBERS SET FullName = ${fullName}, Address = ${address} WHERE "ID" = ${id}`;
      res.json(result.recordset);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new SubscriberController();
