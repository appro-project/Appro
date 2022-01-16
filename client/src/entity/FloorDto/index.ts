export interface FloorDto{
    id: number | null;
    index: number | null;
    area: number | null;
    height: number | null;
    planningImage: File | string  | null;
    isAttic: boolean | null;
    isBasement: boolean | null;
}
