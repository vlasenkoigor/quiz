import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useLesson } from '../../services/use-lessons';
import Button from '@mui/material/Button';
import { isLessonCompleted, useProgress } from '../../services/use-progress';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';

const PlayLesson: React.FC = () => {
  const { moduleId, lessonId } = useParams();

  if (!moduleId || !lessonId) return <div>Module not found</div>;

  const { lesson, error } = useLesson(moduleId, lessonId);

  const { progress, completeLesson } = useProgress();

  console.log('progress', progress);

  const isCompleted = useMemo(() => {
    if (!progress) return false;

    return isLessonCompleted(progress, moduleId, lessonId);
  }, [progress]);

  console.log('isCompleted', isCompleted);

  if (!lesson) return <div>Loading</div>;

  if (error) return <div>{error}</div>;

  return (
    <>
      <Card
        elevation={0}
        sx={{
          width: 1,
          height: '400px',
          borderRadius: 0,
          position: 'relative',
          backgroundImage: `url(${lesson.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // backgroundAttachment:'fixed'
        }}
      >
        {/*<CardMedia*/}
        {/*    component="img"*/}
        {/*    width='100%'*/}
        {/*    image={lesson.image}*/}
        {/*    alt={lesson.name}*/}

        {/*    sx={{*/}
        {/*        objectFit: 'cover',*/}
        {/*        display: 'block',*/}
        {/*        width: 1,*/}
        {/*        height: 1,*/}
        {/*    }}*/}
        {/*/>*/}
      </Card>
      <Container maxWidth={'md'} disableGutters>
        <Card elevation={0} sx={{ width: 1, background: 'white', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
          <CardContent sx={{ '& img': { maxWidth: '100%' } }}>
            <Typography gutterBottom variant={'h3'} align={'center'}>
              {lesson.name}
            </Typography>
            <Box className="ql-editor" sx={{ width: 1 }} dangerouslySetInnerHTML={{ __html: lesson.description }}></Box>

            {!isCompleted ? (
              <Button
                variant="contained"
                color={'success'}
                sx={{ m: 2 }}
                onClick={() => completeLesson(moduleId, lessonId)}
              >
                Complete lesson
              </Button>
            ) : (
              <Typography variant={'h6'}>Lesson completed</Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default PlayLesson;
