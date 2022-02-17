import React from 'react';
import { Grid } from '@material-ui/core';
import NumericProperty from '../ViewAddEditProject/NumericProperty';
import CheckProperty from '../ViewAddEditProject/CheckProperty';
import FileProperty from '../ViewAddEditProject/FileProperty';
import { FloorDto } from '../../../entity/FloorDto';
import ProjectImage from '../ViewAddEditProject/ProjectImages';

interface PropsType {
  view: boolean;
  id: number;
  index: number | null;
  area: number | null;
  height: number | null;
  planningImage: string | null;
  isAttic: boolean | null;
  isBasement: boolean | null;
  handleFloorIndexChange: (event: React.ChangeEvent<any>, floorId: number) => void;
  handleFloorAtticChange: (floorId: number) => void;
  handleFloorBasementChange: (floorId: number) => void;
  handleFloorAreaChange: (event: React.ChangeEvent<any>, floorId: number) => void;
  handleFloorHeightChange: (event: React.ChangeEvent<any>, floorId: number) => void;
  handleFloorImageChange: (event: React.ChangeEvent<any>, floorId: number) => void;
  handleFloorImageRemove: (floorId: number) => void;
}

const FloorRow: React.FC<PropsType> = ({
  view,
  id,
  index,
  area,
  height,
  planningImage,
  isBasement,
  isAttic,
  handleFloorIndexChange,
  handleFloorAtticChange,
  handleFloorBasementChange,
  handleFloorAreaChange,
  handleFloorHeightChange,
  handleFloorImageChange,
  handleFloorImageRemove,
}) => {
  const isFloorIndexDisabled = () => {
    return isAttic || isBasement;
  };

  const isFloorAtticDisabled = () => {
    return !!index || isBasement;
  };

  const isFloorBasementDisabled = () => {
    return !!index || isAttic;
  };

  return (
    <Grid item xs={12} container spacing={2} key={`floor-${index}`}>
      <Grid item xs={4}>
        <NumericProperty
          title={'Номер этажа'}
          value={index}
          disabled={isFloorIndexDisabled() || view}
          handleProperty={(event: React.ChangeEvent<any>) => handleFloorIndexChange(event, id)}
        />
      </Grid>
      <Grid item xs={4}>
        <CheckProperty
          title={'Мансарда'}
          checked={!!isAttic}
          disabled={isFloorAtticDisabled() || view}
          handleProperty={() => handleFloorAtticChange(id)}
        />
      </Grid>
      <Grid item xs={4}>
        <CheckProperty
          title={'Подвал'}
          checked={!!isBasement}
          disabled={isFloorBasementDisabled() || view}
          handleProperty={() => handleFloorBasementChange(id)}
        />
      </Grid>
      <Grid item xs={4}>
        <NumericProperty
          title={'Площадь, м2'}
          value={area}
          disabled={view}
          handleProperty={(event: React.ChangeEvent<any>) => handleFloorAreaChange(event, id)}
        />
      </Grid>
      <Grid item xs={4}>
        <NumericProperty
          title={'Высота, м'}
          value={height}
          disabled={view}
          handleProperty={(event: React.ChangeEvent<any>) => handleFloorHeightChange(event, id)}
        />
      </Grid>
      <Grid item xs={6}>
        <ProjectImage
          images={planningImage ? [planningImage] : null}
          title={'Загрузить планировку'}
          disabled={view}
          handleAddImage={(event: React.ChangeEvent<any>) => handleFloorImageChange(event, id)}
          handleRemoveImage={() => handleFloorImageRemove(id)}
        />
      </Grid>
    </Grid>
  );
};

export default FloorRow;
