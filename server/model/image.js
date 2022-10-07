const fs = require('fs')
const multer = require("multer");
const knex = require("../database");

const imageDestination = process.env.NODE_ENV === 'production' ? '/appro/images/' : "../client/public/img/projects/";
const photoDestination = process.env.NODE_ENV === 'production' ? '/appro/photos/' : "../client/public/photos/projects/";
const storage = (destination) => multer.diskStorage({
    destination,
    filename: function(req, file, cb){
        cb(null, file.originalname.toLowerCase().split(' ').join('-'));
    }
});

const Image = {
    upload: multer({
        storage: storage(imageDestination)
    }),
    uploadPhotos: multer({
        storage: storage(photoDestination)
    }),

    deleteFromFS: (file) => {
        return fs.unlink(file, (res) => console.log(res) )
    },

    deleteFromProject: (images) => {
        console.log('images to delete', images)
        return knex('project_image')
            .whereIn('path', images)
            .del()

    },

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
          is_photo: false,
        }).into('project_image');
    },

    addPhoto: (imageLink, projectId, isMain = false) => {
        return knex.insert({
          path: imageLink,
          project_id: projectId,
          is_main: isMain,
          is_photo: true,
        }).into('project_image');
    },

    findByProjectId: (projectId) => {
        return knex.from("project_image as pi")
            .select("pi.path" )
            .where('pi.project_id', '=', projectId)
    }
}

module.exports = Image;
