import React, { useState } from 'react';

import classes from './CheckboxFilterBlock.module.scss';
import catalogueFiltersInfo, { SingleOption } from '../../../../constants/filterData/catalogueFiltersInfo';
import Checkbox from '../../../../components/UI/Checkbox/Checkbox';

interface Props {
  filterId: string;
  initialOptions?: string[];

  applyFilter(option: SingleOption): void;
}

const CheckboxFilterBlock = React.memo(({ filterId, initialOptions, applyFilter }: Props) => {
  const filterInfo = catalogueFiltersInfo.get(filterId);

  const getInitialState = () => {
    if (!filterInfo) return [];
    const defaultOptions = filterInfo.options as SingleOption[];
    const selectedOptionIds = [];
    if (initialOptions) {
      for (const defaultOption of defaultOptions) {
        if (initialOptions.indexOf(defaultOption.id) > -1) {
          selectedOptionIds.push(defaultOption.id);
        }
      }
    }

    return selectedOptionIds;
  };

  const [options, setOptions] = useState(getInitialState());

  if (!filterInfo) {
    console.warn(`filter info for ${filterId} not found`);

    return <React.Fragment />;
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

    setOptions([...currentOptions]);
    applyFilter(clickedOption);
  };

  return (
    <div className={classes.CheckboxFilterBlock}>
      <h3 className={classes.CheckboxFilterBlock_header}>{filterInfo.name}</h3>
      <ul className={classes.CheckboxFilterBlock_list}>
        {(filterInfo.options as SingleOption[]).map((filterOption, idx) => {
          return (
            <li key={idx} className={classes.CheckboxFilterBlock_item}>
              <Checkbox
                labelName={filterOption.name}
                htmlFor={filterOption.name}
                onClick={() => optionOnClick(filterOption)}
                checked={options.includes(filterOption.id)}
                id={filterOption.name}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default CheckboxFilterBlock;
