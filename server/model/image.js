const fs = require('fs')
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
        }).into('project_image');

    },
    findByProjectId: (projectId) => {
        return knex.from("project_image as pi")
            .select("pi.path" )
            .where('pi.project_id', '=', projectId)
    }
}

module.exports = Image;
