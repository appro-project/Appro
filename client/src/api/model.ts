export interface ProjectDto {
    id?: number;
    title: string;
    descriptionRU: string;
    descriptionUA: string;
    generalArea: number;
    timeToCreate: number;
    projectPrice: number;
    livingArea: number;
    buildingArea: number;
    terraceArea: number;
    wallMaterial: WallMaterial;
    wallThickness: number;
    foundation: Foundation;
    ceiling: Ceiling;
    roof: Roof;
    buildingPrice: number;
    insulation: Insulation;
    insulationThickness: number;
    length: number;
    width: number;
    style: Style;
    isGaragePresent: boolean;
    bedroomCount: number;
    mainImage:ImageInfo;
    images: ImageInfo[];
    photos: ImageInfo[];
    floors: FloorDto[];
    showOnMain: boolean;
    isFinished: boolean;
}

export interface FloorDto {
    id?: number | null;
    index: number | null;
    area: number | null;
    height: number | null;
    planningImage: ImageInfo | null;
    isAttic: boolean | null;
    isBasement: boolean | null;
}


export interface ImageInfo{
    id: number;
    path: string;
}

interface ProjectConfig {
    showOnMain?: boolean;
    isFinished?: boolean;
}

export const styleOptions = ['classic', 'modern'] as const;

type Style = typeof styleOptions[number];

export const foundationOptions = [
    'strip', 
    'slab', 
    'pile', 
    'combined', 
    'columnar', 
    'monolithic_strip'] as const;
type Foundation = typeof foundationOptions[number];

export const ceilingOptions = [
    'monolithic',
    'iron_concrete',
    'wood',
    'combined',
  ] as const;

type Ceiling = typeof ceilingOptions[number];

export const roofOptions = [
    'bitumen_tile',
    'metal_tile',
    'profiled_sheeting',
    'rebate',
    'flat',
    'tile',
    'slate',
  ] as const;
  
  type Roof = typeof roofOptions[number];

  export const wallMaterialOptions = [
    'brick',
    'gas_block',
    'foam_block',
    'ceramic_block',
  ] as const;
  
  type WallMaterial = typeof wallMaterialOptions[number];

  export const insulationOptions = [
    'mineral_wool',
    'expanded_polystyrene',
    'fibreboard',
    'foam_plastic',
  ] as const;
  
  type Insulation = typeof insulationOptions[number];
