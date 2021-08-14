import React, { useState } from 'react';

import classes from './CheckboxFilterBlock.module.scss';
import catalogueFiltersInfo, {
  SingleOption,
} from '../../../../constants/filterData/catalogueFiltersInfo';

interface Props {
  filterId: string;
  initialOptions?: string[];

  applyFilter(option: SingleOption): void;
}

const CheckboxFilterBlock = ({ filterId, initialOptions, applyFilter }: Props) => {
  const filterInfo = catalogueFiltersInfo.get(filterId);

  const getInitialState = () => {
    if (!filterInfo) return [];
    const defaultOptions = filterInfo.options as SingleOption[];
    if (initialOptions) {
      for (const defaultOption of defaultOptions) {
        if (initialOptions.indexOf(defaultOption.id) > -1) {
          defaultOption.isSelected = true;
        }
      }
    }

    return defaultOptions.filter(o => o.isSelected).map(o => o.id);
  };

  const [ options, setOptions ] =
    useState(getInitialState());

  if (!filterInfo) {
    console.warn(`filter info for ${ filterId } not found`);

    return <React.Fragment/>;
  }

  const optionOnClick = (clickedOption: SingleOption) => {
    const currentOptions = options;
    const clickedOptionId = currentOptions.indexOf(clickedOption.id);
    if (clickedOptionId > -1) {
      currentOptions.splice(clickedOptionId, 1);
      clickedOption.isSelected = false;
    } else {
      currentOptions.push(clickedOption.id);
      clickedOption.isSelected = true;
    }

    setOptions([ ...currentOptions ]);
    applyFilter(clickedOption);
  };

  return <div className={ classes.CheckboxFilterBlock }>
    <h3 className={ classes.CheckboxFilterBlock_header }>{ filterInfo.name }</h3>
    <ul className={ classes.CheckboxFilterBlock_list }>
      {
        (filterInfo.options as SingleOption[])
          .map((filterOption, idx) => {
                 return (
                   <li key={ idx }
                       className={ classes.CheckboxFilterBlock_item }
                       onClick={ () => optionOnClick(
                         filterOption,
                       ) }>
                     <input type="checkbox" className="custom-checkbox" id={ filterOption.name }
                            checked={ filterOption.isSelected }/>
                     <label htmlFor={ filterOption.name }>{ filterOption.name }</label>

                   </li>
                 );
               },
          ) }
    </ul>
  </div>;
};

export default CheckboxFilterBlock;
