const express = require("express");
const formidable = require('express-formidable');
const fs = require("fs");

/* Create Express app */
const app = express();

/* Express Configuration */
app.use(formidable());
app.use(express.static("frontend"));

/* API for all routes */
app.post('/upload', (req, res) => {
  debugger;
  const file = req.files.file;

  fs.copyFile(
    file.path,
    "frontend/resources/" + file.name,
    err => {
      if (err) {
        console.log(err);
        return;
      }

      console.log(file.name + ' was copied to destination.txt');
    }
  );

  //Response
  res
    .status(200)
    .send(file);
});

app.listen(3004, () => {
  console.log('Drag and Drop 2 APP listening on port 3004!');
});
