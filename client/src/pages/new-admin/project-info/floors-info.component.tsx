import {ProjectProps} from "@/pages/new-admin/project-info/model";
import React, {FC} from "react";
import {Grid} from "@mui/material";
import NumericProperty from "@/pages/Admin/ViewAddEditProject/NumericProperty";
import FloorRow from "@/pages/new-admin/project-info/floor-row";
import {ImageInfo} from "@/api/model";

export const FloorsInfo: FC<ProjectProps> = ({projectDto, dispatch, mode}) => {
    const {floors} = projectDto

    console.log("project Dto ", projectDto);

    const handleFloorNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as unknown as number
        const floors = []
        for (let i = 0; i < value; i = i + 1) {
            floors.push({
                id: i + 1,
                index: null,
                area: null,
                height: null,
                planningImage: null,
                isAttic: false,
                isBasement: false
            })
        }
        dispatch({type: 'floors', payload: floors});
    }

    const handleFloorIndexChange = (event: React.ChangeEvent<any>, floorId: number) => {
        const floors = [...projectDto.floors]
        const index = event.target.value
        floors.filter((i) => i.id === floorId).forEach((i) => (i.index = index))

        dispatch({type: 'floors', payload: floors});
    }

    const handleFloorAtticChange = (floorId: number) => {
        const floors = [...projectDto.floors]
        floors.filter((i) => i.id === floorId)
            .forEach((i) => {
                i.isAttic = !i.isAttic;
                i.index = i.isAttic ? null : 0;
                i.isBasement = i.isAttic ? false : i.isBasement;
            });

        dispatch({type: 'floors', payload: floors});
    }

    const handleFloorImageChange = (floorId: number, image: ImageInfo) => {
        const floors = [...projectDto.floors]
        // update image info
        floors.find((i) => i.id === floorId).planningImage = image;

        console.log('floors', floors);

        dispatch({type: 'floors', payload: floors});
    }

    const handleFloorBasementChange = (floorId: number) => {
        const floors = [...projectDto.floors]
        floors.filter((i) => i.id === floorId).forEach((i) => {
            i.isBasement = !i.isBasement;
            i.index = i.isBasement ? null : 0;
            i.isAttic = i.isBasement ? false : i.isAttic;
        })

        console.log('floors', floors)

        dispatch({type: 'floors', payload: floors});
    }

    const handleFloorAreaChange = (event: React.ChangeEvent<any>, floorId: number) => {
        const floors = [...projectDto.floors]
        const area = event.target.value
        floors.filter((i) => i.id === floorId).forEach((i) => (i.area = area))

        dispatch({type: 'floors', payload: floors});
    }

    const handleFloorHeightChange = (event: React.ChangeEvent<any>, floorId: number) => {
        const floors = [...projectDto.floors]
        const height = event.target.value
        floors.filter((i) => i.id === floorId).forEach((i) => (i.height = height))

        dispatch({type: 'floors', payload: floors});
    }


    const handleDeleteFloorClick = (floorId: number | null) => {
        const newFloors = projectDto.floors.filter((f) => f.id !== floorId)

        dispatch({type: 'floors', payload: newFloors});
    }

    const view = mode === 'view';
    return (<Grid container spacing={2}>
        <Grid item xs={12}>
            <NumericProperty
                title={'Количество этажей (включая мансарду и подвал)'}
                value={projectDto.floors.length}
                required={true}
                disabled={view}
                handleProperty={handleFloorNumberChange}
            />
        </Grid>

        {floors.map((floor, index) => (
            <Grid item xs={12} key={'floor-key-' + floor.id}>
                <FloorRow
                    view={view}
                    id={floor.id || index + 1}
                    index={floor.index}
                    area={floor.area}
                    height={floor.height}
                    planningImage={floor.planningImage}
                    isAttic={floor.isAttic}
                    isBasement={floor.isBasement}
                    handleFloorIndexChange={handleFloorIndexChange}
                    handleFloorAtticChange={handleFloorAtticChange}
                    handleFloorBasementChange={handleFloorBasementChange}
                    handleFloorAreaChange={handleFloorAreaChange}
                    handleFloorHeightChange={handleFloorHeightChange}
                    handleFloorImageChange={handleFloorImageChange}
                    handleDeleteFloorClick={handleDeleteFloorClick}
                />
            </Grid>
        ))}
    </Grid>)
}