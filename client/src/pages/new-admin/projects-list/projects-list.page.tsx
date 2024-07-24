import {DataGrid, GridColDef, GridRowsProp, GridToolbar} from '@mui/x-data-grid';
import {Link} from "react-router-dom";

import VisibilityIcon from '@mui/icons-material/Visibility';
import {Box} from "@mui/material";
import {useGetAllProjects} from "@/api/useGetAllProjects";

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

            return <Link to={`/new-admin/project/${params.row.id}`}>
                <Box display={'flex'} height={'100%'} justifyContent={'center'} alignItems={'center'}><VisibilityIcon
                    color={'primary'}/></Box>
            </Link>;
        }
    },
];

export const ProjectsList = () => {

    const {data: projects, isLoading} = useGetAllProjects();

    if(!projects) {
        return null;
    }

    return (
        <DataGrid
            sx={{p: 2}}
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                },
            }}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            slots={{toolbar: GridToolbar}}
            columns={columns} rows={projects}/>
    )


}
