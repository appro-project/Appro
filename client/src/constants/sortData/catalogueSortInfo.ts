export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface SortDetails {
  id: string;
  name: string;
  direction?: SortDirection;
}

const catalogueSortInfo: Map<string, SortDetails> = new Map();
catalogueSortInfo.set('popularity_sort', {
  id: 'popularity_sort',
  name: 'По популярности',
});
catalogueSortInfo.set('area_sort', {
  id: 'area_sort',
  name: 'По площади',
});
catalogueSortInfo.set('projectPrice_sort', {
  id: 'projectPrice_sort',
  name: 'По цене',
});

export const defaultSortDetails = {
  id: 'popularity_sort',
  name: 'По популярности',
  direction: SortDirection.DESC,
};

export default catalogueSortInfo;
