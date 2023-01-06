import sqlConfig from "../configs/db.js";
import mssql from "mssql";

class PublicationController {
  async getPublications(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const result = await mssql.query`select * from PUBLICATIONS`;
      const key = "NamePublication";
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
  async deletePublication(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const id = req.params.id;
      const result =
        await mssql.query`DELETE FROM PUBLICATIONS WHERE "Index" = ${id}`;
      res.json(result.recordset);
    } catch (err) {
      console.log(err.message);
    }
  }
  async updatePublication(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const { id, title, cost } = req.body;
      const result =
        await mssql.query`UPDATE PUBLICATIONS SET NamePublication = ${title}, Cost = ${cost} WHERE "Index" = ${id}`;
      res.json(result.recordset);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new PublicationController();
