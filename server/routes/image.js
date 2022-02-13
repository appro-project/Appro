const express = require('express');
const router = express.Router();

const Image = require("../model/image");

router.delete('/', (req, resp, next) => {
    const { images } = req.body;
    images.forEach(image => Image.deleteFromFS(image));
})

module.exports = router;
