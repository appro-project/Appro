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
  name: 'Площадь, м2',
  filterType: FilterType.RANGE,
  options: { minFrom: 20, maxTo: 500, from: 20, to: 500, unit: 'м2' },
});
catalogueFiltersInfo.set('floor', {
  id: 'floor',
  name: 'Этажность',
  filterType: FilterType.CHECKBOX,
  options: [
    { name: '1-этажные', id: '1-floor', isSelected: false },
    { name: '2-этажные', id: '2-floor', isSelected: false },
    { name: '3-этажные', id: '3-floor', isSelected: false },
    { name: 'с мансардой', id: 'attic', isSelected: false },
    { name: 'с подвалом', id: 'basement', isSelected: false },
  ],
});
catalogueFiltersInfo.set('bedroom', {
  id: 'bedroom',
  name: 'Спальни',
  filterType: FilterType.CHECKBOX,
  options: [
    { name: '1', id: '1', isSelected: false },
    { name: '2', id: '2', isSelected: false },
    { name: '3', id: '3', isSelected: false },
    { name: '4+', id: '>4', isSelected: false },
  ],
});
catalogueFiltersInfo.set('garage', {
  id: 'garage',
  name: 'Гараж',
  filterType: FilterType.RADIO,
  options: [
    { name: 'с гаражем', id: 'true', isSelected: false },
    { name: 'без гаража', id: 'false', isSelected: false },
  ],
});
catalogueFiltersInfo.set('projectPrice', {
  id: 'project_price',
  name: 'Стоимость проекта, грн',
  filterType: FilterType.RANGE,
  options: { minFrom: 6500, maxTo: 35500, from: 6500, to: 35500, unit: 'грн' },
  tooltip:
    'Проект дома включает 2 экземпляра чертежей, необходимых для проведения строительных работ и  получения разрешения на строительство, и содержит Архитектурный и Конструктивный разделы.',
});
catalogueFiltersInfo.set('buildingPrice', {
  id: 'building_price',
  name: 'Стоимость строительства, грн',
  filterType: FilterType.RANGE,
  options: { minFrom: 500000, maxTo: 10850000, from: 500000, to: 10850000, unit: 'грн' },
  tooltip:
    'Стоимость строительства рассчитана приблизительно, с учетом использования стандартных материалов для строительства. ',
});
catalogueFiltersInfo.set('style', {
  id: 'style',
  name: 'Стиль',
  filterType: FilterType.CHECKBOX,
  options: [
    { name: 'классический', id: 'classic', isSelected: false },
    { name: 'современный', id: 'modern', isSelected: false },
  ],
});

export default catalogueFiltersInfo;
