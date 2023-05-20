const express = require('express');
const router = express.Router();

const Image = require("../model/image");

router.delete('/', (req, resp, next) => {
    const { images } = req.body;
    console.log('images to unlink', images);
    images.forEach(image => Image.deleteFromFS(image));

    resp.sendStatus(200);
})

module.exports = router;
