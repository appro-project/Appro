export interface RangeOption {
  minFrom: number;
  maxTo: number;
  from: number;
  to: number;
  unit?: string;
}

export interface SingleOption {
  id: string;
  name: string;
  isSelected: boolean;
}

export interface SearchOption {
  id: string;
  value: string | RangeOption | null;
  type: FilterType;
}

export enum FilterType {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  RANGE = 'range',
}

export interface CatalogueFilterInfo {
  id: string;
  name: string;
  filterType: FilterType;
  options: SingleOption[] | RangeOption;
  tooltip?: string;
}

const catalogueFiltersInfo: Map<string, CatalogueFilterInfo> = new Map();
catalogueFiltersInfo.set('area', {
	id: 'area',
	name: 'catalogue.filters.area.title',
	filterType: FilterType.RANGE,
	options: { minFrom: 20, maxTo: 500, from: 20, to: 500, unit: 'м2' }
})
catalogueFiltersInfo.set('floor', {
	id: 'floor',
	name: 'catalogue.filters.floor.title',
	filterType: FilterType.CHECKBOX,
	options: [
		{ name: 'catalogue.filters.floor.one', id: '1-floor', isSelected: false },
		{ name: 'catalogue.filters.floor.two', id: '2-floor', isSelected: false },
		{ name: 'catalogue.filters.floor.three', id: '3-floor', isSelected: false },
		{ name: 'catalogue.filters.floor.four', id: 'attic', isSelected: false },
		{
			name: 'catalogue.filters.floor.basement',
			id: 'basement',
			isSelected: false
		}
	]
})
catalogueFiltersInfo.set('bedroom', {
	id: 'bedroom',
	name: 'catalogue.filters.bedroom.title',
	filterType: FilterType.CHECKBOX,
	options: [
		{ name: '1', id: '1', isSelected: false },
		{ name: '2', id: '2', isSelected: false },
		{ name: '3', id: '3', isSelected: false },
		{ name: '4+', id: '>4', isSelected: false }
	]
})
catalogueFiltersInfo.set('garage', {
	id: 'garage',
	name: 'catalogue.filters.garage.title',
	filterType: FilterType.RADIO,
	options: [
		{
			name: 'catalogue.filters.garage.with_garage',
			id: 'true',
			isSelected: false
		},
		{
			name: 'catalogue.filters.garage.without_garage',
			id: 'false',
			isSelected: false
		}
	]
})
catalogueFiltersInfo.set('projectPrice', {
	id: 'project_price',
	name: 'catalogue.filters.project_price.title',
	filterType: FilterType.RANGE,
	options: { minFrom: 6500, maxTo: 35500, from: 6500, to: 35500, unit: 'грн' },
	tooltip: 'catalogue.filters.project_price.tooltip'
})
catalogueFiltersInfo.set('buildingPrice', {
	id: 'building_price',
	name: 'catalogue.filters.building_price.title',
	filterType: FilterType.RANGE,
	options: {
		minFrom: 500000,
		maxTo: 10850000,
		from: 500000,
		to: 10850000,
		unit: 'грн'
	},
	tooltip: 'catalogue.filters.buildung_price.tooltip'
})
catalogueFiltersInfo.set('style', {
	id: 'style',
	name: 'catalogue.filters.style.title',
	filterType: FilterType.CHECKBOX,
	options: [
		{
			name: 'catalogue.filters.style.classic',
			id: 'classic',
			isSelected: false
		},
		{ name: 'catalogue.filters.style.modern', id: 'modern', isSelected: false }
	]
})

export default catalogueFiltersInfo;
