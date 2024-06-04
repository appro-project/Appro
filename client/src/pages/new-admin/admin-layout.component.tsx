import React, {FC} from "react";
import {Header} from "@/pages/new-admin/header.component";
import {Container, createTheme, ThemeProvider} from "@mui/material";
import {Outlet} from "react-router";
import {ukUA} from '@mui/material/locale';

export const AdminLayout: FC = () => {
    const muiTheme = createTheme({},
        ukUA);

    return <ThemeProvider theme={muiTheme}>
        <Header/>
        <Container maxWidth={'xl'} sx={{pt: 2}}>
            <Outlet/>
        </Container>
    </ThemeProvider>
}