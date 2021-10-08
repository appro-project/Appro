const knex = require("../database");
const Floor = {
    add: (floor) => {
        const {index, area, height, isAttic, isBasement, planningImage, projectId} = floor;
        return knex.insert({
            index,
            area,
            height,
            is_attic: isAttic,
            is_basement: isBasement,
            planning_image: planningImage,
            project_id: projectId
        }).returning('id')
            .into('floor');
    }
}

module.exports = Floor;
