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
  const sqlGetQuery = `select * from users;`;
  const results = await database.all(sqlGetQuery);
  response.send(results);
});

app.post("/register", async (request, response) => {
  const {
    full_name,
    email,
    username,
    password,
    phone_number,
    user_type,
    skills,
    location,
    bio,
  } = request.body;
  const sqlGetQuery = `SELECT * FROM users WHERE username = '${username}';`;
  const userData = await database.get(sqlGetQuery);
  if (userData === undefined) {
    if (password.length < 5) {
      response.status(400).json({ message: "Password is too short" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 2);
      const sqlInsertQuery = `INSERT INTO users 
       ( full_name, email, username, password, phone_number, user_type, skills, location, bio) 
       VALUES 
       ('${full_name}','${email}','${username}','${hashedPassword}','${phone_number}','${user_type}','${skills}','${location}','${bio}');`;
      await database.run(sqlInsertQuery);
      response.status(200).json({
        message: "User details submitted successfully!",
        user_id: this.lastID,
        user_details: {
          full_name,
          email,
          username,
          phone_number,
          user_type,
          skills,
          location,
          bio,
        },
      });
    }
  } else {
    response.status(400).json({ message: "User already exists" });
  }
});

app.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const sqlGetQuery = `SELECT * FROM users WHERE username = '${username}';`;
  const userData = await database.get(sqlGetQuery);
  if (userData === undefined) {
    response.status(400).json({
      error: "Invalid User",
    });
  } else {
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      response.status(400);
      response.send("Invalid password");
    } else {
      const payLoad = { username: username, password: password };
      const jwtToken = jwt.sign(payLoad, "secret");
      response
        .status(200)
        .json({ message: "successful login", jwt_token: jwtToken });
    }
  }
});

app.put("/change-password", async (request, response) => {
  const { username, oldPassword, newPassword } = request.body;
  const sqlGetQuery = `SELECT * FROM user WHERE username = '${username}';`;
  const userData = await database.get(sqlGetQuery);
  const isPasswordCorrect = await bcrypt.compare(
    oldPassword,
    userData.password
  );
  if (!isPasswordCorrect) {
    response.status(400);
    response.send("Invalid current password");
  } else {
    if (newPassword.length < 5) {
      response.status(400);
      response.send("Password is too short");
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const sqlUpdateQuery = `UPDATE user SET password = '${hashedPassword}' WHERE username = '${username}';`;
      await database.run(sqlUpdateQuery);
      response.status(200);
      response.send("Password updated");
    }
  }
});

app.get("/workers-data", async (request, response) => {
  const sqlGetQuery = `select * from workers_details;`;
  const results = await database.all(sqlGetQuery);
  response.send(results);
});

app.get("/works-data", async (request, response) => {
  const sqlGetQuery = `select * from work_details;`;
  const results = await database.all(sqlGetQuery);
  response.send(results);
});

app.post("/create-worker-card", async (request, response) => {
  const {
    image_src,
    image_alt,
    badge,
    title,
    rating_value,
    rating_count,
    duration,
    author_name,
    author_description,
    price,
  } = request.body;
  const sqlInsertQuery = `INSERT INTO workers_details
   (image_src, image_alt, badge, title, rating_value, rating_count, duration, author_name, author_description, price)
   VALUES
   ('${image_src}','${image_alt}','${badge}','${title}',${rating_value},${rating_count},'${duration}','${author_name}','${author_description}','${price}');`;
  await database.run(sqlInsertQuery);
  response.status(200);
  response.send("Worker Card Created");
});

app.post("/create-work-card", async (request, response) => {
  const {
    image_src,
    job_title,
    category,
    description,
    location,
    payment,
    deadline,
    posted_by,
    rating,
  } = request.body;
  const sqlInsertQuery = `INSERT INTO work_details 
 (image_src, job_title, category, description, location, payment, deadline, posted_by, rating)
 VALUES ('${image_src}', '${job_title}', '${category}',  '${description}',  '${location}',  '${payment}',  '${deadline}',  '${posted_by}',  ${rating})`;
  await database.run(sqlInsertQuery);
  response.status(200);
  response.send("Work Card Created");
});

module.exports = app;
