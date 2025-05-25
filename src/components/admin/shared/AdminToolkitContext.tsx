import { createContext, useContext, PropsWithChildren, useState } from 'react';
import { SettleState, useDialog } from '@/hooks/use-dialog';
import ConfirmDialog, { ConfirmDialogProps } from '@/components/confirm-dialog';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const AdminToolkitContext = createContext<TAdminToolkitContext>({
  showConfirmDialog: () => Promise.resolve('cancelled'),
});

export const AdminToolkitProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { showDialog, dialogProps } = useDialog();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'success'>('error');

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showConfirmDialog = (props: Partial<ConfirmDialogProps>) => {
    return showDialog(props);
  };

  const showSnackbar: TAdminToolkitContext['showSnackbar'] = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  return (
    <AdminToolkitContext.Provider value={{ showConfirmDialog, showSnackbar }}>
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <ConfirmDialog content={''} {...dialogProps} />
      {children}
    </AdminToolkitContext.Provider>
  );
};

export const useAdminToolkit = () => {
  return useContext(AdminToolkitContext);
};

type TAdminToolkitContext = {
  showConfirmDialog: (props: Partial<ConfirmDialogProps>) => Promise<SettleState>;

  showSnackbar: (severity: 'error' | 'success', message: string) => void;
};
