import React, {useMemo} from "react";
import Grid from "@mui/material/Grid";
import {useLessons} from "../../services/use-lessons.ts";
import {LessonCard} from "./LessonCard.tsx";
import {Stack} from "@mui/material";
import {isLessonCompleted, useProgress} from "../../services/use-progress.ts";

interface PlayLessonsProps {
    moduleId: string;
}

const PlayLessons: React.FC<PlayLessonsProps> = ({moduleId}) => {
    const {lessons} = useLessons(moduleId);

    const progress = null;

    const completedLessons = useMemo(()=>{

        if (!lessons) return [];

        if (!progress) return [];

        return lessons.map(lesson => {
            return isLessonCompleted(progress, moduleId, lesson.id)
        })

    }, [progress, lessons]);

    return (
        <Stack spacing={2} direction='row' sx={{overflowX:'auto'}}>
            {lessons.map((lesson, i) => <Grid item key={i}><LessonCard lesson={lesson} completed={completedLessons[i] || false} /></Grid>)}
        </Stack>
    )
}

export default PlayLessons;