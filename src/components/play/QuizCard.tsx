import {Box, Card} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import Typography from "@mui/material/Typography";
import React from "react";
import CardContent from "@mui/material/CardContent";
import {TQuiz} from "../../services/use-quiz.ts";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
interface QuizCardProps {
    quiz: TQuiz;
}

export const QuizCard: React.FC<QuizCardProps> = ({quiz}) => (
    <Box component={RouterLink} to={`quizzes/${quiz.id}`}>
        <Card sx={{
            width: '200px',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, rgb(0 6 255 / 70%) 0%, rgb(0 159 255 / 50%) 70%, rgb(44 107 255 / 51%) 100%)'
        }}>

            <CardContent>
                <PlayCircleIcon sx={{fontSize: '100px'}} />
            </CardContent>
        </Card>

    </Box>
);

