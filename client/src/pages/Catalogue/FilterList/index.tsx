import React, { Component } from 'react';
import classes from './FilterList.module.scss';
import {
    FilterType,
    RangeOption,
    SingleOption,
} from '../../../constants/filterData/catalogueFiltersInfo';
import { RouteComponentProps, withRouter } from 'react-router';
import { getSearchUri } from '../../../services/data';
import RangeFilterBlock from './RangeFilter';
import CheckboxFilterBlock from './CheckboxFilterBlock';
import RadioFilterBlock from './RadioFilter';
import { getValidRangeSearchParam } from '../../../services/util';

interface SearchOption {
    id: string;
    type: FilterType;
    value: string | RangeOption;
}

interface StateProps {
    applyFilter(searchParams: URLSearchParams): void;
}

type Props = StateProps & RouteComponentProps<any>;

class FilterList extends Component<Props, {}> {

    componentDidMount() {
        const urlFilters = new URLSearchParams(this.props.location.search);
        this.props.applyFilter(urlFilters);
    }

    render() {
        const urlFilters = new URLSearchParams(this.props.location.search);
        // todo: ids to enum!
        const floorInitFilter = urlFilters.get('floor');
        const bedroomInitFilter = urlFilters.get('bedroom');
        const styleInitFilter = urlFilters.get('style');

        const garageInitFilter = urlFilters.get('garage');

        const areaInitRange = getValidRangeSearchParam(urlFilters.get('area'));
        const projectPriceInitRange = getValidRangeSearchParam(urlFilters.get('projectPrice'));
        const buildingPriceInitRange = getValidRangeSearchParam(urlFilters.get('buildingPrice'));

        return <div>
            <div className={ classes['filters-list__items'] }>
                <RangeFilterBlock filterId={ 'area' }
                                  initialRange = { areaInitRange ?
                                 areaInitRange : undefined }
                                  applyFilter={ option =>
                                 this.rangeOptionClicked('area', option) }/>
                <CheckboxFilterBlock filterId={ 'floor' }
                                     initialOptions={ floorInitFilter ?
                                    floorInitFilter.split(',') : undefined }
                                     applyFilter={ option =>
                                    this.singleOptionClicked('floor',
                                                             FilterType.CHECKBOX, option) }
                />
                <CheckboxFilterBlock filterId={ 'bedroom' }
                                     initialOptions={ bedroomInitFilter ?
                                    bedroomInitFilter.split(',') : undefined }
                                     applyFilter={ option =>
                                    this.singleOptionClicked('bedroom',
                                                             FilterType.CHECKBOX, option) }
                />
                <RadioFilterBlock filterId={ 'garage' }
                                  initialOption = { garageInitFilter ?
                                      garageInitFilter : undefined }
                                  applyFilter={ option =>
                                 this.singleOptionClicked('garage',
                                                          FilterType.RADIO, option) }/>
                <RangeFilterBlock filterId={ 'projectPrice' }
                                  initialRange = { projectPriceInitRange ?
                                 projectPriceInitRange : undefined }
                                  applyFilter={ option =>
                                 this.rangeOptionClicked('projectPrice', option) }/>

                <RangeFilterBlock filterId={ 'buildingPrice' }
                                  initialRange = { buildingPriceInitRange ?
                                 buildingPriceInitRange : undefined }
                                  applyFilter={ option =>
                                 this.rangeOptionClicked('buildingPrice', option) }/>

                <CheckboxFilterBlock filterId={ 'style' }
                                     initialOptions={ styleInitFilter ?
                                    styleInitFilter.split(',') : undefined }
                                     applyFilter={ option =>
                                    this.singleOptionClicked('style',
                                                             FilterType.CHECKBOX, option) }/>
            </div>

        </div>;
    }

    private getSearchUri(searchOption: SearchOption, isChecked: boolean) {
        const { location } = this.props;
        const searchParams = new URLSearchParams(location.search);

        return getSearchUri(searchOption, isChecked, searchParams);
    }

    private singleOptionClicked(filterId: string, filterType: FilterType, option: SingleOption) {
        const searchUri = this.getSearchUri(
            {
                id: filterId,
                value: option.id,
                type: filterType,
            },
            option.isSelected);
        const { history, location } = this.props;
        history.push({
             search: decodeURIComponent(searchUri.toString()),
             pathname: location.pathname,
        });
        this.props.applyFilter(searchUri);
    }

    private rangeOptionClicked(filterId: string, option: RangeOption) {
        const search = this.getSearchUri(
            {
                id: filterId,
                value: option,
                type: FilterType.RANGE,
            },
            true);
        const { history, location } = this.props;

        history.push({
            search: decodeURIComponent(search.toString()),
            pathname: location.pathname,
        });

        this.props.applyFilter(search);
    }
}

export default withRouter(FilterList);
