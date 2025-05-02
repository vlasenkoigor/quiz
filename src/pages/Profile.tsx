import Container from "@mui/material/Container";
import {FormControl, Input, InputAdornment, InputLabel, Paper, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import React, {useEffect} from "react";
import {useAppContext} from "@/app/AppContext.tsx";
import {AccountCircle} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {auth} from "../services/firebase-app.ts";
import {updateProfile} from "firebase/auth";

const Profile = () => {
    const {state: {user}} = useAppContext()

    console.log('profile', user)
    const [displayName, setDisplayName] = React.useState(user?.displayName || '')
    const [phoneNumber, setPhoneNumber] = React.useState(user?.phoneNumber || '')

    useEffect(() => {
        setDisplayName(user?.displayName || '')
        setPhoneNumber(user?.phoneNumber || '')
    }, [user]);

    console.log('profile displayName', displayName)

    if (!user) return null

    const saveProfile = async () => {
        console.log('save profile')
        if (!auth.currentUser) return;

        // @ts-ignore
        await updateProfile(auth.currentUser, {
            displayName: displayName,
        })

        console.log('profile updated')
    }

    const onDisplayNameChange = (e) => {
        console.log(e.target.validity.valid)
        setDisplayName(e.target.value);
    }

    return (
        <Container maxWidth={'md'} sx={{my: 3}}>
            <Paper sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                p: 2
            }}>
                <Stack spacing={2}>
                    <Typography variant={'h4'}>Profile</Typography>
                    <Avatar alt={user.displayName || ''} src={user.photoURL || ''} sx={{width: 100, height: 100}}/>
                    <Typography variant={'h5'}>{user.displayName || 'no name'}</Typography>
                    <Typography
                        variant={'h6'}>{user.email || user?.providerData?.find((data) => Boolean(data?.email))?.email || 'no email'}</Typography>

                    <TextField
                        // helperText="Incorrect entry."
                        id="input-with-icon-textfield"
                        label="Name"
                        required
                        value={displayName}
                        onChange={onDisplayNameChange}

                        variant="outlined"
                    />


                    <TextField
                        // helperText="Incorrect entry."
                        id="input-with-icon-textfield"
                        label="Phone Number"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle/>
                                </InputAdornment>
                            ),

                            type: 'text',

                        }}
                        variant="outlined"
                    />

                    <Button onClick={saveProfile}> Update </Button>
                </Stack>

            </Paper>
        </Container>

    );
};

export default Profile;