import {Link as RouterLink, useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import {useLessons} from "../../services/use-lessons.ts";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import {
    Card,
    CardActionArea,
    CardActions,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Stack
} from "@mui/material";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useQuizzes} from "../../services/use-quiz.ts";
import {LessonCard} from "../../components/play/LessonCard.tsx";
import SelectPicture from "../../components/shared/SelectPicture.tsx";
import {TModule} from "@/services/api/module-api.ts";
import PublishWithdrawButton from "@/components/admin/shared/publish-withdraw-button.tsx";
import {AdminModuleProvider, useAdminModule} from "@/providers/admin-module-provider.tsx";
import LoadingCircleBox from "@/components/shared/LoadingCircleBox.tsx";
import {usePublishWithdrawWithConfirmation} from "@/hooks/admin/use-publish-withdraw-with-confirmation.tsx";
import DeleteButton from "@/components/admin/shared/delete-button.tsx";
import {useRemoveWithConfirmation} from "@/hooks/admin/use-remove-with-confirmation.tsx";
import {useAdminToolkit} from "@/components/admin/shared/AdminToolkitContext.tsx";


function EditModule() {
    const {moduleId, module, error, loading, mutating, updateModule, removeModule} = useAdminModule();

    // const {quizzes, addQuiz, deleteQuiz} = useQuizzes(moduleRef)

    const [name, setName] = useState(module?.name || '');

    const [description, setDescription] = useState(module?.description || '');

    const [image, setImage] = useState(module?.image || '');

    const {lessons, addLesson} = useLessons(moduleId);

    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        setDescription(module?.description || '');
        setName(module?.name || '');
        setImage(module?.image || '');
    }, [module]);


    const publish = async () => updateModule({published: true});

    const withdraw = async () => updateModule({published: false});

    const {} = useAdminToolkit();

    const {publishOrWithdraw} = usePublishWithdrawWithConfirmation(module?.published || false, publish, withdraw, error);

    const {confirmRemove} = useRemoveWithConfirmation(removeModule, error, {entityName: 'module'});

    const navigate = useNavigate();

    const remove = async ()=>{
        await confirmRemove();

        !error && navigate('/admin/modules');
    }

    if (error) {
        return <div>{error}</div>
    }

    if (loading) {
        return <LoadingCircleBox open={true}/>
    }

    return (

        <>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start'
            }}>
                <Stack width={1} direction='row' alignItems='start' justifyContent='space-between' sx={{py: 2}}>
                    <Typography variant="h4" component='div' fontWeight={'bold'} align='left'
                                sx={{alignSelf: 'start'}}>{module.name}{module.name}</Typography>


                    <Stack direction='row' spacing={1}>
                        <PublishWithdrawButton
                            published={module.published}
                            action={publishOrWithdraw}
                            buttonProps={{disabled: mutating}}
                        />

                        <DeleteButton action={remove} buttonProps={{disabled: mutating}} text="Delete module"/>
                    </Stack>
                </Stack>

                <Stack maxWidth='640px' width='100%'>
                    <SelectPicture image={image} setImage={setImage}/>

                    <TextField
                        autoFocus
                        autoComplete={'off'}
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Module name"
                        type="string"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="description"
                        name="description"
                        label="Module description"
                        type="text"
                        rows={4}
                        multiline
                        fullWidth
                        variant="standard"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />


                    {/*{quizzes.map((quiz, index) => (*/}

                    {/*    <Card sx={{maxWidth: 200, mt: 2}} key={index}>*/}
                    {/*        <CardActionArea>*/}
                    {/*            <CardContent>*/}
                    {/*                <Typography gutterBottom variant="h5" component="div">*/}
                    {/*                    Quiz*/}
                    {/*                </Typography>*/}
                    {/*                <Typography gutterBottom variant="body2" component="div">*/}
                    {/*                    Questions: {quiz.questions?.length || 0}*/}
                    {/*                </Typography>*/}
                    {/*            </CardContent>*/}
                    {/*        </CardActionArea>*/}
                    {/*        <CardActions>*/}
                    {/*            <Button size="small" color="primary" component={RouterLink} to={`quizzes/${quiz.id}`}>*/}
                    {/*                Edit*/}
                    {/*            </Button>*/}
                    {/*            <Button size="small" color="primary" onClick={() => deleteQuiz(quiz.id)}>*/}
                    {/*                Remove*/}
                    {/*            </Button>*/}
                    {/*        </CardActions>*/}
                    {/*    </Card>*/}

                    {/*))}*/}

                    <Button
                        disabled={mutating}
                        type="submit"
                        color='info'
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={() => {
                        }}
                    >
                        Update
                    </Button>

                </Stack>

                <h3>Lessons</h3>

                <Box sx={{width: '100%'}}>
                    <Button variant="outlined" startIcon={<AddBoxSharpIcon/>} onClick={() => setIsOpen(true)}>
                        Add lesson
                    </Button>
                    <AddLessonDialog isOpen={isOpen} handleClose={() => setIsOpen(false)} save={addLesson}/>
                    <Stack spacing={2} direction='row' sx={{mt: 2}}>

                        {lessons.map((lesson, index) => (

                            <Card sx={{maxWidth: 345}} key={index}>

                                <LessonCard lesson={lesson}/>

                                <CardActions>
                                    <Button size="small" color="primary" component={RouterLink}
                                            to={`lessons/${lesson.id}`}>
                                        Edit
                                    </Button>
                                    <Button size="small" color="primary">
                                        Remove
                                    </Button>
                                </CardActions>
                            </Card>

                        ))}

                    </Stack>
                </Box>

                <Typography variant='h5' sx={{m: 2}}>Quiz</Typography>


                {/*<Button variant="outlined" startIcon={<AddBoxSharpIcon/>} onClick={() => setIsOpenQuizAdd(true)}>*/}
                {/*    Add new quiz*/}
                {/*</Button>*/}

                {/*<AddQuizDialog save={addQuiz} handleClose={() => setIsOpenQuizAdd(false)} isOpen={isOpenQuizAdd}/>*/}


            </Box>
        </>

    )
}

