export interface RangeOption {
    minFrom: number;
    maxTo: number;
    from: number;
    to: number;
    unit?: string;
}

export interface SingleOption {
    name: string;
    uri: string;
    isSelected: boolean;
}

export interface SearchOption {
    id: string;
    value: string | RangeOption | null;
    type: FilterType;
}

export enum FilterType {
    CHECKBOX = 'checkbox', RADIO = 'radio', RANGE = 'range',
}

export interface CatalogueFilterInfo {
    id: string;
    name: string;
    filterType: FilterType;
    options: SingleOption[] | RangeOption;
    tooltip?: string;
}

const catalogueFiltersInfo: CatalogueFilterInfo[] = [
    {
        id: 'area',
        name: 'Площадь, м2',
        filterType: FilterType.RANGE,
        options: { minFrom: 20, maxTo: 500, from: 20, to: 500, unit: 'м2' },
    },
    {
        id: 'floor',
        name: 'Этажность',
        filterType: FilterType.CHECKBOX,
        options: [
            { name: 'все варианты', uri: 'all', isSelected: false },
            { name: '1-этажные', uri: '1-floor', isSelected: false },
            { name: '2-этажные', uri: '2-floor', isSelected: false },
            { name: '3-этажные', uri: '3-floor', isSelected: false },
            { name: 'с мансардой', uri: 'attic', isSelected: false },
            { name: 'с подвалом', uri: 'basement', isSelected: false },
        ],
    },
    {
        id: 'bedroom',
        name: 'Спальни',
        filterType: FilterType.CHECKBOX,
        options: [
            { name: 'все варианты', uri: 'all', isSelected: false },
            { name: '1', uri: '1', isSelected: false },
            { name: '2', uri: '2', isSelected: false },
            { name: '3', uri: '3', isSelected: false },
            { name: '4+', uri: '>4', isSelected: false },
        ],
    },
    {
        id: 'garage',
        name: 'Гараж',
        filterType: FilterType.RADIO,
        options: [
            { name: 'все варианты', uri: 'all', isSelected: false },
            { name: 'с гаражем', uri: 'true', isSelected: false },
            { name: 'без гаражем', uri: 'false', isSelected: false },
        ],
    },
    {
        id: 'project_price',
        name: 'Стоимость проекта, грн',
        filterType: FilterType.RANGE,
        options: { minFrom: 6500, maxTo: 35500, from: 6500, to: 35500, unit: 'грн' },
        tooltip: 'Проект дома включает 2 экземпляра чертежей, необходимых для проведения строительных работ и  получения разрешения на строительство, и содержит Архитектурный и Конструктивный разделы.',
    },
    {
        id: 'building_price',
        name: 'Стоимость строительства, грн',
        filterType: FilterType.RANGE,
        options: { minFrom: 500000, maxTo: 10850000, from: 500000, to: 10850000, unit: 'грн' },
        tooltip: 'Стоимость строительства рассчитана приблизительно, с учетом использования стандартных материалов для строительства. ',
    },
    {
        id: 'style',
        name: 'Стиль',
        filterType: FilterType.CHECKBOX,
        options: [
            { name: 'все варианты', uri: 'all', isSelected: false },
            { name: 'классический', uri: 'classic', isSelected: false },
            { name: 'современный', uri: 'modern', isSelected: false },
        ],
    },
];

export default catalogueFiltersInfo;
