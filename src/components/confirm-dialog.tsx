import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack/Stack';
import Dialog from '@mui/material/Dialog/Dialog';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';
import DialogActions from '@mui/material/DialogActions/DialogActions';
import DialogContent from '@mui/material/DialogContent/DialogContent';
import DialogContentText from '@mui/material/DialogContentText/DialogContentText';

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (payload?: any) => void | Promise<void>;
  title?: string;
  content: string;
  cancelText?: string;
  confirmText?: string;
  blocked?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  confirmText,
  cancelText,
  blocked,
}) => {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth={'xs'}
      fullWidth={true}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Stack direction="row" spacing={2}>
          {cancelText && (
            <Button disabled={blocked} onClick={onClose} variant="contained" color="error">
              {cancelText}
            </Button>
          )}
          {confirmText && (
            <Button disabled={blocked} onClick={onConfirm} variant="contained" color="success">
              {confirmText}
            </Button>
          )}
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
