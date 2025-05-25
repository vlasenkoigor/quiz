import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ConfirmDialogProps } from '@/components/confirm-dialog';
import type { TModule } from '@/data/module/module-api';
import Dialog from '@mui/material/Dialog/Dialog';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';
import DialogContent from '@mui/material/DialogContent/DialogContent';
import DialogActions from '@mui/material/DialogActions/DialogActions';

interface AddModuleDialogProps extends Pick<ConfirmDialogProps, 'open' | 'onClose'> {
  createModule: (module: Pick<TModule, 'name' | 'description'>) => void;
}

const AddModuleDialog: React.FC<AddModuleDialogProps> = ({ open, onClose, createModule }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onConfirmClick = async () => {
    onClose();

    createModule({ name, description });
  };

  return (
    <Dialog maxWidth={'sm'} fullWidth={true} open={open} onClose={onClose}>
      <DialogTitle>Add new module</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          autoComplete={'off'}
          required
          margin="dense"
          id="name"
          name="name"
          label="Module name"
          type="string"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          autoFocus
          required
          margin="dense"
          id="description"
          name="description"
          label="Module description"
          type="text"
          rows={4}
          multiline
          fullWidth
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color="info" variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button color="info" variant="contained" onClick={onConfirmClick}>
          Add module
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModuleDialog;
