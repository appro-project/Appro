import React from 'react';
import {Grid} from "@material-ui/core";
import NumericProperty from "../ViewAddEditProject/NumericProperty";
import CheckProperty from "../ViewAddEditProject/CheckProperty";
import FileProperty from "../ViewAddEditProject/FileProperty";
import {FloorDto} from "../../../entity/FloorDto";

interface PropsType {
    floor: FloorDto;
    floorId: number;
    handleFloorIndexChange: (event: React.ChangeEvent<any>, floorId: number) => void;
    handleFloorAtticChange: (floorId: number) => void;
    handleFloorBasementChange: (floorId: number) => void;
    handleFloorAreaChange: (event: React.ChangeEvent<any>, floorId: number) => void;
    handleFloorHeightChange: (event: React.ChangeEvent<any>, floorId: number) => void;
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
                                                      handleFloorImageChange
                                                  }) => {

    const isFloorIndexDisabled = () => {
        if (!floor) return false;
        return floor.isAttic || floor.isBasement;
    }

    const isFloorAtticDisabled = () => {
        if (!floor) return false;
        return !!floor.index || floor.isBasement;
    }

    const isFloorBasementDisabled = () => {
        if (!floor) return false;

        return !!floor.index || floor.isAttic;
    }

    return (
        <Grid item xs={12} container spacing={2} key={`floor-${floorId}`}>
            <Grid item xs={4}>
                <NumericProperty
                    title={'Номер этажа'}
                    value={floor.index}
                    disabled={isFloorIndexDisabled()}
                    handleProperty={(event: React.ChangeEvent<any>) =>
                        handleFloorIndexChange(event, floorId)}/>
            </Grid>
            <Grid item xs={4}>
                <CheckProperty title={'Мансарда'}
                               checked={floor.isAttic}
                               disabled={isFloorAtticDisabled()}
                               handleProperty={() =>
                                   handleFloorAtticChange(floorId)}
                />
            </Grid>
            <Grid item xs={4}>
                <CheckProperty title={'Подвал'}
                               checked={floor.isBasement}
                               disabled={isFloorBasementDisabled()}
                               handleProperty={() =>
                                   handleFloorBasementChange(floorId)}
                />
            </Grid>
            <Grid item xs={4}>
                <NumericProperty
                    title={'Площадь, м2'}
                    value={floor.area}
                    handleProperty={(event: React.ChangeEvent<any>) =>
                        handleFloorAreaChange(event, floorId)}/>
            </Grid>
            <Grid item xs={4}>
                <NumericProperty
                    title={'Высота, м'}
                    value={floor.height}
                    handleProperty={(event: React.ChangeEvent<any>) =>
                        handleFloorHeightChange(event, floorId)}/>
            </Grid>
            <Grid item xs={6}>
                <FileProperty
                    title={'Загрузить планировку'}
                    required={true}
                    handleProperty={(event: React.ChangeEvent<any>) =>
                        handleFloorImageChange(event, floorId)}
                />
            </Grid>
        </Grid>
    );
}

export default FloorRow;
