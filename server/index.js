require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const app = express();
const partFinder = require("./controllers/partFinder");

const options = {
  socketPath: process.env.SOCKET_PATH,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

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

app.get("/api/makes/:year", partFinder.getMakesByYear);
app.get("/api/models/:year/:make", partFinder.getModelsByMake);
app.get("/api/submodels/:year/:make/:model", partFinder.getSubmodelsByModel);
app.get("/api/engines/:submodel", partFinder.getEnginesBySubmodel);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(3003, () => {
  console.log(`App Listening on port ${3003}`);
});
