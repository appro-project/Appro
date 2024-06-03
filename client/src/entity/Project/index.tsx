import { Floor } from '../Floor'

export interface Project {
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
  mainImage: string;
  images: string[];
  photos?: string[];
  insulation: string;
  insulationThickness: number;
  length: number;
  width: number;
  style: string;
  isGaragePresent: boolean;
  bedroomCount: number;
  floorList: Floor[];
  popularity: number;
  showOnMain?: boolean;
  isFinished?: boolean;
}
