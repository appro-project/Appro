const express = require('express');
const router = express.Router();

const Project = require("../model/Project");
const Floor = require("../model/floor");
const Image = require("../model/image");

const image_base_path = `/img/projects`;

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
                .then((floorId) => resp.status(200)
                    .json({floorIndex: floor.index, floorId: floorId, projectId: id}))
                .catch(next);
        }
    }).catch(next);
})

router.post('/:projectId/floor/:floorId/image', Image.upload.single("floorImage"), (req, res, next) => {
    const floorId = req.params.floorId;

    const imageLink = `${image_base_path}/${req.file.originalname.toLowerCase().split(' ').join('-')}`
    Image.addToFloor(imageLink, floorId).then(() =>
        res.status(200)
            .json({
                    success: true,
                    massage: `Image added to project ${req.params.projectId} floor ${req.params.floorId}`
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
            res.status(200)
                .json({
                        success: true,
                        massage: `Image added to project ${projectId}`
                    }
                ));
    }
})

router.post('/:projectId/mainImage', Image.upload.single("mainImage"), (req, res, next) => {
    const projectId = req.params.projectId;
    const imageLink = `${image_base_path}/${req.file.originalname.toLowerCase().split(' ').join('-')}`
    Image.addToProject(imageLink, projectId, true).then(() =>
        res.status(200)
            .json({
                    success: true,
                    massage: `Main image added to project ${projectId}`
                }
            ));
})

module.exports = router;
