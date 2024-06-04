import {Grid, TextField} from "@mui/material";
import TextProperty from "@/pages/Admin/ViewAddEditProject/TextProperty";
import SelectProperty from "@/pages/Admin/ViewAddEditProject/SelectProperty";
import {styleOptions} from "@/pages/Admin/constants";
import NumericProperty from "@/pages/Admin/ViewAddEditProject/NumericProperty";
import React, {FC} from "react";
import {ProjectProps} from "@/pages/new-admin/project-info/model";


export const BasicInfo: FC<ProjectProps> = ({state, dispatch, mode}) => {
    const view = mode === 'view';

    return (<Grid item xs={12} container spacing={5}>
        <Grid item xs={6}>
            <TextProperty
                title={'Название проекта'}
                value={state.title}
                handleProperty={e => dispatch({type: 'title', payload: e.target.value})}
                required={true}
                disabled={view}
            />
        </Grid>


        <Grid item xs={2}>
            <SelectProperty
                title={'Стиль'}
                value={state.style}
                options={styleOptions}
                required={true}
                disabled={view}
                handleProperty={e => dispatch({type: 'style', payload: e.target.value})}
            />
        </Grid>
        <Grid item xs={2}>
            <NumericProperty
                title={'Общая площадь проекта, кв.м.'}
                value={state.generalArea}
                required={true}
                disabled={view}
                handleProperty={e => dispatch({type: 'generalArea', payload: e.target.value})}
            />
        </Grid>
        <Grid item xs={2}>
            <NumericProperty
                title={'Подготовка проекта, дн'}
                value={state.timeToCreate}
                required={true}
                disabled={view}
                handleProperty={e => dispatch({type: 'timeToCreate', payload: e.target.value})}
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
                label={'Описание'}
                name={'Описание'}
                value={state.description}
                onChange={e => dispatch({type: 'description', payload: e.target.value})}
                required={true}
                disabled={view}
                variant={'outlined'}
                fullWidth
                multiline={true}
            />

        </Grid>

        <Grid item xs={3}>
            <NumericProperty
                title={'Подготовка проекта, дн'}
                value={state.timeToCreate}
                required={true}
                disabled={view}
                handleProperty={e => dispatch({type: 'timeToCreate', payload: e.target.value})}
            />
        </Grid>

        <Grid item xs={3}>
            <SelectProperty
                title={'Стиль'}
                value={state.style}
                options={styleOptions}
                required={true}
                disabled={view}
                handleProperty={e => dispatch({type: 'style', payload: e.target.value})}
            />
        </Grid>
        <Grid item xs={3}>
            <NumericProperty
                title={'Общая площадь проекта, кв.м.'}
                value={state.generalArea}
                required={true}
                disabled={view}
                handleProperty={e => dispatch({type: 'generalArea', payload: e.target.value})}
            />
        </Grid>

        <Grid item xs={3}>
            <NumericProperty
                title={'Цена проекта, грн'}
                value={state.projectPrice}
                required={true}
                disabled={view}
                handleProperty={e => dispatch({type: 'projectPrice', payload: e.target.value})}
            />
        </Grid>
        <Grid item xs={3}>
            <NumericProperty
                title={'Цена строительства, грн'}
                value={state.buildingPrice}
                required={true}
                disabled={view}
                handleProperty={e => dispatch({type: 'buildingPrice', payload: e.target.value})}
            />
        </Grid>
    </Grid>)
}