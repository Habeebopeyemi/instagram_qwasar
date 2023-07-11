const express = require("express");
const mongoose = require("mongoose");
const { MONGODBURI } = require("./keys");

const app = express();
const PORT = 5000;

mongoose.connect(MONGODBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connection to mongodb database successful");
});
mongoose.connection.on("error", err => {
  console.log("error connecting ", err);
});

const customMiddleware = (req, res, next) => {
  console.log("middleware executed!!");
  next();
};
/*middle run for every request */
// app.use(customMiddleware);

app.get("/", (req, res) => {
  res.send("hello world");
});

/*middle run for only /about request */

app.get("/about", customMiddleware, (req, res) => {
  console.log("about");
  res.send("about page");
});

app.listen(PORT, () => {
  console.log("server is running on ", PORT);
});
