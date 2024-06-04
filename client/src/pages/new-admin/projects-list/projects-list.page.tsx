import {useSelector} from "react-redux";
import {ProjectsSliceState} from "@/features/projects/projectsSlice";
import {Project} from "@/entity/Project";
import {getProjects} from "@/redux/selectors";

import {DataGrid, GridColDef, GridRowsProp, GridToolbar} from '@mui/x-data-grid';
import {Link} from "react-router-dom";

import VisibilityIcon from '@mui/icons-material/Visibility';
import {Box} from "@mui/material";

const rows: GridRowsProp = [
    {id: 1, col1: 'Hello', col2: 'World'},
    {id: 2, col1: 'DataGridPro', col2: 'is Awesome'},
    {id: 3, col1: 'MUI', col2: 'is Amazing'},
];

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70,},
    {field: 'title', headerName: 'Назва', width: 500},
    {field: 'generalArea', headerName: 'Площа, м²'},
    {field: 'projectPrice', headerName: 'Ціна, грн'},
    {
        field: "action",
        headerName: "Action",
        headerAlign: 'center',
        sortable: false,
        renderCell: (params) => {

            return <Link to={`/new-admin/project/${params.row.id}`} >
                <Box display={'flex'} height={'100%'} justifyContent={'center'} alignItems={'center'}><VisibilityIcon color={'primary'}/></Box>
            </Link>;
        }
    },
];

export const ProjectsList = () => {
    const projects = useSelector<ProjectsSliceState, Project[]>((state) => getProjects(state));


    return (
        <DataGrid
            sx={{p:2}}
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                },
            }}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            slots={{ toolbar: GridToolbar }}
            columns={columns} rows={projects}/>
    )


}
