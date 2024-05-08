import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import type {TPlayer} from "../App.tsx";
import ButtonGroup from '@mui/material/ButtonGroup';

import {useEffect, useState} from 'react'

type TRound = {
    player: TPlayer,

    score: number

    time: number

    confirm: (answer: number) => void
}

export const Play: React.FC<TRound> = (props) => {

    const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

    const shuffle = (array: number[]) => {
        return array.sort(() => Math.random() - 0.5);
    }

    const [answer, setAnswer] = useState(0);

    const [allOptions, setAllOptions] = useState<number[]>(shuffle([props.player.jerseyNumber, ...props.player.wrongJerseyNumbers]))

    return (
        <div>
            <h3>Time left: {props.time}</h3>
            <h3>Score: {props.score}</h3>
            <Card sx={{maxWidth: 500, width: 400}}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="180"
                    image={`/${props.player.image}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.player.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        What is the jersey number of {props.player.name} in {props.player.club}?
                    </Typography>

                </CardContent>

                <CardContent>
                    <ButtonGroup variant="contained">
                        {allOptions.map((option) => (
                            <Button key={option} color={answer === option ? 'success' : 'primary'} onClick={() => setAnswer(option)}>{option}</Button>
                        ))}
                    </ButtonGroup>
                </CardContent>

                {/*<TextField*/}
                {/*    id="outlined-number"*/}
                {/*    label="Number"*/}
                {/*    type="number"*/}
                {/*    value={answer}*/}
                {/*    onChange={(e) => setAnswer(clamp(parseInt(e.target.value), 1, 99))}*/}
                {/*    InputLabelProps={{*/}

                {/*        shrink: true,*/}
                {/*    }}*/}
                {/*/>*/}

                <CardContent>
                    <Button size="small" onClick={() =>{ props.confirm(answer); setAnswer(0) }}>Confirm</Button>
                </CardContent>
            </Card>
        </div>
    );
}