import { ProjectDto } from "@/api/model";

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
    style: "classic",
    timeToCreate: 0,
    images: [],
    photos: [],
    generalArea: 0,
    projectPrice: 0,
    livingArea: 0,
    buildingArea: 0,
    terraceArea: 0,
    wallMaterial: "gas_block",
    wallThickness: 0,
    foundation: "pile",
    ceiling: 'combined',
    roof: "flat",
    buildingPrice: 0,
    insulation: "mineral_wool",
    insulationThickness: 0,
    length: 0,
    width: 0,
    isGaragePresent: false,
    bedroomCount: 0,
    descriptionRU: '',
    descriptionUA: '',
    mainImage: undefined,
    videoUrl: '',
    floors: [],
    showOnMain: false,
    isFinished: false
}
