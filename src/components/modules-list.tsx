import Grid from '@mui/material/Grid/Grid';
import Container from '@mui/material/Container/Container';
import ModuleCard from '@/components/ModuleCard';
import React from 'react';
import { useModuleList } from '@/data/module/use-module-list';
import { createArray } from '@/utils/arrays';
import ModuleCardSkeleton from './module-card-skeleton';

const ModulesList: React.FC = () => {
  const { modules, loading } = useModuleList();

  return (
    <Container maxWidth={'lg'}>
      <Grid container spacing={2}>
        {!loading
          ? modules.map((module, index) => (
              <ModuleGridItem key={index}>
                <ModuleCard key={index} module={module} />
              </ModuleGridItem>
            ))
          : createArray(6, (i) => {
              return (
                <ModuleGridItem key={i}>
                  <ModuleCardSkeleton key={i} />
                </ModuleGridItem>
              );
            })}
      </Grid>
    </Container>
  );
};

const ModuleGridItem: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      {children}
    </Grid>
  );
};

export default ModulesList;
