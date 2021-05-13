export enum SortDirection{
    ASC= 'asc', DESC= 'desc',
}

export interface SortInfo {
    id: string;
    name: string;
    direction?: SortDirection;
}

const catalogueSortInfo: Map<string, SortInfo> = new Map();
catalogueSortInfo.set('popular_sort', {
    id: 'popular_sort',
    name: 'По популярности',
});
catalogueSortInfo.set('area_sort', {
    id: 'area_sort',
    name: 'По площади',
});
catalogueSortInfo.set('price_sort', {
    id: 'price_sort',
    name: 'По цене',
});

export default catalogueSortInfo;
