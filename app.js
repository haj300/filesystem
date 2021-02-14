const express = require("express");
const app = express();

app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
app.post('/', function(req, res){
    console.log(req.body.name);
    console.log(req.body.description);
});

app.listen(3030, () => {
  console.log("server on 3030");
});
