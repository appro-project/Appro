export interface ProjectDto {
    id: number;
    title: string;
    description: string;
    generalArea: number;
    timeToCreate: number;
    projectPrice: number;
    livingArea: number;
    buildingArea: number;
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
    Classic = 'классический',
    Modern = 'современный'
}

export enum FoundationOptions {
    Strip = 'ленточный',
    Slab = 'плитный',
    Pile = 'свайный',
    CombinedPileSlab = 'комбинированный (свайно-плитный)',
    Columnar = 'столбчатый',
    MonolithicStrip = 'монолитный ленточный'
}

export enum CeilingOptions {
    MonolithicConcreteSlab = 'монолитная ж/б плита',
    PrecastConcreteSlab = 'сборное ж/б из плит',
    Wood = 'дерево',
    Combined = 'комбинированная'
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
