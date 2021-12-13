const multer = require("multer");
const knex = require("../database");

const imageDestination = process.env.NODE_ENV === 'production' ? '/appro/images/' : "../client/public/img/projects/";
const storage = multer.diskStorage({
    destination: imageDestination,
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
                planning_image: imageLink}
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
