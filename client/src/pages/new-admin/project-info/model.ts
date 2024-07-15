import {
    CeilingOptions,
    FloorDto,
    FoundationOptions,
    ImageInfo,
    InsulationOptions,
    ProjectDto, RoofOptions,
    StyleOptions,
    WallMaterialOptions
} from "@/api/model";

export interface ProjectProps {
    projectDto: ProjectDto;
    dispatch: (action: ProjectPropAction) => void;
    mode: 'view' | 'edit' | 'add';
}

export interface ProjectPropAction {
    type: keyof ProjectDto
    payload: any;
    initState?: ProjectDto;
}

export const initialState:ProjectDto = {
    id: 0,
    title: '',
    style: StyleOptions.Classic,
    timeToCreate: 0,
    images: [],
    photos: [],
    generalArea: 0,
    projectPrice: 0,
    livingArea: 0,
    buildingArea: 0,
    wallMaterial: WallMaterialOptions.AeratedConcreteBlock,
    wallThickness: 0,
    foundation: FoundationOptions.Pile,
    ceiling: CeilingOptions.Combined,
    roof: RoofOptions.Flat,
    buildingPrice: 0,
    insulation: InsulationOptions.MineralWool,
    insulationThickness: 0,
    length: 0,
    width: 0,
    isGaragePresent: false,
    bedroomCount: 0,
    description: '',
    mainImage: undefined,
    floors: [],
}
