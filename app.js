const express = require("express");
const multer = require('multer');
const path = require('path');

const app = express();

const fileRoute = require('./routes/files');

// configure express to use public folder
app.use(express.static(path.join(__dirname, 'public')));

// configure template engine
app.set('view engine', 'ejs');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// import routes
app.use('/files', fileRoute);

app.listen(3030, () => {
  console.log("server on 3030");
});
