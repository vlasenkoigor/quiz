import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import { Link as RouterLink, Outlet, useMatches, NavLink } from 'react-router';
import { UIMatch } from '@remix-run/router';
import Container from '@mui/material/Container';
import { AdminToolkitProvider } from '@/components/admin/shared/AdminToolkitContext';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  // whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Admin() {
  const [open, setOpen] = React.useState(true);

  let matches: UIMatch<unknown, RouteHandle>[] = useMatches() as unknown as UIMatch<unknown, RouteHandle>[];

  const crumbElements = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // // now map them into an array of elements, passing the loader
    // // data to each one
    .map((match) => match.handle.crumb(match));

  console.log(matches);

  console.log(crumbElements);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h6">Admin</Typography>
        </DrawerHeader>
        <Divider />
        <List>
          <MenuListItem key={0} text="Modules" open={open} link="modules" Icon={MenuBookOutlinedIcon} />
          <MenuListItem key={1} text="Galery" open={open} link="gallery" Icon={CollectionsOutlinedIcon} />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, px: { xs: 5 }, py: 5, bgcolor: '#fff', minHeight: '100vh', display: 'flex' }}
      >
        <Container maxWidth={false} sx={{ width: '100%', maxWidth: '2000px' }}>
          <AdminToolkitProvider>
            <Outlet />
          </AdminToolkitProvider>
        </Container>
      </Box>
    </Box>
  );
}

type MenuListItemProps = {
  text: string;
  open: boolean;
  link: string;
  Icon: React.ElementType;
};

const MenuListItem: React.FC<MenuListItemProps> = ({ text, open, link, Icon }) => (
  <NavLink to={link}>
    {({ isActive }) => (
      // <ListItem key={text}  disablePadding sx={{display: 'block'}}>
      <ListItemButton
        selected={isActive}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          <IconButton>
            <Icon />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary={text} sx={{ color: '#000' }} />
      </ListItemButton>
      // </ListItem>
    )}
  </NavLink>
);
