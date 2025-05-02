import {useParams} from 'react-router-dom';
import Box from "@mui/material/Box";
import * as React from "react";
import {TQuestion, useQuiz} from "../services/use-quiz.ts";
import {
    Card, CardHeader,
    Checkbox,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    Input,
    Stack
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import Button from "@mui/material/Button";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import {useState} from "react";
import ConfirmDialog from "./ConfirmDialog.tsx";
import {useDialog} from "../hooks/use-dialog.ts";


export function Quiz() {
    const {id: moduleID, quizId} = useParams();

    if (!moduleID || !quizId) {
        return <div>Invalid URL</div>
    }

    const {quiz, updateQuiz, isUpdating, error} = useQuiz(moduleID, quizId);

    const {showDialog, dialogProps} = useDialog()

    const [showEditQuestion, setShowEditQuestion] = useState(false);

    const [editingMode, setEditingMode] = useState<'edit' | 'add'>('add');

    const [activeQuestion, setActiveQuestion] = useState<TQuestion>({text: '', answers: []});

    const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(-1);

    if (error) {
        return <div>{error}</div>
    }

    if (!quiz) {
        return <div>Loading...</div>
    }


    return (
        <>
            <Typography variant="subtitle1" color="text.primary" component="div">
                Questions
            </Typography>


            <Button variant="text" startIcon={<AddBoxSharpIcon/>} onClick={() => {
                setEditingMode('add');
                setActiveQuestionIndex(-1);
                setActiveQuestion({text: '', answers: []});
                setShowEditQuestion(true)
            }}>
                Add question
            </Button>


            {quiz.questions?.map((question, index) => (
                    <QuestionCard key={index} data={question}
                                  onEditClick={() => {
                                      setActiveQuestion(question);
                                      setEditingMode('edit');
                                      setActiveQuestionIndex(index);
                                      setShowEditQuestion(true);
                                  }}

                                  onDeleteClick={async () => {
                                      const settleStatus = await showDialog();
                                      if (settleStatus === 'cancelled') return;

                                      const questions = [...(quiz.questions || [])];

                                      questions.splice(index, 1);
                                      await updateQuiz({questions});
                                  }}
                    />
                )
            )}

            {showEditQuestion &&
                <EditQuestionCard data={activeQuestion}
                                  onClose={() => setShowEditQuestion(false)}
                                  updateQuestion={async (data) => {
                                      if (editingMode === 'edit') {
                                          const questions = [...quiz.questions || []];

                                          questions[activeQuestionIndex] = data;

                                          await updateQuiz({questions});
                                      } else {
                                          await updateQuiz({questions: [...(quiz.questions || []), data]});
                                      }
                                  }}/>}


            <ConfirmDialog confirmText={'Delete'} cancelText={'Cancel'} title={'Delete question?'}
                           content={'Do you want to delete question? '} {...dialogProps}  />
        </>
    )
}

type TQuestionCardProps = {
    data: TQuestion;
    onEditClick: () => void;
    onDeleteClick: () => void;
}
const QuestionCard: React.FC<TQuestionCardProps> = ({data, onEditClick, onDeleteClick}) => {
    return (
        <Card sx={{display: 'flex', flexDirection: 'column', mb: '20px'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <CardHeader
                    action={
                        <Box>
                            <IconButton onClick={onDeleteClick}>
                                <DeleteIcon color='warning'/>
                            </IconButton>
                            <IconButton onClick={onEditClick}>
                                <EditIcon color='info'/>
                            </IconButton>
                        </Box>

                    }

                    title={<Typography variant='subtitle1'>{data.text}</Typography>}
                />
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Grid container spacing={2}>
                        {data?.answers.map((answer, index) => (
                            <Grid key={index} item xs={6}>
                                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>

                                    {answer.correct ? <CheckIcon color='success'/> : <CloseIcon color='error'/>}

                                    <Typography variant="body1" color="text.primary" component="div">
                                        {answer.text}
                                    </Typography>

                                </Box>
                            </Grid>))}
                    </Grid>
                </CardContent>
            </Box>

        </Card>
    )
}


const Answer: React.FC<{
    data: { text: string, correct: boolean },
    onChange: (data: { text: string, correct: boolean }) => void
    deleteAnswer: () => void
}> = ({data, onChange, deleteAnswer}) => {

    const {text, correct} = data;


    console.log('render EditQuestionCard.Answer')
    return (
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox checked={correct}
                      icon={<CloseIcon color='error'/>}
                      checkedIcon={<CheckIcon color='success'/>}
                      onChange={(e) => onChange({...data, ...{correct: e.target.checked}})}
            />
            <Input fullWidth value={text} onChange={(e) => onChange({...data, ...{text: e.target.value}})}/>

            <IconButton onClick={deleteAnswer}>
                <DeleteIcon color='info'/>
            </IconButton>
        </Box>
    )
}


type TQuestionProps = {
    data: TQuestion;
    updateQuestion: (question: TQuestion) => Promise<void>;
    onClose: () => void;
}


const EditQuestionCard: React.FC<TQuestionProps> = ({data, updateQuestion, onClose}) => {
    const [answers, setAnswers] = useState(data.answers);

    const [text, setText] = useState(data.text);

    function addAnswer() {
        setAnswers([...answers, {text: '', correct: false}]);
    }

    const {showDialog, dialogProps} = useDialog();

    async function onDeleteClicked(index: number) {
        const settle = await showDialog();

        if (settle === 'cancelled') return;

        answers.splice(index, 1);

        setAnswers([...answers]);
    }

    async function save() {
        await updateQuestion({text, answers});
        onClose()
    }

    function cancel() {
        onClose();
    }

    return (
        <>
            <Dialog
                open={true}
                keepMounted
                fullWidth={true}
                maxWidth='md'
                // onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <Card sx={{display: 'flex', flexDirection: 'column'}}>

                    <DialogTitle>Add question</DialogTitle>
                    <DialogContent>
                        <CardContent sx={{flex: '1 0 auto'}}>

                            <FormControl fullWidth sx={{m: 1}} variant="standard">
                                <Input value={text} onChange={(event) => setText(event.target.value)}/>
                            </FormControl>

                            <Typography variant='h6'>Answers:</Typography>

                            <Grid container spacing={2}>

                                {answers.map((answer, index) => (
                                    <Grid key={index} item xs={6}>
                                        <Answer data={answer} onChange={
                                            (data) => {
                                                answers[index] = data;
                                                setAnswers([...answers]);
                                            }
                                        }
                                                deleteAnswer={onDeleteClicked.bind(null, index)}
                                        />
                                    </Grid>
                                ))}

                                <Grid item xs={6}>
                                    <IconButton onClick={addAnswer}>
                                        <AddBoxSharpIcon color='info'/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </DialogContent>
                    <DialogActions sx={{justifyContent: 'center'}}>
                        <Stack direction="row" spacing={2}>
                            <Button onClick={cancel} variant="contained" color="error">Cancel</Button>
                            <Button onClick={save} variant="contained" color="success">Save</Button>
                        </Stack>
                    </DialogActions>
                </Card>
            </Dialog>

            <ConfirmDialog confirmText={'Delete'} cancelText={'Cancel'} title={'Delete question?'}
                           content={'Do you want to delete question? '} {...dialogProps}  />

        </>


    )
}