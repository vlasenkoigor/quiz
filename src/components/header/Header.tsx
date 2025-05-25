import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router';

import UserMenu from './UserMenu';
import { useTheme } from '@mui/material/styles';
import SignUpButton from './SignUpButton';
import SignInButton from './SignInButton';
import Stack  from '@mui/material/Stack/Stack';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppContext } from '@/app/AppContext';

function Header() {
  const theme = useTheme();

  const {
    state: { user },
  } = useAppContext();

  const location = useLocation();

  const navigate = useNavigate();
  return (
    //#2476147d
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.light,
        borderBottom: '2px solid',
        borderImageSource: 'linear-gradient(to right, #08bc32, #288033)',
        borderImageSlice: 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters variant={'dense'} sx={{ height: '80px' }}>
          <Grid container>
            <Grid item xs={1} sm={4} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
              <Box>
                {location.pathname !== '/' && <ArrowBackIcon cursor={'pointer'} onClick={() => navigate(-1)} />}
              </Box>
            </Grid>
            <Grid
              item
              xs={8}
              sm={4}
              sx={{ display: 'flex', justifyContent: { sx: 'start', sm: 'center' }, alignItems: 'center' }}
            >
              <Typography
                variant="h5"
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',

                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  ml: 0,
                }}
              >
                Quizzlyy
              </Typography>
            </Grid>

            <Grid item xs={3} sm={4} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
              {!user && (
                <Stack direction={'row'} spacing={2}>
                  <SignInButton />
                  <SignUpButton />
                </Stack>
              )}

              <UserMenu />
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
