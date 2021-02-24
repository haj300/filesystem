const express = require("express");
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// import routes
const route = require('./routes/files');
app.use('/', route);

app.listen(3030, () => {
  console.log("server on 3030");
});
