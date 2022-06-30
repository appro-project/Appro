const _ = require('underscore');
const knex = require("../database");

const mapToProjects = (data) => {
    return _.chain(data).groupBy(function (project) {
        return project.id;
    }).map(pr => mapToProject(pr)).value()
}

const mapToProject = (data) => {
    const project = _.chain(data).first().pick(
        'id',
        'title',
        'description',
        'popularity',
        'general_area',
        'project_price',
        'building_price',
        'time_to_create',
        'living_area',
        'building_area',
        'wall_material',
        'wall_thickness',
        'foundation',
        'ceiling',
        'roof',
        'insulation',
        'insulation_thickness',
        'length',
        'width',
        'style',
        'is_garage_present',
        'bedroom_count',
        'mainImage',
        'images',
        'showOnMain'
      ).value();
    project.floorList = _.map(data, function (p) {
        return {
            'floor_id': p.floor_id,
            'index': p.floor_index,
            'area': p.floor_area,
            'height': p.floor_height,
            'planning_image': p.floor_image,
            'isAttic': p.is_attic,
            'isBasement': p.is_basement,
        };
    })
    if (project.images) {
        project.images = project.images.split(',');
    }
    return project;
}

const getProjectQueryBuilder = () => {
    const imagesQuery = knex.raw('string_agg(i.path, \',\' ORDER BY i.is_main desc)');
  const projectConfigQuery = knex.raw('(select pc.showonmain from project_config pc where pc.project_id = p.id)');
    const mainImageQuery = knex.raw('(select pi.path from project_image pi where pi.is_main = true and pi.project_id = p.id)');
    return knex.from('project as p')
        .select('p.id',
            'p.title',
            'p.description',
            'p.popularity',
            'p.general_area',
            'p.project_price',
            'p.building_price',
            'p.time_to_create',
            'p.living_area',
            'p.building_area',
            'p.wall_material',
            'p.wall_thickness',
            'p.foundation',
            'p.ceiling',
            'p.roof',
            'p.insulation',
            'p.insulation_thickness',
            'p.length',
            'p.width',
            'p.style',
            'p.is_garage_present',
            'p.bedroom_count',
            'f.id as floor_id',
            'f.index as floor_index',
            'f.area as floor_area',
            'f.height as floor_height',
            'f.planning_image as floor_image',
            'f.is_attic',
            'f.is_basement',
            {mainImage: mainImageQuery},
            { showOnMain: projectConfigQuery },
            {'images': imagesQuery}
        )
        .leftJoin('project_image as i', {'i.project_id': 'p.id'})
        .leftJoin("floor as f", {'f.project_id': 'p.id'})
        .groupBy('p.id')
        .groupBy('f.id');
}

const Project = {
    add: (project) => {
        project.popularity = getRandomPopularity();
        const {
            title,
            description,
            popularity,
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
        } = project;
        return knex.insert({
            title: title,
            description: description,
            popularity: popularity,
            general_area: generalArea,
            time_to_create: timeToCreate,
            project_price: projectPrice,
            living_area: livingArea,
            building_area: buildingArea,
            wall_material: wallMaterial,
            wall_thickness: wallThickness,
            foundation: foundation,
            ceiling: ceiling,
            roof: roof,
            building_price: buildingPrice,
            insulation: insulation,
            insulation_thickness: insulationThickness,
            length: length,
            width: width,
            style: style,
            is_garage_present: isGaragePresent,
            bedroom_count: bedroomCount
        })
            .returning('id')
            .into('project');
    },

    update: (project) => {
        const {
            id,
            title,
            description,
            popularity,
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
        } = project;
        return knex('project')
            .update({
                title: title,
                description: description,
                popularity: popularity,
                general_area: generalArea,
                time_to_create: timeToCreate,
                project_price: projectPrice,
                living_area: livingArea,
                building_area: buildingArea,
                wall_material: wallMaterial,
                wall_thickness: wallThickness,
                foundation: foundation,
                ceiling: ceiling,
                roof: roof,
                building_price: buildingPrice,
                insulation: insulation,
                insulation_thickness: insulationThickness,
                length: length,
                width: width,
                style: style,
                is_garage_present: isGaragePresent,
                bedroom_count: bedroomCount
            }).where({id});
    },

    delete: async (projectId) => {
        // TODO: transactions
        return knex('floor').where('project_id', projectId).del()
            .then(() =>
                knex('project_image').where('project_id', projectId).del()
                    .then(() =>
                        knex('project').del().where('id', projectId)
                    )
            )
    },

  updateConfig: async (id, data) => {
    return knex("project_config")
      .insert({
        project_id: id,
        showonmain: data.show,
      })
      .onConflict("project_id")
      .merge()
      .then(() => Project.findAll());
  },

  findAll: () => {
        return getProjectQueryBuilder()
            .then(data => mapToProjects(data))
    },

    findById: (id) => {
        return getProjectQueryBuilder()
            .where('p.id', '=', id)
            .then(data => mapToProject(data))
    }

}

getRandomPopularity = () => {
    return Math.floor(Math.random() * 5);
}
module.exports = Project;
