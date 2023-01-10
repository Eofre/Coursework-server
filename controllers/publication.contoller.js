import sqlConfig from "../configs/db.js";
import mssql from "mssql";

class PublicationController {
  async getPublications(req, res) {
    try {
      await mssql.connect(sqlConfig);

      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit) || 8;
      const query = `%${req.query.query}%` || `%%`;
      const offset = parseInt(page * limit - limit);
      let numberOfpublications = 1;

      const result =
        await mssql.query`SELECT * FROM PUBLICATIONS where NamePublication like ${query} ORDER BY "Index" OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;

      if (query === `%%`) {
        numberOfpublications =
          await mssql.query`SELECT COUNT(*) as count FROM PUBLICATIONS`;
      } else {
        numberOfpublications =
          await mssql.query`SELECT COUNT(*) as count FROM PUBLICATIONS where NamePublication like ${query}`;
      }

      const publications = result.recordset;

      const numberOfPages = Math.ceil(
        numberOfpublications.recordset[0].count / limit
      );

      res.json({ publications, numberOfPages });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
  async createPublication(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const { titlePublication, costPublication } = req.body;
      const result =
        await mssql.query`INSERT PUBLICATIONS VALUES (${titlePublication}, ${costPublication})`;
      res.json(result.recordset);
    } catch (err) {
      let messageErrorMoney =
        "Cannot convert a char value to money. The char value has incorrect syntax.";
      if (err.message === messageErrorMoney) {
        res.status(500).json({ message: "The cost cannot be a string" });
      }
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
      res.status(456).json({
        message:
          "This entry cannot be deleted because it is used in the Subscription table",
      });
      console.log({ message: "Данная запись не может быть удалена" });
    }
  }
  async updatePublication(req, res) {
    try {
      await mssql.connect(sqlConfig);
      const { id, titlePublication, costPublication } = req.body;
      const result =
        await mssql.query`UPDATE PUBLICATIONS SET NamePublication = ${titlePublication}, Cost = ${costPublication} WHERE "Index" = ${id}`;
      res.json(result.recordset);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new PublicationController();
