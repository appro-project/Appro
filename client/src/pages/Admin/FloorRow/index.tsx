import React from 'react';
import NumericProperty from '../AddProject/NumericProperty';
import CheckProperty from '../AddProject/CheckProperty';
import FileProperty from '../AddProject/FileProperty';
import { FloorDto } from '../../../entity/FloorDto';
import classes from '../AddProject/AddProject.module.scss';

interface PropsType {
  floor: FloorDto;
  floorId: number;
  handleFloorIndexChange: (event: number | null, floorId: number) => void;
  handleFloorAtticChange: (floorId: number) => void;
  handleFloorBasementChange: (floorId: number) => void;
  handleFloorAreaChange: (event: number | null, floorId: number) => void;
  handleFloorHeightChange: (event: number | null, floorId: number) => void;
  handleFloorImageChange: (event: React.ChangeEvent<any>, floorId: number) => void;
}

const FloorRow: React.FC<PropsType> = ({
  floor,
  floorId,
  handleFloorIndexChange,
  handleFloorAtticChange,
  handleFloorBasementChange,
  handleFloorAreaChange,
  handleFloorHeightChange,
  handleFloorImageChange,
}) => {
  const isFloorIndexDisabled = () => {
    if (!floor) return false;
    return floor.isAttic || floor.isBasement;
  };

  const isFloorAtticDisabled = () => {
    if (!floor) return false;
    return !!floor.index || floor.isBasement;
  };

  const isFloorBasementDisabled = () => {
    if (!floor) return false;

    return !!floor.index || floor.isAttic;
  };

  return (
    <div>
      <div className={classes['item__three-in-row']}>
        <NumericProperty
          title={'Номер этажа'}
          value={floor.index}
          disabled={isFloorIndexDisabled()}
          onChange={(event: number | null) => handleFloorIndexChange(event, floorId)}
        />

        <CheckProperty
          title={'Мансарда'}
          checked={floor.isAttic}
          disabled={isFloorAtticDisabled()}
          handleProperty={() => handleFloorAtticChange(floorId)}
        />

        <CheckProperty
          title={'Подвал'}
          checked={floor.isBasement}
          disabled={isFloorBasementDisabled()}
          handleProperty={() => handleFloorBasementChange(floorId)}
        />
      </div>
      <div className={classes['item__two-in-row']}>
        <NumericProperty
          title={'Площадь, м2'}
          value={floor.area}
          onChange={(value: number | null) => handleFloorAreaChange(value, floorId)}
        />

        <NumericProperty
          title={'Высота, м'}
          value={floor.height}
          onChange={(value: number | null) => handleFloorHeightChange(value, floorId)}
        />
      </div>
      <div className={classes['item__two-in-row']}>
        <FileProperty
          title={'Загрузить планировку'}
          required={true}
          handleProperty={(event: React.ChangeEvent<any>) => handleFloorImageChange(event, floorId)}
        />
      </div>
    </div>
  );
};

export default FloorRow;
