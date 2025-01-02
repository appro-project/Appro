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
    wallMaterial: WallMaterialOptions;
    wallThickness: number;
    foundation: FoundationOptions;
    ceiling: CeilingOptions;
    roof: RoofOptions;
    buildingPrice: number;
    insulation: InsulationOptions;
    insulationThickness: number;
    length: number;
    width: number;
    style: StyleOptions;
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


export enum StyleOptions {
    Classic = 'CLASSIC',
    Modern = 'MODERN'
}

export enum FoundationOptions {
    Strip = 'STRIP',
    Slab = 'SLAB',
    Pile = 'PILE',
    CombinedPileSlab = 'COMBINED',
    Columnar = 'COLUMNAR',
    MonolithicStrip = 'MONOLITHIC_STRIP'
}

export enum CeilingOptions {
    MonolithicConcreteSlab = 'MONOLITHIC',
    PrecastConcreteSlab = 'IRON_CONCRETE',
    Wood = 'WOOD',
    Combined = 'COMBINED'
}

export enum RoofOptions {
    BituminousShingles = 'битумная черепица',
    MetalShingles = 'металлочерепица',
    CorrugatedSheet = 'профнастил',
    Seam = 'фальцевая',
    Flat = 'плоская',
    Tiles = 'черепица',
    Slate = 'сланцевая'
}

export enum WallMaterialOptions {
    Brick = 'кирпич',
    AeratedConcreteBlock = 'газоблок',
    FoamConcreteBlock = 'пеноблок',
    CeramicBlock = 'керамоблок'
}

export enum InsulationOptions {
    MineralWool = 'минеральная вата',
    PolystyreneFoam = 'пенополистерол',
    Fiberboard = 'фибролит',
    FoamPlastic = 'пенопласт'
}
