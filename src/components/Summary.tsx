import Button from '@mui/material/Button';
import React from 'react';


export const Summary: React.FC<{ score: number }> = ({score}) => {
    return (
        <div>
            <h1>Game Over!</h1>
            <h2>Your score is {score}</h2>
            <Button onClick={() => window.location.reload()} variant={'outlined'}>Restart</Button>
        </div>
    );
}