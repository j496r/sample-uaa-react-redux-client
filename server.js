// Backend server hosting the react application
// Changed it to http server, and removed dead "silent_renew" part
var http = require("http");
var path = require("path");

var express = require("express");
var app = express();

app.set("port", process.env.PORT || 9090);

app.use(function(req, res, next) {
  if (path.extname(req.path).length <= 0) {
    req.url = "/index.html";
  }
  next();
});

// I do not see how this all can work without something like this:
app.get("/conf.json", (req, res) => {
  res.sendFile(__dirname + "/public/conf.json");
});

// Serve files automatically from "dist" folder
app.use(express.static(__dirname + "/dist"));

// This part is probably to over do it... we already serve the static parts in dist
app.get("/", function(req, res) {
    res.sendFile("index.html", {
      root: __dirname + "/dist"
    });
  });

var httpServer = http.createServer(app);
httpServer.listen(app.get("port"), function() {
  console.log("The server is listening on port", app.get("port"));
});
