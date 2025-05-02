import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {TAnswer, TQuestion, useReadQuiz} from "../../services/use-quiz.ts";
import {CircularProgress, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {shuffleArray, wait} from "../../lib/utils.ts";
import QuizSummaryPopup from "../../components/quiz/QuizSummaryPopup.tsx";
import {useDialog} from "../../hooks/use-dialog.ts";

import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";

const PlayQuiz: React.FC = () => {
    const {moduleId, quizId} = useParams();

    if (!moduleId || !quizId) return ('Invalid URL');

    const navigate = useNavigate();

    const {showDialog, dialogProps} = useDialog();

    const {quiz, error} = useReadQuiz(moduleId, quizId);

    // shuffled questions
    const [questions, setQuestions] = useState<TQuestion[]>([]);

    // current shuffled answers
    const [answers, setAnswers] = useState<TAnswer[]>([]);

    const [correctAnswer, setCorrectAnswer] = useState(-1);

    const [wrongAnswer, setWrongAnswer] = useState(-1);

    const [processing, setProcessing] = useState(false)

    // on load
    useEffect(() => {
        if (quiz) {
            setQuestions(shuffleArray([...(quiz?.questions || [])]));
        }
    }, [quiz]);

    useEffect(() => {
        if (questions.length > 0) {
            setAnswers(shuffleArray(questions[0]?.answers || []));
        }
    }, [questions]);

    if (error) return (<div>{error}</div>);

    if (!quiz) return (<div>Loading</div>);

    async function checkAnswer(answerIndex: number) {
        if (processing) return;

        const correctAnswerIndex = answers.findIndex(a => a.correct) ?? -1;

        setCorrectAnswer(correctAnswerIndex);

        if (correctAnswerIndex !== answerIndex) {
            setWrongAnswer(answerIndex);
        }

        setProcessing(true);

        await wait(1000);


        if (questions.length > 0) {

            if (correctAnswerIndex === answerIndex) {
                setQuestions(questions.slice(1));
            } else {
                questions.push(questions.shift() as TQuestion);
                setQuestions([...questions]);
            }

        } else {
            const userConfirm = await showDialog();

            if (userConfirm === 'confirmed') {
                // reset entire quiz
                setQuestions(shuffleArray(quiz?.questions || []));
            } else {
                navigate(`/play/module/${moduleId}`)
            }
        }

        setProcessing(false);
        setCorrectAnswer(-1);
        setWrongAnswer(-1);
    }

    return (
        <Container maxWidth={'md'}
                   sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <QuizSummaryPopup {...dialogProps}/>
            <Stack direction='column' spacing={3} alignItems={'center'} marginTop={3}>
                <Typography variant="h5" color="text.secondary" align={'center'}>
                   Module name
                </Typography>

                <Box sx={{position: 'relative', display: 'inline-flex'}}>
                    <CircularProgress variant="determinate" color='success' size={40}
                                      thickness={4}
                                      value={((quiz?.questions?.length ?? 0) - questions.length) / (quiz?.questions?.length ?? 0) * 100}/>
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            variant="body2"
                            component="div"
                            noWrap
                            color="text.secondary"
                        >{`${(quiz?.questions?.length ?? 0) - questions.length} / ${quiz?.questions?.length ?? 0}`}</Typography>
                    </Box>
                </Box>
                <Typography variant="h6" color="text.secondary" align={'center'}>
                    {questions[0]?.text}
                </Typography>


                <Stack spacing={2} sx={{width: '350px'}} direction='column' alignItems={'center'}>
                    {answers.map((answer, i) => (
                        <Button key={i}
                                variant={'contained'}
                                color={correctAnswer === i ? 'success' : wrongAnswer === i ? 'error' : 'white'}
                                disableTouchRipple
                                sx={{
                                    width: 1,
                                    height: '50px',
                                    textTransform: 'none', overflow: 'hidden'
                                }}
                                onClick={() => checkAnswer(i)}>{answer.text}</Button>
                    ))}
                </Stack>
            </Stack>

        </Container>
    )
}

export default PlayQuiz;