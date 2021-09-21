const express = require("express");
const redis = require("redis");
const session = require("express-session");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();

const app = express();

redisClient.on("error", console.error);

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: "keyboard cat",
    resave: false,
  })
);

app.listen(3002, () => {
  console.log("App Listening on port 3002");
});
