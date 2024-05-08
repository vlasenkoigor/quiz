import Button from '@mui/material/Button';
import React from 'react';


export const StartPage: React.FC<{ startGame: () => void }> = ({startGame}) => {
    return (
        <div>
            <Button onClick={startGame}>Start Game</Button>
        </div>
    );
}