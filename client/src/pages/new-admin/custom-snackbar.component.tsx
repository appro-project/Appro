import {Alert, Snackbar} from "@mui/material";
import React, {FC} from "react";

interface CustomSnackbarProps {
    title: string;
    open: boolean;
    handleClose: () => void;
}

export const CustomSnackbar: FC<CustomSnackbarProps> = ({title, open, handleClose}) => {

    return <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{width: '100%'}}
        >
            {title}
        </Alert>
    </Snackbar>
}