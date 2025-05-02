import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import {useLesson} from "../services/use-lessons.ts";
import {Edit} from "./Edit.tsx";
import SelectPicture from "./shared/SelectPicture.tsx";
import Typography from "@mui/material/Typography";

export function Lesson() {
    const {id: moduleID, lessonId} = useParams();

    if (!moduleID || !lessonId) {
        return <div>Invalid URL</div>
    }

    const {lesson, updateLesson, isUpdating, error, lessonRef} = useLesson(moduleID, lessonId);

    const [description, setDescription] = useState(lesson?.description || '');

    const [name, setName] = useState(lesson?.name || '');

    const [image, setImage] = useState(lesson?.image || '');

    useEffect(() => {
        setDescription(lesson?.description || '');
        setName(lesson?.name || '');
        setImage(lesson?.image || '');
    }, [lesson]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        updateLesson({
            name,
            description,
            image
        })
    }

    if (error) {
        return <div>{error}</div>
    }

    if (!lesson) {
        return <div>Loading...</div>
    }

    return (
        <>
            <SelectPicture image={image} setImage={setImage} />

            <Box component='form' noValidate onSubmit={handleSubmit}>
                <TextField disabled={isUpdating} name='name' fullWidth id="fullWidth" value={name}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               setName(event.target.value);
                           }}/>

                <Typography variant={'subtitle1'}>Description</Typography>

                <Edit disabled={isUpdating} value={description} setValue={setDescription}/>
                <Button
                    disabled={isUpdating}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Update lesson
                </Button>
            </Box>
        </>
    )
}


