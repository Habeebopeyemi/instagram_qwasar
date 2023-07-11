const express = require("express");

const app = express();
const PORT = 5000;

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
