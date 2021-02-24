const express = require("express");
const router = express.Router();
const multer = require('multer');
let fileModel = require('../models/file');

var addedFiles = [];
var aFile = 'this file';

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

router.get('/all', (req, res) => {
  let description = req.body.description;
  res.render('file', {fileName: aFile, description: description});
});

router.post('/upload', upload.single('ufile'), async (req,res) => {
  try {
    const file = req.file;
    console.log(req.file);

    if(!file) {
      res.status(400).send({
        status: false,
        data: 'No file is selected'
      });
    } else {
      res.send({
        status: true,
        message: 'File is uploaded',
      });
      const fileName = file.origlinalname;
      const type = file.mimetype;
      const owner = req.body.name;
      const description = req.body.description;
      const today = new Date();
      const date = today.toLocaleDateString('en-US');
      let fileToAdd = new fileModel(file, type, fileName, owner, description, date);
      addedFiles.push(fileToAdd);
      console.log(addedFiles);
    }
  } catch (err) {
    res.status(500).send(err);
  }

});

module.exports = router, addedFiles;
