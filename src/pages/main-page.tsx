import  Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BlackedOverlay from '@/components/shared/BlackedOverlay';
import React from 'react';
import ModulesList from '@/components/modules-list';

const MainPage: React.FC = () => {
  return (
    <>
      <Card sx={{ maxHeight: '500px', borderRadius: 0, mb: 2, position: 'relative' }}>
        <BlackedOverlay withDot>
          <CardContent
            sx={{
              fontSize: '0.5rem',
              width: 1,
              height: 1,
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant={'h2'} align={'center'} sx={{ mb: 3 }}>
              Create and learn with ease
            </Typography>
            <Typography variant="h4" align={'center'}>
              Build courses, add quizzes, and start sharing knowledge in minutes
            </Typography>
          </CardContent>
        </BlackedOverlay>

        {/*<CardMedia*/}
        {/*  component="video"*/}
        {/*  controls={false}*/}
        {/*  playsInline={true}*/}
        {/*  src="/1113140_Opening_Educational_1280x720.mp4"*/}
        {/*  autoPlay={true}*/}
        {/*  muted={true}*/}
        {/*  loop*/}
        {/*></CardMedia>*/}
      </Card>
      <ModulesList />
    </>
  );
};

export default MainPage;
