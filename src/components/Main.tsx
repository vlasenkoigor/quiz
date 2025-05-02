import {Card, Grid} from "@mui/material";
import {useReadModules} from "../hooks/module/use-modules.ts";
import ModuleCard from "./ModuleCard.tsx";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import BlackedOverlay from "./shared/BlackedOverlay.tsx";

const Main: React.FC = () => {

    const {modules} = useReadModules();

    return (
        <>
            <Card sx={{maxHeight: '500px', borderRadius: 0, mb: 2, position: 'relative'}}>
                <BlackedOverlay withDot>
                    <CardContent sx={{
                        fontSize:'0.5rem',
                        width: 1,
                        height: 1,
                        color: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <Typography variant={'h2'} align={'center'} sx={{mb: 3}}>Learn history and facts about
                            beer</Typography>
                        <Typography variant='h4' align={'center'}>Check material, lessons and complete interactive
                            tests</Typography>


                    </CardContent>
                </BlackedOverlay>

                <CardMedia component='video' controls={false} playsInline={true} src='/5538056-uhd_4096_2160_25fps.mp4'
                           autoPlay={true}
                           muted={true}
                           loop></CardMedia>

            </Card>
            <Container maxWidth={'lg'}>
                <Grid container spacing={2}>
                    {modules.map((module, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}><ModuleCard key={index} module={module}/></Grid>))}
                </Grid>
            </Container>

        </>

    )
}

export default Main