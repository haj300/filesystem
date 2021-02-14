const express = require("express");
const app = express();

app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get('/', (req, res) => {
  req.sendfile("nåt");
});

// Access the parse results as request.body
app.post('/', (req, res) => {
    let [month, date, year] = new Date().toLocaleDateString("en-US").split("/")
    console.log(req.body.uploadedfile)
    console.log(req.body.name);
    console.log(req.body.description);
    console.log(month,":",date,":", year);
});

app.listen(3030, () => {
  console.log("server on 3030");
});
