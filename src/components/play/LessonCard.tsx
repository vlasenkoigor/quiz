import Box from '@mui/material/Box/Box';
import Card from '@mui/material/Card/Card';
import Stack from '@mui/material/Stack/Stack';
import { Link as RouterLink } from 'react-router';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import React from 'react';
import { TLesson } from '../../services/use-lessons';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';

interface LessonCardProps {
  lesson: TLesson;
  completed: boolean;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, completed }) => (
  <Box component={RouterLink} to={`lessons/${lesson.id}`}>
    <Card sx={{ width: '220px', height: '250px', position: 'relative', backgroundColor: 'rgba(255, 215, 0, 1)' }}>
      <CardContent sx={{ position: 'absolute', width: 1, bottom: '0px', left: '0', ml: 0, pl: 0 }}>
        <Stack direction={'row'} spacing={2}>
          <Box sx={{ backgroundColor: 'rgba(255, 215, 0, 1)', width: '6px', height: '30px' }} />

          <Typography variant={'h5'} align={'left'} sx={{ pr: '10px', color: '#fff' }}>
            {lesson.name}
          </Typography>
        </Stack>
      </CardContent>

      <CardMedia
        component="img"
        sx={{ height: '0.975', width: 1, objectFit: 'cover' }}
        image={lesson.image}
        alt={lesson.name}
      />
    </Card>
  </Box>
);

const StrokedText = styled(Typography)(() => ({
  color: 'white',
  textShadow: `
        1px 1px 2px #aaa, 
        2px 2px 4px #999, 
        3px 3px 6px #888
  `,
}));
