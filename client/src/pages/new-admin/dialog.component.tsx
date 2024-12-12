import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC } from 'react';

interface AlertDialogProps {
    title?: string;
    triggerButtonTitle: string;
    text: string;
    handler: () => void;
}
export const AlertDialog:FC<AlertDialogProps> = ({title, triggerButtonTitle, text, handler}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProcess = () => {
    handler();
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Button color={'error'} variant={'contained'} onClick={handleClickOpen}>
        {triggerButtonTitle}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {title && (
        <DialogTitle id="alert-dialog-title">
            {title}
        </DialogTitle>
        )}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ні</Button>
          <Button onClick={handleProcess} autoFocus>
            Так
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}