import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import {useImages} from "../../services/use-images.ts";
import {DropzoneDialog} from "mui-file-dropzone";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Checkbox, Stack} from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ConfirmDialog from "../ConfirmDialog.tsx";
import {useDialog} from "../../hooks/use-dialog.ts";

export function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
    // return {
    //     src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    //     srcSet: `${image}?w=${width * cols}&h=${
    //         height * rows
    //     }&fit=crop&auto=format&dpr=2 2x`,
    // };

    return {
        src: image,
        srcSet: image,
    };
}

export interface GalleryProps {
    selectionMode: boolean,
    onClose: (files: string[]) => void,
}

const Gallery: React.FC<GalleryProps> = ({selectionMode, onClose}) => {
    const {images, uploadImage, deleteImage, refreshImages} = useImages();

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const [selected, setSelected] = React.useState<string[]>([]);

    const {showDialog, dialogProps} = useDialog();

    const handleDelete = async (image: [imageName: string, imageUrl: string]) => {
        const [imageName, imageUrl] = image;

        const result = await showDialog({
            content: `Do you want to delete image ${imageName}?`,
        });

        if (result === 'cancelled') return;

        await deleteImage(imageName);

        if (selected.indexOf(imageUrl) !== -1) {
            setSelected(selected.filter((item) => item !== imageUrl));
        }

        await refreshImages();
    }

    const handleSelect = (imageUrl: string) => {
        if (!selectionMode) return;

        if (selected.indexOf(imageUrl) === -1) {
            setSelected([...selected, imageUrl]);
        } else {
            setSelected(selected.filter((item) => item !== imageUrl));
        }
    }

    const handleSave = async (files: File[]) => {
        console.log('handleSave', files);

        await Promise.all(files.map(uploadImage));

        await refreshImages();

        setDialogOpen(false);
    };

    if (!images) {
        return <div>Loading...</div>
    }

    console.log('render Gallry')

    return (
        <Stack direction='column'>
            <Button
                variant="contained"
                color='info'
                startIcon={<CloudUploadIcon/>}

                onClick={() => setDialogOpen(true)}
            >
                Upload
            </Button>
            <DropzoneDialog
                open={dialogOpen}
                acceptedFiles={["image/jpeg", "image/png", "image/jpg", "image/webp"]}
                showPreviews={true}
                maxFileSize={5000000}
                filesLimit={10}
                onClose={() => setDialogOpen(false)}
                onSave={handleSave}
                fileObjects={[]}
            />
            <ImageList
                sx={{
                    width: '100%',
                    // height: 420,
                    // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                    transform: 'translateZ(0)',
                }}
                rowHeight={200}
                gap={10}
                cols={3}
                variant="quilted"
            >
                {images.map((image) => {
                    const cols = 1;
                    const rows = 1;

                    return (
                        <ImageListItem key={image.url} cols={cols} rows={rows} sx={{cursor: 'pointer'}}
                                       onClick={() => handleSelect(image.url)}>
                            <img
                                /*{{...srcset(image.url, 250, 200, rows, cols)}}*/


                                src={image.url}
                                alt={image.name}
                                loading="eager"
                            />
                            <ImageListItemBar
                                sx={{
                                    background:
                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                }}
                                title={image.name}
                                position="top"
                                actionIcon={
                                    <Stack direction='row'>
                                        {selectionMode && <Checkbox
                                            checkedIcon={<CheckCircleIcon color='info'/>}
                                            icon={<CircleOutlinedIcon sx={{color: '#fff'}}/>}
                                            checked={selected.includes(image.url)}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleSelect(image.url)
                                            }}/>
                                        }

                                        <IconButton onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete([image.name, image.url])
                                        }}
                                                    sx={{color: '#fff'}}
                                        >
                                            <DeleteOutlinedIcon/>
                                        </IconButton>
                                    </Stack>

                                }
                                actionPosition="left"
                            />
                        </ImageListItem>
                    );
                })}
            </ImageList>

            {!!selected.length && <Button variant='contained'
                                          onClick={() => onClose(selected)}
                                          sx={{
                                              position: 'absolute',
                                              transform: 'translate(-50%,-5%)',
                                              left: '50%',
                                              bottom: '0',
                                              px: 4,
                                              py: 2,
                                              fontSize: 'h6.fontSize'

                                          }}>Confirm</Button>}

            <ConfirmDialog confirmText={'Delete'} cancelText={'Cancel'} title={'Delete image?'}
                           content={'Do you want to delete image? '} {...dialogProps}  />
        </Stack>

    );
}

export default Gallery;