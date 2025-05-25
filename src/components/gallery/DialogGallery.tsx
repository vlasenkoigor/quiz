import  Dialog  from '@mui/material/Dialog';
import Gallery, { GalleryProps } from './Gallery';

interface DialogGalleryProps {
  open: boolean;
  onClose?: () => void;
  galleryProps: GalleryProps;
}

const DialogGallery: React.FC<DialogGalleryProps> = ({ open, onClose, galleryProps }) => (
  <Dialog fullWidth={true} maxWidth={'md'} onClose={onClose} open={open}>
    <Gallery {...galleryProps} />
  </Dialog>
);

export default DialogGallery;
