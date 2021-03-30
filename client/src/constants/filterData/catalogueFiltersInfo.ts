export interface RangeOption {
    from: number;
    to: number;
    unit?: string;
}

export interface SingleOption {
    name: string;
    uri: string;
}

export interface SearchOption {
    name: string;
    value: string | RangeOption;
    type: FilterType;
}

export enum FilterType {
    CHECKBOX = 'checkbox', RADIO = 'radio', RANGE = 'range',
}

export interface CatalogueFilterInfo {
    name: string;
    uriParam: string;
    filterType: FilterType;
    options: SingleOption[] | RangeOption;
    tooltip?: string;
}

const catalogueFiltersInfo: CatalogueFilterInfo[] = [
    {
        name: 'Площадь, м2',
        uriParam: 'area',
        filterType: FilterType.RANGE,
        options: { from: 20, to: 500, unit: 'м2' },
    },
    {
        name: 'Этажность',
        uriParam: 'floor',
        filterType: FilterType.CHECKBOX,
        options: [
            { name: 'все варианты', uri: 'all' },
            { name: '1-этажные', uri: '1-floor' },
            { name: '2-этажные', uri: '2-floor' },
            { name: '3-этажные', uri: '3-floor' },
            { name: 'с мансардой', uri: 'attic' },
            { name: 'с подвалом', uri: 'basement' },
        ],
    },
    {
        name: 'Спальни',
        uriParam: 'bedroom',
        filterType: FilterType.CHECKBOX,
        options: [
            { name: 'все варианты', uri: 'all' },
            { name: '1', uri: '1' },
            { name: '2', uri: '2' },
            { name: '3', uri: '3' },
            { name: '4+', uri: '>4' },
        ],
    },
    {
        name: 'Гараж',
        uriParam: 'garage',
        filterType: FilterType.RADIO,
        options: [
            { name: 'все варианты', uri: 'all' },
            { name: 'с гаражем', uri: 'true' },
            { name: 'без гаражем', uri: 'false' },
        ],
    },
    {
        name: 'Стоимость проекта, грн',
        uriParam: 'project_price',
        filterType: FilterType.RANGE,
        options: { from: 6500, to: 35500, unit: 'грн' },
        tooltip: 'Проект дома включает 2 экземпляра чертежей, необходимых для проведения строительных работ и  получения разрешения на строительство, и содержит Архитектурный и Конструктивный разделы.',
    },
    {
        name: 'Стоимость строительства, грн',
        uriParam: 'building_price',
        filterType: FilterType.RANGE,
        options: { from: 500000, to: 10850000, unit: 'грн' },
        tooltip: 'Стоимость строительства рассчитана приблизительно, с учетом использования стандартных материалов для строительства. ',
    },
    {
        name: 'Стиль',
        uriParam: 'style',
        filterType: FilterType.CHECKBOX,
        options: [
            { name: 'все варианты', uri: 'all' },
            { name: 'классический', uri: 'classic' },
            { name: 'современный', uri: 'modern' },
        ],
    },
];

const getDefaultSearchOptions = (): SearchOption[] => {
    const searchOptions: SearchOption[] = [];
    for (const catalogueFilterInfo of catalogueFiltersInfo) {
        if (catalogueFilterInfo.filterType === FilterType.RANGE) {
            searchOptions.push({
                name: catalogueFilterInfo.uriParam,
                value: {
                    from: (catalogueFilterInfo.options as RangeOption).from,
                    to: (catalogueFilterInfo.options as RangeOption).to,
                },
                type: catalogueFilterInfo.filterType,
            });
        }
    }

    return searchOptions;
};

export const defaultSearchOptions: SearchOption[] = getDefaultSearchOptions();

export default catalogueFiltersInfo;
