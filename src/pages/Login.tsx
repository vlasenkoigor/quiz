import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import {Link as RouterLink} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useAppContext} from "@/app/AppContext.tsx";
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import {useAuth} from "../services/auth/auth-firebase.ts";
import {useState} from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {GoogleIcon} from "../components/shared/icons/GoogleIcon.tsx";
import {FacebookIcon} from "../components/shared/icons/FacebookIcon.tsx";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Alert, Paper} from "@mui/material";
import IconButton from "@mui/material/IconButton";

interface LoginProps {
    mode: 'signIn' | 'signUp'
}

const Login: React.FC<LoginProps> = ({mode}) => {
    const {user} = useAppContext().state

    const {error, loading, signIn, signUp, signInWithProvider} = useAuth();

    const [email, setName] = useState('');

    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {
        if (mode === 'signUp'){
            signUp(email, password);
        } else {
            signIn(email, password);
        }
    };

    if (user) {
        return (<div>you are already logged in {user.email}</div>)
    }

    return (
        <>
            <Container maxWidth="xs"
                       sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Paper
                    sx={{
                        py:2,
                        mt:2,
                        minHeight: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4">
                        {mode === 'signIn' ? 'Welcome back' : 'Welcome'}
                    </Typography>
                    <Grid container spacing={1.5} justifyContent={'center'} sx={{mt: 1}}>
                        <Grid item xs={8}>
                            <Button onClick={() => signInWithProvider('google')} color={'white'}
                                    sx={{fontWeight: 'bold', textTransform: 'none', overflow: 'hidden'}} fullWidth
                                    variant={'contained'} startIcon={<GoogleIcon/>}>Sign in with Google</Button>
                        </Grid>
                        <Grid item xs={8}>
                            <Button onClick={() => signInWithProvider('facebook')} color={'white'}
                                    sx={{fontWeight: 'bold', textTransform: 'none', overflow: 'hidden'}} fullWidth
                                    variant={'contained'} startIcon={<FacebookIcon/>}>Sign in with Facebook</Button>
                        </Grid>
                        <Grid item xs={8}>
                            <Divider><Typography variant={'body2'}>or sign in with email</Typography></Divider>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                required
                                fullWidth
                                value={email}
                                color='info'
                                onChange={(e) => setName(e.target.value)}
                                size='small'
                                id="email"
                                label="Email Address"
                                placeholder={'examle@domain.com'}
                                name="email"
                                autoComplete="email"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailOutlineIcon color={'action'}/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={8} sx={{display: 'flex', flexDirection: 'column'}}>
                            <TextField
                                required
                                fullWidth
                                value={password}
                                color='info'
                                onChange={(e) => setPassword(e.target.value)}
                                size='small'
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="new-password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOpenIcon/>
                                        </InputAdornment>
                                    ),

                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                { showPassword ?  <VisibilityOff/> : <Visibility/>}
                                            </IconButton>

                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {mode === 'signIn' &&
                                <Link component={RouterLink} paddingY={0.3} align={'right'} to='/passowrd-recovery'
                                      variant="caption">
                                    Forgot password?
                                </Link>}

                            {error && <Alert severity="error">{error}</Alert>}
                        </Grid>

                        <Grid item xs={8} display={'flex'} justifyContent={'center'}>
                            <Button
                                onClick={handleSubmit}
                                disabled={loading}
                                fullWidth
                                variant="contained"
                                endIcon={<ArrowForwardIcon/>}
                            >{mode === 'signIn' ? 'Sign In' : 'Sign up'}</Button>
                        </Grid>

                        {mode === 'signIn' &&
                            <Grid item xs={8}>
                                <Typography align={'center'}>Don't have an account? <Link component={RouterLink}
                                                                                          paddingTop={0.3}
                                                                                          align={'right'}
                                                                                          to='/sign-up'
                                >
                                    Sign up
                                </Link></Typography>
                            </Grid>}

                        {mode === 'signUp' && <Grid item xs={8}>
                            <Typography align={'center'}>Already have an account? <Link component={RouterLink}
                                                                                        paddingTop={0.3} align={'right'}
                                                                                        to='/sign-in'
                            >
                                Sign up
                            </Link></Typography>
                        </Grid>}
                    </Grid>
                </Paper>
            </Container>
        </>

    );
}

export default Login;