const multer = require("multer");
const knex = require("../database");

const storage = multer.diskStorage({
    // TODO: fix path for images
    destination: "../client/public/img/projects/",
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

    addToProject: (imageLink, projectId, isMain = false) => {
        return knex.insert({
          path: imageLink,
          project_id: projectId,
          is_main: isMain,
        }).into('project_image');

    }
}

module.exports = Image;
