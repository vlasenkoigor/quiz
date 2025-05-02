import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu, {MenuProps} from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { styled, alpha } from '@mui/material/styles';
import {useAppContext} from "@/app/AppContext.tsx";
import {Link as RouterLink} from "react-router-dom";
import {useAuth} from "../../services/auth/auth-firebase.ts";
const UserMenu = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const {signOut} = useAuth();

    const signOutClicked = async ()=>{
        handleCloseUserMenu();

        signOut();
    }

    const {state : {user}}  = useAppContext()


    console.log('user', user   )
    if (!user) return null

    return (
        <Box>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.displayName || ''} src={user.photoURL || ''}   sx={{ width: 40, height: 40 }} />
                </IconButton>
            </Tooltip>
            <StyledMenu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}

                disableScrollLock={false}
            >
                <MenuItem onClick={handleCloseUserMenu} disableRipple component={RouterLink} to='/profile'>
                    <Person2Icon />
                    Profile
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu} disableRipple component={RouterLink} to='/achievements'>
                    <EmojiEventsIcon />
                    Achievements
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={signOutClicked} disableRipple>
                    <LogoutIcon />
                    Logout
                </MenuItem>
            </StyledMenu>
        </Box>
    );
};

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));



export default UserMenu;