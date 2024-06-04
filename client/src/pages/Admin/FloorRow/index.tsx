import React from 'react'
import {Button, Grid, Paper} from '@mui/material'
import NumericProperty from '../ViewAddEditProject/NumericProperty'
import CheckProperty from '../ViewAddEditProject/CheckProperty'
import ProjectImage from '../ViewAddEditProject/ProjectImages'

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
    handleDeleteFloorClick: (floorId: number) => void;
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
                                           handleDeleteFloorClick
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
        <Paper sx={{p: 2}}>
            <Grid container spacing={2} key={`floor-${index}`}>
                <Grid item xs={2}>
                    <NumericProperty
                        title={'Номер этажа'}
                        value={index}
                        disabled={isFloorIndexDisabled() || view}
                        handleProperty={(event: React.ChangeEvent<any>) => handleFloorIndexChange(event, id)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <NumericProperty
                        title={'Площадь, м2'}
                        value={area}
                        disabled={view}
                        handleProperty={(event: React.ChangeEvent<any>) => handleFloorAreaChange(event, id)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <NumericProperty
                        title={'Высота, м'}
                        value={height}
                        disabled={view}
                        handleProperty={(event: React.ChangeEvent<any>) => handleFloorHeightChange(event, id)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CheckProperty
                        title={'Мансарда'}
                        checked={!!isAttic}
                        disabled={isFloorAtticDisabled() || view}
                        handleProperty={() => handleFloorAtticChange(id)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CheckProperty
                        title={'Подвал'}
                        checked={!!isBasement}
                        disabled={isFloorBasementDisabled() || view}
                        handleProperty={() => handleFloorBasementChange(id)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button variant='contained' color='primary' onClick={() => handleDeleteFloorClick(id)}>
                        Удалить
                    </Button>
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
        </Paper>
    );
};

export default FloorRow;
