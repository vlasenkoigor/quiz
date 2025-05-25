import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingCircleBackdropProps {
  open: boolean;
}

const LoadingCircleBackdrop: React.FC<LoadingCircleBackdropProps> = ({ open }) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <CircularProgress />
    </Backdrop>
  );
};

export default LoadingCircleBackdrop;
