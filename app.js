const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
require('dotenv').config();

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/exit', (req, res) => {
  process.exit(0);
});

app.get('/cpu-maximum', (req, res) => {
    let i = 0;
    while (i < 1000000000000000){
        i++;
        console.log(i);
    }
    res.send('Poor CPU :(');
});

app.post("/users", (req, res) => {
  const data = req.body;
  connection.query("INSERT INTO users SET ?", data, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.status(201).send("User inscrit !");
    }
  });
});

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.status(200).json(results);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
