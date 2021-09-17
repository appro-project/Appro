const multer = require("multer");
const knex = require("../database");

const storage = multer.diskStorage({
    // TODO: fix path for images
    destination: "../client/src/assets/img/projects/",
    filename: function(req, file, cb){
        cb(null, file.originalname.toLowerCase().split(' ').join('-'));
    }
});

const Image = {
    upload: multer({
        storage: storage
    }),

    addToFloor: (imageLink, floorId) => {
        return knex('floor')
            .where('id', floorId)
            .update({
                planningImage: imageLink}
            );
    },

    addToProject: (imageLink, projectId) => {
        return knex.insert({
          path: imageLink,
          projectId: projectId
        }).into('project_image');

    }
}

module.exports = Image;
