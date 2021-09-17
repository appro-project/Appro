const knex = require("../database");

const Project = {
    add: (project) => {
        const {title,generalArea,timeToCreate,projectPrice,livingArea,buildingArea,wallMaterial,
            wallThickness,foundation,ceiling,roof,buildingPrice,insulation,insulationThickness,length,width,style,
            isGaragePresent,bedroomCount} = project;
        return knex.insert({
            title,
            generalArea,
            timeToCreate,
            projectPrice,
            livingArea,
            buildingArea,
            wallMaterial,
            wallThickness,
            foundation,
            ceiling,
            roof,
            buildingPrice,
            insulation,
            insulationThickness,
            length,
            width,
            style,
            isGaragePresent,
            bedroomCount
        })
            .returning('id')
            .into('project');
    },

}
module.exports = Project;