const AddQuizDialog: React.FC<{
    isOpen: boolean,
    handleClose: () => void,
    save: (data: Partial<TModule>) => Promise<unknown>
}> = ({isOpen, save, handleClose}) => {

    const [isSaving, setIsSaving] = React.useState(false);


    async function handleSave() {
        setIsSaving(true);
        await save({})
        setIsSaving(false);
        handleClose();
    }

    return (
        <Dialog
            open={isOpen}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Add new quiz</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Do you want to add new quiz to current module?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{justifyContent: 'center'}}>
                <Stack direction="row" spacing={2}>
                    <Button disabled={isSaving} onClick={handleClose} variant="contained" color="error">Cancel</Button>
                    <Button disabled={isSaving} onClick={handleSave} variant="contained" color="success">Add
                        quiz</Button>
                </Stack>
            </DialogActions>
        </Dialog>
    )
}

const AddLessonDialog: React.FC<{
    isOpen: boolean,
    handleClose: () => void,
    save: (data: Partial<TModule>) => Promise<unknown>
}> = ({isOpen, handleClose, save}) => {
    return (
        <Dialog
            maxWidth={'sm'}
            fullWidth={true}
            open={isOpen}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());

                    console.log(formJson);

                    await save({
                        name: formJson.name,
                        description: formJson.description,
                    });

                    console.log('saved');

                    handleClose();
                },


            }}
        >
            <DialogTitle>Add new lesson for module</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Lesson name"
                    type="string"
                    fullWidth
                    variant="standard"
                />

                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="description"
                    name="description"
                    label="Lesson description"
                    type="text"
                    rows={4}
                    multiline
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">add</Button>
            </DialogActions>
        </Dialog>
    )
}



export default EditModule;