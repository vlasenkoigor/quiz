import {Card} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as React from "react";
import DialogGallery from "../gallery/DialogGallery.tsx";
import {usePickGallery} from "../../hooks/use-pick-gallery.ts";
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import Box from "@mui/material/Box";

interface SelectPictureProps {
    image: string,
    setImage: (image: string) => void
}

const SelectPicture: React.FC<SelectPictureProps> = ({image, setImage}) => {
    const [galleryOpen, setGalleryOpen] = React.useState(false);

    const {promptGallery, closeGallery, galleryProps} = usePickGallery();

    async function uploadButtonClicked() {
        setGalleryOpen(true);

        const images = await promptGallery();

        setGalleryOpen(false);

        if (!images || images.length == 0) return;

        setImage(images[0]);
    }

    return (<>
        <DialogGallery open={galleryOpen} onClose={closeGallery} galleryProps={galleryProps}/>

        <Card elevation={0} sx={{
            position: 'relative',
            width: '600px',
            height: '133px',
            mb: 3,
            border: 1,
            borderStyle: 'dashed',
            borderColor: 'grey.500'
        }}>

            {image ? <CardMedia
                component="img"
                image={image}
                alt="Module image"
                sx={{aspectRatio: 4.5, objectFit: 'cover', objectPosition: 'center'}}
            /> : <NoImage/>}
            <IconButton
                onClick={uploadButtonClicked}
                sx={{
                    position: 'absolute',
                    transform: 'translate(-50%,-5%)',
                    left: '50%',
                    bottom: '0',
                }}

                color={'primary'}
                // size='large'
            >
                <CloudUploadIcon fontSize={'large'}/>
            </IconButton>
        </Card>
    </>)
};

export const NoImage: React.FC = () => (
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 1, height: 1}}>
        <HideImageOutlinedIcon fontSize='large'/>
    </Box>
);

export default SelectPicture;



