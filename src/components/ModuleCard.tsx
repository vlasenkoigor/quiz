import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import Button from '@mui/material/Button';
import { type TModule } from '@/data/module/module-api';

// Play module card
interface ModuleCardProps {
  module: TModule;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'space-between',
          height: '400px',
          maxHeight: '400px',
          mb: '20px',
          pb: 2,
        }}
      >
        <Box
          component={RouterLink}
          to={`/play/module/${module.id}`}
          sx={{
            width: '100%',
            height: '200px',
            flexShrink: 0,
            mb: 2,
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <CardMedia
            component="img"
            src={module.image}
            alt={module.name}
            sx={{
              objectFit: 'cover',
              display: 'block',
              width: 1,
              height: 1,
              transition: 'transform 5s ease',
              '&:hover': { transform: 'scale(1.2)' },
            }}
            loading="eager"
          />
        </Box>
        <CardContent sx={{ flexGrow: 1, width: 1, overflow: 'hidden', px: 2, py: 0 }}>
          <Typography component="div" variant="h5" noWrap={true} align={'center'}>
            {module.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {module.description}
          </Typography>
        </CardContent>

        <Button
          component={RouterLink}
          to={`/play/module/${module.id}`}
          sx={{ alignSelf: 'center' }}
          variant="contained"
          endIcon={<SportsBarIcon />}
        >
          Learn
        </Button>
      </Card>
    </>
  );
};

export default ModuleCard;
