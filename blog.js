const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const fs = require("fs");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.post("/submit", (req, res) => {
  const username = req.body.username;
  const content = req.body.blog;
  const email = req.body.email;
  const data =`The user's email is ${email} with the username of ${username}.Posted on the website\n`
  fs.writeFile(
    "./data.txt",
    data,
    {
      encoding: "utf8",
      flag: "a",
    },
    (err) => {
      if (err) {
        throw err;
      } else {
        console.log("Data saved Succesfully");
      }
    }
  );
  res.render("index.ejs", { name: username, blog: content });
});
app.listen(port, () => {
  console.log("Server was started");
});
