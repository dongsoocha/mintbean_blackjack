const mongoose = require("mongoose");
const express = require("express");
const app = express();
const db = require("./server/config/keys.js").mongoURI;
const users = require("./server/routes/api/users");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socketConn = require("./server/socket");
const path = require("path");

// if (process.env.NODE_ENV === 'production') {
app.use(express.static("client/build"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});
// }

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

var http = require("http");
//var server = http.createServer(app);


app.use(passport.initialize());
require("./server/config/passport")(passport);
app.use("/api/users", users);

const port = process.env.PORT || 5000;

const server = http.createServer(app).listen(port);
socketConn.socketConnect(server);
