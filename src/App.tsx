import {useEffect, useRef, useState} from 'react'
import './App.css'

import {StartPage} from "./components/StartPage.tsx";
import {Play} from "./components/Play.tsx";
import {Summary} from "./components/Summary.tsx";

export type TPlayer =
    { name: string, club: string, jerseyNumber: number, image: string }


const players: TPlayer[] = [
    {name: 'Kevin De Bruyne', club: 'Manchester City', jerseyNumber: 17, image: 'debruyne.jpg'},
    {name: 'Mohamed Salah', club: 'Liverpool', jerseyNumber: 11, image: 'salah.jpg'},
    {name: 'Harry Kane', club: 'Bayern Munich', jerseyNumber: 10, image: 'kane.jpg'},
    {name: 'Kylian Mbappe', club: 'Paris Saint-Germain', jerseyNumber: 7, image: 'mbape.jpg'},
    {name: 'Erling Haaland', club: 'Manchester City', jerseyNumber: 9, image: 'haaland.jpg'},

]

function App() {
    const [isStarted, setIsStarted] = useState(false);

    const [isFinished, setIsFinished] = useState(false);

    const [currentRound, setCurrentRound] = useState(0);

    const [score, setScore] = useState(0);

    const [time, setTime] = useState(30);

    const timerUUIDRef = useRef(0);

    const timeRef = useRef(time);

    function confirm(answer: number) {
        if (players[currentRound].jerseyNumber === answer) {
            setScore(score + 1)
        }

        if (currentRound === players.length - 1) {
            setIsStarted(true)

            setIsFinished(true);

            clearInterval(timerUUIDRef.current);
            return
        }

        setCurrentRound(currentRound + 1)
    }


    useEffect(() => {
        console.log('useEffect', isStarted, isFinished);
        
    }, [isStarted, isFinished])


    function startGame() {
        setIsStarted(true);

        timerUUIDRef.current = window.setInterval(() => {
            timeRef.current = timeRef.current - 1;

            if (timeRef.current === 0) {
                clearInterval(timerUUIDRef.current)
                setIsFinished(true)
            }

            setTime(timeRef.current)

            console.log('time', timeRef.current);
        }, 1000);

    }

    return (
        <>
            {isFinished ? <Summary score={score}/> :
                isStarted ? <Play player={players[currentRound]} score={score} confirm={confirm} time={time}/> :
                <StartPage startGame={startGame}/>}
        </>
    )
}

export default App
