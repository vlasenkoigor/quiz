import {Dialog} from "@mui/material";
import Gallery, {GalleryProps} from "./Gallery.tsx";

interface DialogGalleryProps {
    open: boolean;
    onClose?: () => void;
    galleryProps: GalleryProps;
}

const DialogGallery: React.FC<DialogGalleryProps> = ({open, onClose, galleryProps}) => (
    <Dialog fullWidth={true} maxWidth={'md'} onClose={onClose}
            open={open}><Gallery {...galleryProps}/></Dialog>
)

export default DialogGallery;

