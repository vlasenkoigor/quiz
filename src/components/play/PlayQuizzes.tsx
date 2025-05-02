import React from "react";
import Grid from "@mui/material/Grid";
import {Stack} from "@mui/material";
import {useReadQuizzes} from "../../services/use-quiz.ts";
import {QuizCard} from "./QuizCard.tsx";

interface PlayQuizzesProps {
    moduleId: string;
}

const PlayQuizzes: React.FC<PlayQuizzesProps> = ({moduleId}) => {
    const {quizzes, loading} = useReadQuizzes(moduleId);

    if (loading) return (<div>Loading</div>);
    console.log('lessons', quizzes);

    return (
        <Stack spacing={2} direction='row' justifyContent={'center'}>
            {quizzes.map((quiz, i) => <Grid item key={i}><QuizCard quiz={quiz}/></Grid>)}
        </Stack>
    )
}

export default PlayQuizzes;