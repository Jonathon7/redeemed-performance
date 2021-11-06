require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const mysql = require("mysql2");
const MySQLStore = require("express-mysql-session")(session);
const app = express();

const options = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DATABASE,
};

const connection = mysql.createConnection(options);
connection.connect((err) => console.log(err));

const sessionStore = new MySQLStore(options);

app.use(
  session({
    store: sessionStore,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: false,
  })
);

app.use(express.static(`${__dirname}/../build`));

app.get("/api/makes", (req, res) => {
  connection.query(
    "SELECT * FROM CarQueryAPI WHERE model_make_id = 'toyota';",
    function (error, results, fields) {
      if (error) throw error;

      console.log(results);
      res.status(200).json(results);
    }
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(3003, () => {
  console.log(`App Listening on port ${3003}`);
});
