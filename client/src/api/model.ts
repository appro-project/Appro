import {Floor} from "@/entity/Floor";

export interface UpdateProjectRequest {
    id: number;
    title: string;
    description: string;
    generalArea: number;
    timeToCreate: number;
    projectPrice: number;
    livingArea: number;
    buildingArea: number;
    wallMaterial: string;
    wallThickness: number;
    foundation: string;
    ceiling: string;
    roof: string;
    buildingPrice: number;
    insulation: string;
    insulationThickness: number;
    length: number;
    width: number;
    style: string;
    isGaragePresent: boolean;
    bedroomCount: number;
    mainImage:ImageInfo;
    images: ImageInfo[];
}

export interface ImageInfo{
    id: number;
    path: string;
}

interface ProjectConfig {
    showOnMain?: boolean;
    isFinished?: boolean;
}