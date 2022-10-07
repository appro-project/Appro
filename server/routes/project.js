const express = require('express');
const router = express.Router();

const Project = require("../model/project");
const Floor = require("../model/floor");
const Image = require("../model/image");

const image_base_path = `${(process.env.NODE_ENV === 'production') ? `/images` : '../client/public/img/projects'}`;
const photo_base_path = `${(process.env.NODE_ENV === 'production') ? `/photos` : '../client/public/photos/projects'}`;

router.get('/', (req, res, next) => {
    Project.findAll()
        .then(projects => res.status(200).json(projects))
        .catch(next);
})

router.get('/:projectId', (req, res, next) => {
    Project.findById(req.params.projectId)
        .then(project => res.status(200).json(project))
        .catch(next);
})

router.post('/', (req, resp, next) => {
    const project = req.body;
    Project.add(project).then(id => {
        for (const floor of project.floorList) {
            floor.projectId = Number(id);
            Floor.add(floor)
                .catch(next);
        }
        return id;
    }).then((id) => resp.status(200)
        .json({projectId: id}))
        .catch(next);
})

router.put('/:projectId', (req, resp, next) => {
    const project = req.body;
    const { projectId } = req.params;
    Project.update(project).then(() => {
        for (const floor of project.floorList) {
            Floor.update(floor)
                .catch(next);
        }
        const {imagesToDelete, photosToDelete} = project;
        if (imagesToDelete && imagesToDelete.length){
            console.log(projectId, imagesToDelete)
            Image.deleteFromProject(imagesToDelete)
                .catch(next);
        }
        if (photosToDelete && photosToDelete.length){
            console.log(projectId, photosToDelete)
            Image.deleteFromProject(photosToDelete)
                .catch(next);
        }
    }) .then(( ) => resp.status(200)
        .json({projectId: projectId}))
        .catch(next);
})

router.delete('/:projectId', (req, resp, next) => {
    const { projectId } = req.params;
    Project.delete(projectId).then(() => resp.status(200)
        .json({projectId: projectId}))
        .catch(next);
})

router.post('/:projectId/floor/:floorId/image', Image.upload.single("floorImage"), (req, res, next) => {
    const floorId = req.params.floorId;

    const imageLink = `${image_base_path}/${req.file.originalname.toLowerCase().split(' ').join('-')}`
    Image.addToFloor(imageLink, floorId).then(() =>
        res.status(200)
            .json({
                    success: true,
                    message: `Image added to project ${req.params.projectId} floor ${req.params.floorId}`
                }
            ))
        .catch(next);
})

router.post('/:projectId/images', Image.upload.array("projectImages", 20), (req, res, next) => {
    const projectId = req.params.projectId;
    const {files} = req;
    for (const file of files) {
        const imageLink = `${image_base_path}/${file.originalname.toLowerCase().split(' ').join('-')}`
        Image.addToProject(imageLink, projectId).then(() =>
            console.log(`Image ${imageLink} added to project ${projectId}`)
        );
    }
    res.status(200)
        .json({
                success: true,
                message: `Images added to project ${projectId}`
            }
        )
})

router.post('/:projectId/photos', Image.uploadPhotos.array("projectPhotos", 20), (req, res, next) => {
    const projectId = req.params.projectId;
    const {files} = req;
    for (const file of files) {
        const link = `${photo_base_path}/${file.originalname.toLowerCase().split(' ').join('-')}`
        Image.addPhoto(link, projectId).then(() =>
            console.log(`Photo ${link} added to project ${projectId}`)
        );
    }
    res.status(200)
        .json({
                success: true,
                message: `Photos added to project ${projectId}`
            }
        )
})

router.post('/:projectId/mainImage', Image.upload.single("mainImage"), (req, res, next) => {
    const projectId = req.params.projectId;
    const imageLink = `${image_base_path}/${req.file.originalname.toLowerCase().split(' ').join('-')}`
    Image.addToProject(imageLink, projectId, true).then(() =>
        res.status(200)
            .json({
                    success: true,
                    message: `Main image added to project ${projectId}`
                }
            ));
})

router.patch('/:projectId', (req, resp, next) => {
  const config = req.body;
  const { projectId } = req.params;
  Project.updateConfig(projectId, config)
    .then((data) => resp.status(200).json(data))
    .catch(next);
});

module.exports = router;
