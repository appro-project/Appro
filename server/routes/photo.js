const express = require('express');

const router = express.Router();

const Image = require("../model/image");

router.delete('/', (req, resp, next) => {
  const { photos } = req.body;
  console.log('photos to unlink', photos);
  photos.forEach(image => Image.deleteFromFS(image));
  resp.sendStatus(200);
})

module.exports = router;
