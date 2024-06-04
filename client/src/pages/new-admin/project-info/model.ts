import {FloorDto} from "@/entity/FloorDto";

export interface ProjectProps {
    state: State;
    dispatch: (action: ProjectPropAction) => void;
    mode: 'view' | 'edit' | 'add';
}

export interface ProjectPropAction {
    type: keyof State
    payload: any;
}

export interface State {
    id?: number;
    title: string;
    description: string;
    generalArea: number | null;
    timeToCreate: number | null;
    projectPrice: number | null;
    livingArea: number | null;
    buildingArea: number | null;
    wallMaterial: string;
    wallThickness: number | null;
    foundation: string;
    ceiling: string;
    roof: string;
    buildingPrice: number | null;
    mainImage: File | string | null;
    images: string[] | null;
    photos: string[] | null;
    insulation: string;
    insulationThickness: number | null;
    length: number | null;
    width: number | null;
    style: string;
    isGaragePresent: boolean;
    bedroomCount: number | null;
    floorList: FloorDto[];
    edit?: boolean;
    add?: boolean;
    imagesToDelete?: string[];
    photosToDelete?: string[];
    imagesToAdd?: FileList | null;
    photosToAdd?: FileList | null;
    isFinished: boolean;
}