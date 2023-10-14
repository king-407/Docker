const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_IP,
  REDIS_URL,
  SESSION_SECRET,
  REDIS_PORT,
} = require("./config/config");
const redisClient = redis.createClient({ host: REDIS_URL, port: REDIS_PORT });

const app = express();
app.use(cors({}));
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/user");
const port = process.env.PORT || 3000;
const url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((e) => console.log(e));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialzed: false,
      httpOnly: true,
      maxAge: 60000,
    },
  })
);
app.use(express.json());
app.get("/api", (req, res) => {
  res.send("<h2>Hi rree!!</h2>");
});
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.listen(port, () => console.log(`listening on port ${port}`));
