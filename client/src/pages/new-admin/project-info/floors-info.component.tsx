import {ProjectProps} from "@/pages/new-admin/project-info/model";
import React, {FC} from "react";
import {Grid} from "@mui/material";
import NumericProperty from "@/pages/Admin/ViewAddEditProject/NumericProperty";
import FloorRow from "@/pages/Admin/FloorRow";

export const FloorsInfo: FC<ProjectProps> = ({state, dispatch, mode}) => {
    const {floorList} = state

    const handleFloorNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as unknown as number
        const floorList = []
        for (let i = 0; i < value; i = i + 1) {
            floorList.push({
                id: i + 1,
                index: null,
                area: null,
                height: null,
                planningImage: null,
                isAttic: false,
                isBasement: false
            })
        }
        dispatch({type: 'floorList', payload: floorList});
    }

    const handleFloorIndexChange = (event: React.ChangeEvent<any>, floorId: number) => {
        const floors = [...state.floorList]
        const index = event.target.value
        floors.filter((i) => i.id === floorId).forEach((i) => (i.index = index))

        dispatch({type: 'floorList', payload: floors});
    }

    const handleFloorAtticChange = (floorId: number) => {
        const floors = [...state.floorList]
        floors.filter((i) => i.id === floorId).forEach((i) => (i.isAttic = !i.isAttic))

        dispatch({type: 'floorList', payload: floors});
    }

    const handleFloorBasementChange = (floorId: number) => {
        const floors = [...state.floorList]
        floors.filter((i) => i.id === floorId).forEach((i) => (i.isBasement = !i.isBasement))

        dispatch({type: 'floorList', payload: floors});
    }

    const handleFloorAreaChange = (event: React.ChangeEvent<any>, floorId: number) => {
        const floors = [...state.floorList]
        const area = event.target.value
        floors.filter((i) => i.id === floorId).forEach((i) => (i.area = area))

        dispatch({type: 'floorList', payload: floors});
    }

    const handleFloorHeightChange = (event: React.ChangeEvent<any>, floorId: number) => {
        const floors = [...state.floorList]
        const height = event.target.value
        floors.filter((i) => i.id === floorId).forEach((i) => (i.height = height))

        dispatch({type: 'floorList', payload: floors});
    }

    const handleFloorImageChange = (event: React.ChangeEvent<any>, floorId: number) => {
        const floors = [...state.floorList]
        const image = event.target.files[0]
        floors.filter((i) => i.id === floorId).forEach((i) => (i.planningImage = image))

        dispatch({type: 'floorList', payload: floors});
    }

    const handleFloorImageRemove = (floorId: number | null) => {
        const floors = [...state.floorList]
        const floor = floors.find((i) => i.id === floorId)

        if (!floor) {
            return
        }
        const imagesToDelete = state.imagesToDelete || []
        const floorImageToDelete = floor.planningImage
        imagesToDelete.push(floorImageToDelete)
        floor.planningImage = null

        dispatch({type: 'floorList', payload: floors});
        dispatch({type: 'imagesToDelete', payload: imagesToDelete});
    }

    const handleDeleteFloorClick = (floorId: number | null) => {
        const newFloors = state.floorList.filter((f) => f.id !== floorId)

        dispatch({type: 'floorList', payload: newFloors});
    }

    const view = mode === 'view';
    return (<Grid container spacing={2}>
        <Grid item xs={12}>
            <NumericProperty
                title={'Количество этажей (включая мансарду и подвал)'}
                value={state.floorList.length}
                required={true}
                disabled={view}
                handleProperty={handleFloorNumberChange}
            />
        </Grid>

        {floorList.map((floor, index) => (
            <Grid item xs={12}>
                <FloorRow
                    view={view}
                    id={floor.id || index + 1}
                    index={floor.index}
                    area={floor.area}
                    height={floor.height}
                    planningImage={view ? floor.planningImage : null}
                    isAttic={floor.isAttic}
                    isBasement={floor.isBasement}
                    handleFloorIndexChange={handleFloorIndexChange}
                    handleFloorAtticChange={handleFloorAtticChange}
                    handleFloorBasementChange={handleFloorBasementChange}
                    handleFloorAreaChange={handleFloorAreaChange}
                    handleFloorHeightChange={handleFloorHeightChange}
                    handleFloorImageChange={handleFloorImageChange}
                    handleFloorImageRemove={handleFloorImageRemove}
                    handleDeleteFloorClick={handleDeleteFloorClick}
                />
            </Grid>
        ))}
    </Grid>)
}