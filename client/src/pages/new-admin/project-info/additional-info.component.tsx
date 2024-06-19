import {FC} from "react";
import {ProjectProps} from "@/pages/new-admin/project-info/model";
import {Grid} from "@mui/material";
import NumericProperty from "@/pages/Admin/ViewAddEditProject/NumericProperty";
import CheckProperty from "@/pages/Admin/ViewAddEditProject/CheckProperty";
import SelectProperty from "@/pages/Admin/ViewAddEditProject/SelectProperty";
import {
    ceilingOptions,
    foundationOptions,
    insulationOptions,
    roofOptions,
    wallMaterialOptions
} from "@/pages/Admin/constants";
import InputLabel from "@mui/material/InputLabel";


export const AdditionalInfo: FC<ProjectProps> = ({state, dispatch, mode}) => {
    const view = mode === 'view';
    return (
        <Grid container spacing={2}>
            <Grid item xs={2.4}>
                <NumericProperty
                    title={'Жилая площадь, кв.м.'}
                    value={state.livingArea}
                    required={true}
                    disabled={view}
                    handleProperty={e => dispatch({type: 'livingArea', payload: e.target.value})}
                />
            </Grid>
            <Grid item xs={2.4}>
                <NumericProperty
                    title={'Площадь застройки, кв.м.'}
                    value={state.buildingArea}
                    required={true}
                    disabled={view}
                    handleProperty={e => dispatch({type: 'buildingArea', payload: e.target.value})}
                />
            </Grid>
            <Grid item xs={2.4}>
                <SelectProperty
                    title={'Фундамент'}
                    value={state.foundation}
                    options={foundationOptions}
                    required={true}
                    disabled={view}
                    handleProperty={e => dispatch({type: 'foundation', payload: e.target.value})}
                />
            </Grid>
            <Grid item xs={2.4}>
                <SelectProperty
                    title={'Перекрытия'}
                    value={state.ceiling}
                    options={ceilingOptions}
                    required={true}
                    disabled={view}
                    handleProperty={e => dispatch({type: 'ceiling', payload: e.target.value})}
                />
            </Grid>
            <Grid item xs={2.4}>
                <SelectProperty
                    title={'Кровля'}
                    value={state.roof}
                    options={roofOptions}
                    required={true}
                    disabled={view}
                    handleProperty={e => dispatch({type: 'roof', payload: e.target.value})}
                />
            </Grid>
            <Grid item xs={2.4}>
                <NumericProperty
                    title={'Количество спален'}
                    value={state.bedroomCount}
                    required={true}
                    disabled={view}
                    handleProperty={e => dispatch({type: 'bedroomCount', payload: e.target.value})}
                />
            </Grid>
            <Grid item xs={2.4}>
                <SelectProperty
                    title={'Материал стен'}
                    value={state.wallMaterial}
                    options={wallMaterialOptions}
                    required={true}
                    disabled={view}
                    handleProperty={e => dispatch({type: 'wallMaterial', payload: e.target.value})}
                />
            </Grid>
            <Grid item xs={2.4}>
                <NumericProperty
                    title={'Толщина стен, мм'}
                    value={state.wallThickness}
                    required={true}
                    disabled={view}
                    handleProperty={event => dispatch({type: 'wallThickness', payload: event.target.value})}
                />
            </Grid>
            <Grid item xs={2.4}>
                <SelectProperty
                    title={'Материал утеплителя'}
                    value={state.insulation}
                    options={insulationOptions}
                    required={true}
                    disabled={view}
                    handleProperty={e => dispatch({type: 'insulation', payload: e.target.value})}
                />
            </Grid>
            <Grid item xs={2.4}>
                <NumericProperty
                    title={'Толщина утеплителя, мм'}
                    value={state.insulationThickness}
                    required={true}
                    disabled={view}
                    handleProperty={e => dispatch({type: 'insulationThickness', payload: e.target.value})}
                />
            </Grid>

            <Grid item xs={12}>
                <InputLabel>Габариты застройки</InputLabel>
            </Grid>
            <Grid item xs={2.4}>
                <NumericProperty
                    title={'длина, м'}
                    value={state.length}
                    required={true}
                    disabled={view}
                    handleProperty={e => dispatch({type: 'length', payload: e.target.value})}
                />
            </Grid>
            <Grid item xs={2.4}>
                <NumericProperty
                    title={'ширина, м'}
                    value={state.width}
                    required={true}
                    disabled={view}
                    handleProperty={e => dispatch({type: 'width', payload: e.target.value})}
                />
            </Grid>
            <Grid item xs={2.4}>
                <CheckProperty
                    title={'Гараж'}
                    checked={state.isGaragePresent}
                    disabled={view}
                    handleProperty={checked => dispatch({type: 'isGaragePresent', payload: checked})}
                />
            </Grid>


        </Grid>
    )
}

