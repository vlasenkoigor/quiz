import React from 'react';
import Dialog from '@mui/material/Dialog/Dialog';
import DialogActions from '@mui/material/DialogActions/DialogActions';
import DialogContent from '@mui/material/DialogContent/DialogContent';
import DialogContentText from '@mui/material/DialogContentText/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';
import Slide from '@mui/material/Slide/Slide';
import Stack from '@mui/material/Stack/Stack';
import Button from '@mui/material/Button';
import { ConfirmDialogProps } from '@/components/confirm-dialog';
import { TransitionProps } from '@mui/material/transitions';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ReplayIcon from '@mui/icons-material/Replay';
import Typography from '@mui/material/Typography';

interface QuizSummaryPopupProps extends Pick<ConfirmDialogProps, 'onConfirm' | 'open' | 'onClose'> {
  success?: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const QuizSummaryPopup: React.FC<QuizSummaryPopupProps> = ({ onClose, onConfirm, open }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      // onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth={'xs'}
      fullWidth={true}
    >
      <DialogTitle align={'center'} component={Typography} variant={'h3'}>
        Results
      </DialogTitle>
      <DialogContent>
        <DialogContentText align="center">
          <EmojiEventsIcon fontSize={'large'} color={'secondary'} sx={{ fontSize: '10rem' }} />
        </DialogContentText>
        <Typography variant={'h4'} align={'center'}>
          Congratulations!
        </Typography>
        <Typography variant={'h6'} align={'center'} paddingTop={3}>
          You completed module successfully
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Stack direction="row" spacing={2}>
          <Button onClick={onClose} variant="outlined" color="info">
            Go to module
          </Button>
          <Button onClick={onConfirm} variant="contained" color="info" endIcon={<ReplayIcon />}>
            Play again
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default QuizSummaryPopup;
