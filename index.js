const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://test:hellotaejim@cluster0.k4syx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

const MSGModel = require("./models/msg");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/api/post",  async function (req, res) {
  const text  = req.body.name;
console.log(text); 
  const newMSG = new MSGModel({
    text: text.toString(),
  });

  await newMSG.save();
});

app.post("/mconn",  async function (req, res) {
  const text  = req.body.name;
console.log(text); 
  const newMSG = new MSGModel({
    text: text.toString(),
  });

  await newMSG.save();
});



/*Only-for-react
app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});
*/


// public static path-template engine
// const static_path = path.join(__dirname + '/public');
// app.use(express.static(static_path));
app.set('view engine', 'hbs');

// Routing
app.get('', (req, res) => {
  res.render("index");
})


app.listen(process.env.PORT || 3000);
module.exports = app;