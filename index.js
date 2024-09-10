import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// init project
import express from "express";
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
import cors from "cors";

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Transform Date API endpoint...
app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;

  const date = !dateParam
    ? new Date() // No date parameter provided
    : /^\d+$/.test(dateParam)
    ? new Date(parseInt(dateParam)) // Unix timestamp
    : new Date(dateParam); // ISO format

  // const date = !dateParam ? new Date() : /^\d+$/.test(dateParam) ? new Date(parseInt(dateParam)) : new Date(dateParam);

  // Validate the date
  if (!date || isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
