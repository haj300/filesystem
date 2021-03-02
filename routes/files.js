const express = require("express");
const multer = require('multer');
const router = express.Router();
const fileModel = require('../models/file');
const path = require('path');

// store fileModels
var addedFiles = [];

// upload file path
const FILE_PATH = 'uploads';

// configure multer
const upload = multer({
  dest: `${FILE_PATH}/`,
  fileFilter: (req, file, cb) => {
        // allow jpeg, pdf and xml only
        if (!file.originalname.match(/\.(jpg|jpeg|pdf|xml)$/)) {
            return cb(new Error('Only jpg, pdf or xml are allowed.'), false);
        }
        cb(null, true);
    }
});

// show all uploaded files
router.get('/all', (req, res) => {
  res.render('file', {array: addedFiles});
});

// show newly uploaded file
router.get('/uploads/:id', (req, res) => {
  const fileId = req.params.id;
  const pathToFile = path.join(__dirname, '..', 'uploads', fileId);
  res.sendFile(pathToFile);
});

// upload new file locally
router.post('/upload', upload.single('ufile'), async (req,res) => {
  try {
    // assign uploaded multer file
    const file = req.file;

    // check if file exists
    if(!file) {
      res.status(400)
      .send({
        status: false,
        data: 'No file is selected'
      });
    }
    else {
      res.status(200)
      .render('index',{
        status: true,
        filepath: path.join(req.file.path),
      });
      // create filemodel from form
      const fileName = file.origlinalname;
      const type = file.mimetype;
      const owner = req.body.name;
      const description = req.body.description;
      const today = new Date();
      const date = today.toLocaleDateString('en-US');
      const pathToFile = file.path;

      const fileToAdd = new fileModel(file, type, fileName, owner, description, date, pathToFile);
      addedFiles.push(fileToAdd);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router, addedFiles;
