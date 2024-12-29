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
	name: 'catalogue.sorting.popular'
})
catalogueSortInfo.set('area_sort', {
	id: 'area_sort',
	name: 'catalogue.sorting.area'
})
catalogueSortInfo.set('projectPrice_sort', {
	id: 'projectPrice_sort',
	name: 'catalogue.sorting.price'
})

export const defaultSortDetails = {
	id: 'popularity_sort',
	name: 'catalogue.sorting.popular',
	direction: SortDirection.DESC
}

export default catalogueSortInfo;
