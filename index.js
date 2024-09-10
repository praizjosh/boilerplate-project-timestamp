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
  // const isValidISODate = /\d{5,}/.test(dateParam);
  // const isValidISODate = /^\d{4}-\d{2}-\d{2}$/.test(dateParam);

  const date = !dateParam
    ? new Date() // No date parameter provided
    : /^\d+$/.test(dateParam)
    ? new Date(parseInt(dateParam)) // Unix timestamp
    : // : isValidISODate // isValid date format
      new Date(dateParam); // ISO format
  // : null; // Invalid format

  // Validate the date
  if (!date || isNaN(date.getTime())) {
    return res.json({ error : "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// app.get("/api/:date?", function (req, res) {
//   const dateParam = req.params.date;

//   // If no date parameter is provided, return the current date
//   if (!dateParam) {
//     const now = new Date();
//     return res.json({
//       unix: now.getTime(),
//       utc: now.toUTCString(),
//     });
//   }

//   // If dateParam is a valid Unix timestamp or any string that can be parsed by new Date()
//   let date;
//   if (/^\d+$/.test(dateParam)) {
//     // If it's a Unix timestamp (all digits), parse as an integer
//     date = new Date(parseInt(dateParam));
//   } else {
//     // Attempt to parse any other date string using the built-in Date parser
//     date = new Date(dateParam);
//   }

//   // Validate the date
//   if (isNaN(date.getTime())) {
//     return res.json({ error: "Invalid Date" });
//   }

//   // Return the parsed date in Unix and UTC formats
//   res.json({
//     unix: date.getTime(),
//     utc: date.toUTCString(),
//   });
// });


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
