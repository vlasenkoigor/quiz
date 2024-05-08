import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import type {TPlayer} from "../App.tsx";

import {useState} from 'react'
type TRound = {
    player: TPlayer,

    score: number

    time: number

    confirm: (answer: number) => void
}

export const Play: React.FC<TRound> = (props) => {

    const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);


    const [answer, setAnswer] = useState(1);

    return (
        <div>
            <h3>Time left: {props.time}</h3>
            <h3>Score: {props.score}</h3>
            <Card sx={{ maxWidth: 500, width: 400}}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="180"
                    image={`/public/${props.player.image}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.player.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        What is the jersey number of {props.player.name} in {props.player.club}?
                    </Typography>

                </CardContent>

                <TextField
                    id="outlined-number"
                    label="Number"
                    type="number"
                    value={answer}
                    onChange={(e) => setAnswer(clamp(parseInt(e.target.value), 1, 99))}
                    InputLabelProps={{

                        shrink: true,
                    }}
                />

                <CardContent  >
                    <Button size="small" onClick={()=>props.confirm(answer)}>Confirm</Button>
                </CardContent>
            </Card>
        </div>
    );
}