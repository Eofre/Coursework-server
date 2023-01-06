import sqlConfig from "../configs/db.js";
import mssql from "mssql";

class SubscriberController {
  async getSubscribers(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const result = await mssql.query`select * from SUBSCRIBERS`;
      const key = "FullName";
      const search = (data) => {
        return data.filter((item) => item[key].toLowerCase().includes(query));
      };
      const query = req.query.query;
      if (query === undefined) {
        res.json(result.recordset);
      } else {
        res.json(search(result.recordset));
      }
    } catch (err) {
      console.log(err);
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
      console.log(err.message);
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
