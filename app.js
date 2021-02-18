const express = require("express");
const app = express();
const multer = require('multer');

app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get('/all', (req, res) => {
  res.send('alla');
});

// upload file path
const FILE_PATH = 'uploads';

// configure multer
const upload = multer({
  dest: `${FILE_PATH}/`,
  fileFilter: (req, file, cb) => {
        // allow images only
        if (!file.originalname.match(/\.(jpg|jpeg|pdf|xml)$/)) {
            return cb(new Error('Only jpg, pdf or xml are allowed.'), false);
        }
        cb(null, true);
    }
});

/*
// Access the parse results as request.body
app.post('/uploadfile', (req, res) => {
  let [month, date, year] = new Date().toLocaleDateString("en-US").split("/")
  console.log(req.body.uploadedfile)
  console.log(req.body.name);
  console.log(req.body.description);
  console.log(month,":",date,":", year);
});
*/

app.post('/upload', upload.single('ufile'), async (req,res) => {
  try {
    const file = req.body.ufile;
    console.log(req.file, req.body.ufile);

    if(!file) {
      res.status(400).send({
        status: false,
        data: 'No file is selected'
      });
    } else {
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: file.origlinalname,
          mimetype: file.mimetype,
          size: file.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});


app.listen(3030, () => {
  console.log("server on 3030");
});
