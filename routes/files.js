const express = require("express");
const router = express.Router();
const multer = require('multer');
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
        // console.log(file);
        cb(null, true);
    }
});

router.get('/all', (req, res) => {
  res.send('alla');
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

module.exports = router;
