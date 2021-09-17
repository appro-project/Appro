export interface Floor {
  index: number;
  area: number | null;
  height: number | null;
  planningImage: string | null;
}

export interface FullProjectData {
  id: string;
  title: string;
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
  images: string[];
  insulation: string;
  insulationThickness: number;
  length: number ;
  width: number;
  style: string;
  isGaragePresent: boolean;
  bedroomCount: number;
  floorList: Floor[];
}
