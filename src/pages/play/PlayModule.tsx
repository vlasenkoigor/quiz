import React from 'react'
import {useModule} from "../../hooks/module/use-modules.ts";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card} from '@mui/material';
import CardMedia from "@mui/material/CardMedia";
import PlayLessons from "../../components/play/PlayLessons.tsx";
import PlayQuizzes from "../../components/play/PlayQuizzes.tsx";
import BlackedOverlay from "../../components/shared/BlackedOverlay.tsx";
import Container from "@mui/material/Container";
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';

const PlayModule: React.FC = () => {
    const {moduleId} = useParams();

    if (!moduleId) return (<div>Module not found</div>);

    const {module, error} = useModule(moduleId);

    if (!module) return (<div>Loading</div>);

    if (error) return (<div>{error}</div>);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: 'rgba(245, 245, 220, 1)',
        }}>
            <Card elevation={0} sx={{width: 1, height: '650px', borderRadius: 0, position: 'relative'}}>
                <BlackedOverlay/>
                <CardMedia
                    component="img"
                    image={module.image}
                    alt={module.name}
                    sx={{
                        objectFit: 'cover',
                        display: 'block',
                        width: 1,
                        height: 1,
                    }}
                />
            </Card>
            <Container maxWidth={'md'}>
                <Typography gutterBottom variant={'h3'} sx={{mt: 2}} align={'center'}>{module.name}</Typography>
                <Typography paragraph variant="body1" align={'center'}>{module.description}</Typography>


            </Container>
            <Container maxWidth={'lg'}>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', mb:2}}>
                    <MenuBookTwoToneIcon sx={{fontSize: '100px', alignSelf : 'center'}}/>
                    <Typography gutterBottom variant={'h3'} sx={{alignSelf : 'center'}}>Lessons</Typography>
                    <PlayLessons moduleId={moduleId}/>
                    <MenuBookTwoToneIcon sx={{fontSize: '100px', alignSelf : 'center'}}/>
                    <Typography gutterBottom variant={'h3'} sx={{alignSelf : 'center'}}>Quiz</Typography>
                    <PlayQuizzes moduleId={moduleId}/>
                </Box>
            </Container>


        </Box>

    )
}


export default PlayModule;