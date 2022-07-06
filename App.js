const express = require("express");
const app = express();
const port = 3019;
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "hbs"); //template engine to use
app.use("/auth", require("./routes/auth")); // endpoint and require
app.use("/", require("./routes/adminRoutes"));

app.listen(port, function () {
  console.log(`Server started at http:/localhost:${port}`);
});
