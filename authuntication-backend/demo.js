const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const dbpath = path.join(__dirname, "appData.db");
let database = null;

const initializeDatabaseAndServer = async () => {
  try {
    database = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("\nServer is Running at: http://localhost:3000\n");
    });
  } catch (error) {
    console.log(error);
  }
};

initializeDatabaseAndServer();

app.get("/demo", async (request, response) => {
  const sqlGetQuery = `select * from work_card;`;
  const results = await database.all(sqlGetQuery);
  response.send(results);
});
