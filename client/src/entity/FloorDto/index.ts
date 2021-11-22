export interface FloorDto{
    id: number;
    index: number | null;
    area: number | null;
    height: number | null;
    planningImage: File | null;
    isAttic: boolean;
    isBasement: boolean;
}