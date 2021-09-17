const knex = require("../database");
const Floor = {
    add: (floor) => {
        const {index, area, height, planningImage, projectId} = floor;
        return knex.insert({
            index,
            area,
            height,
            planningImage,
            projectId
        }).returning('id')
            .into('floor');
    }
}

module.exports = Floor;
