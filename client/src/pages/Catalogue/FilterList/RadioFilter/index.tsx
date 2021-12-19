import React, { useState } from 'react';

import classes from './RadioFilterBlock.module.scss';
import catalogueFiltersInfo, { SingleOption } from '../../../../constants/filterData/catalogueFiltersInfo';

interface Props {
  filterId: string;
  initialOption?: string;

  applyFilter(option: SingleOption): void;
}

const RadioFilterBlock = React.memo(({ filterId, initialOption, applyFilter }: Props) => {
  const filterInfo = catalogueFiltersInfo.get(filterId);
  const getInitialState = () => {
    if (!filterInfo) return undefined;
    const defaultOptions = filterInfo.options as SingleOption[];
    if (!initialOption) return defaultOptions.find((op) => op.isSelected)?.name;

    return defaultOptions.find((op) => op.id === initialOption)?.id;
  };

  const [option, setOption] = useState(getInitialState());

  if (!filterInfo) {
    console.warn(`filter info for ${filterId} not found`);

    return <React.Fragment />;
  }

  const optionOnClick = (clickedOption: SingleOption) => {
    if (clickedOption.id === option) {
      return;
    }
    clickedOption.isSelected = true;
    setOption(clickedOption.id);
    applyFilter(clickedOption);
  };

  return (
    <div className={classes.RadioFilterBlock}>
      <h3 className={classes.RadioFilterBlock_Header}>{filterInfo.name}</h3>
      <ul className={classes.RadioFilterBlock_List}>
        {(filterInfo.options as SingleOption[]).map((filterOption, idx) => {
          return (
            <li key={idx} className={classes.RadioFilterBlock_Item}>
              <input
                className={classes.RadioFilterBlock_Radio}
                type="radio"
                id={filterOption.name}
                checked={filterOption.id === option}
              />
              <label onClick={() => optionOnClick(filterOption)} htmlFor={filterOption.name}>
                {filterOption.name}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default RadioFilterBlock;
