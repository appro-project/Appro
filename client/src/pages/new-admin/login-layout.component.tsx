import {FC} from "react";
import {Container, createTheme, ThemeProvider} from "@mui/material";
import {Outlet} from "react-router";
import {ukUA} from '@mui/material/locale';

export const LoginLayout: FC = () => {
    const muiTheme = createTheme({},
        ukUA);

    return <ThemeProvider theme={muiTheme}>
        <Container maxWidth={'xl'} sx={{pt: 2}}>
            <Outlet/>
        </Container>
    </ThemeProvider>
}