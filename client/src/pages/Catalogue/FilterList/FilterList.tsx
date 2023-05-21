import { useEffect } from 'react'
import classes from './FilterList.module.scss'
import { FilterType, RangeOption, SingleOption } from '@/constants/filterData/catalogueFiltersInfo'
import { useLocation } from 'react-router'
import { getSearchUri } from '@/services/data'
import { RangeFilterBlock } from './RangeFilter/RangeFilterBlock'
import { CheckboxFilterBlock } from './CheckboxFilterBlock/CheckboxFilterBlock'
import { getValidRangeSearchParam } from '@/services/util'

interface SearchOption {
  id: string;
  type: FilterType;
  value: string | RangeOption;
}

interface StateProps {
  applyFilter(searchParams: URLSearchParams): void;
}

export const FilterList = ({ applyFilter }: StateProps) => {
  const location = useLocation();
  // const history = useHistory();

  useEffect(() => {
    const urlFilters = new URLSearchParams(location.search);
    applyFilter(urlFilters);
  }, []);

  const getUri = (searchOption: SearchOption, isChecked: boolean) => {
    const searchParams = new URLSearchParams(location.search);

    return getSearchUri(searchOption, isChecked, searchParams);
  };

  const singleOptionClicked = (filterId: string, filterType: FilterType, option: SingleOption) => {
    const searchUri = getUri(
      {
        id: filterId,
        value: option.id,
        type: filterType,
      },
      option.isSelected,
    );

    // FIXME: fix me
    // history.push({
    //   search: decodeURIComponent(searchUri.toString()),
    //   pathname: location.pathname,
    // });
    // applyFilter(searchUri);
  };

  const rangeOptionClicked = (filterId: string, option: RangeOption) => {
    const search = getUri(
      {
        id: filterId,
        value: option,
        type: FilterType.RANGE,
      },
      true,
    );

    // FIXME: Fix!!
    // history.push({
    //   search: decodeURIComponent(search.toString()),
    //   pathname: location.pathname,
    // });

    applyFilter(search);
  };

  const urlFilters = new URLSearchParams(location.search);
  // todo: ids to enum!
  const floorInitFilter = urlFilters.get('floor');
  const bedroomInitFilter = urlFilters.get('bedroom');
  const styleInitFilter = urlFilters.get('style');

  const garageInitFilter = urlFilters.get('garage');

  const areaInitRange = getValidRangeSearchParam(urlFilters.get('area'));
  const projectPriceInitRange = getValidRangeSearchParam(urlFilters.get('projectPrice'));
  const buildingPriceInitRange = getValidRangeSearchParam(urlFilters.get('buildingPrice'));

  return (
    <div>
      <div className={classes['filters-list__items']}>
        <RangeFilterBlock
          filterId={'area'}
          initialRange={areaInitRange ? areaInitRange : undefined}
          applyFilter={(option) => rangeOptionClicked('area', option)}
        />
        <CheckboxFilterBlock
          filterId={'floor'}
          initialOptions={floorInitFilter ? floorInitFilter.split(',') : undefined}
          applyFilter={(option) => singleOptionClicked('floor', FilterType.CHECKBOX, option)}
        />
        <CheckboxFilterBlock
          filterId={'bedroom'}
          initialOptions={bedroomInitFilter ? bedroomInitFilter.split(',') : undefined}
          applyFilter={(option) => singleOptionClicked('bedroom', FilterType.CHECKBOX, option)}
        />
        <CheckboxFilterBlock
          filterId={'garage'}
          initialOptions={garageInitFilter ? [garageInitFilter] : undefined}
          applyFilter={(option) => singleOptionClicked('garage', FilterType.CHECKBOX, option)}
        />
        <RangeFilterBlock
          filterId={'projectPrice'}
          initialRange={projectPriceInitRange ? projectPriceInitRange : undefined}
          applyFilter={(option) => rangeOptionClicked('projectPrice', option)}
        />

        <RangeFilterBlock
          filterId={'buildingPrice'}
          initialRange={buildingPriceInitRange ? buildingPriceInitRange : undefined}
          applyFilter={(option) => rangeOptionClicked('buildingPrice', option)}
        />

        <CheckboxFilterBlock
          filterId={'style'}
          initialOptions={styleInitFilter ? styleInitFilter.split(',') : undefined}
          applyFilter={(option) => singleOptionClicked('style', FilterType.CHECKBOX, option)}
        />
      </div>
    </div>
  );
};

