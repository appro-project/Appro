import {Grid, TextField} from "@mui/material";
import TextProperty from "@/pages/Admin/ViewAddEditProject/TextProperty";
import SelectProperty from "@/pages/Admin/ViewAddEditProject/SelectProperty";
import NumericProperty from "@/pages/Admin/ViewAddEditProject/NumericProperty";
import React, {FC} from "react";
import {ProjectProps} from "@/pages/new-admin/project-info/model";
import CheckProperty from "@/pages/Admin/ViewAddEditProject/CheckProperty";
import { styleOptions } from "@/api/model";


export const BasicInfo: FC<ProjectProps> = ({projectDto, dispatch, mode}) => {
    const view = mode === 'view';

    return (<Grid item xs={12} container spacing={5}>
        <Grid item xs={6}>
            <TextProperty
                title={'Название проекта'}
                value={projectDto.title}
                handleProperty={e => dispatch({type: 'title', payload: e.target.value})}
                required={true}
                disabled={view}
            />
        </Grid>

        <Grid item xs={3}>
            <CheckProperty
                title={'На главной'}
                checked={projectDto.showOnMain}
                disabled={view}
                handleProperty={checked => dispatch({type: 'showOnMain', payload: checked})}
            />
        </Grid>

        <Grid item xs={3}>
            <CheckProperty
                title={'Законченный'}
                checked={projectDto.isFinished}
                disabled={view}
                handleProperty={checked => dispatch({type: 'isFinished', payload: checked})}
            />
        </Grid>

        <Grid item xs={3}>
            <NumericProperty
                title={'Подготовка проекта, дн'}
                value={projectDto.timeToCreate}
                required={true}
                disabled={view}
                handleProperty={e => dispatch({type: 'timeToCreate', payload: e.target.value})}
            />
        </Grid>

        <Grid item xs={3}>
            <SelectProperty
                title={'Стиль'}
                label="style"
                value={projectDto.style}
                options={styleOptions}
                required={true}
                disabled={view}
                handleProperty={e => dispatch({type: 'style', payload: e.target.value})}
            />
        </Grid>

        <Grid item xs={6}>
            <TextField
                label={'Описание (ru)'}
                name={'Описание (ru)'}
                value={projectDto.descriptionRU}
                onChange={e => dispatch({type: 'descriptionRU', payload: e.target.value})}
                required={true}
                disabled={view}
                variant={'outlined'}
                fullWidth
                multiline={true}
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
                label={'Описание (ua)'}
                name={'Описание (ua)'}
                value={projectDto.descriptionUA}
                onChange={e => dispatch({type: 'descriptionUA', payload: e.target.value})}
                required={true}
                disabled={view}
                variant={'outlined'}
                fullWidth
                multiline={true}
            />
        </Grid>


        <Grid item xs={3}>
            <NumericProperty
                title={'Общая площадь проекта, кв.м.'}
                value={projectDto.generalArea}
                required={true}
                disabled={view}
                handleProperty={e => dispatch({type: 'generalArea', payload: e.target.value})}
            />
        </Grid>

        <Grid item xs={3}>
            <NumericProperty
                title={'Цена проекта, грн'}
                value={projectDto.projectPrice}
                required={true}
                disabled={view}
                handleProperty={e => dispatch({type: 'projectPrice', payload: e.target.value})}
            />
        </Grid>
        <Grid item xs={3}>
            <NumericProperty
                title={'Цена строительства, грн'}
                value={projectDto.buildingPrice}
                required={true}
                disabled={view}
                handleProperty={e => dispatch({type: 'buildingPrice', payload: e.target.value})}
            />
        </Grid>
    </Grid>)
}