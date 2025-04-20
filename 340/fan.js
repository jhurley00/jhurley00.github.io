import { createElement, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const width = 200;
const height = 200;
const radius = 80;

const MainGUI = () => {
    const [direction, setDirection] = useState(1);
    const [startingAngle, setStartingAngle] = useState(0);
    const [running, setRunning] = useState(false);
    const [bladeColor, setBladeColor] = useState('red');
    const [speed, setSpeed] = useState(100);

    const displayFan = (canvas) => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = bladeColor;

        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, radius, (startingAngle + i * 75) * Math.PI / 180, (startingAngle + i * 75 + 30) * Math.PI / 180);
            ctx.lineTo(width / 2, height / 2);
            ctx.fill();
        }
    };

    const randomColor = () => {
        const colors = ['orange', 'purple', 'green', 'cyan', 'lightcoral'];
        setBladeColor(colors[Math.floor(Math.random() * colors.length)]);
    };

    const runningFan = (canvas) => {
        if (running) {
            setStartingAngle(prev => prev + 30 * direction);
            displayFan(canvas);
        }
        setTimeout(() => runningFan(canvas), speed);
    };

    useEffect(() => {
        const canvas = document.getElementById('fanCanvas');
        runningFan(canvas);
    }, [running, direction, speed]);

    return (
        <div>
            <canvas id="fanCanvas" width={width} height={height} style={{ backgroundColor: 'white' }}></canvas>
            <button onClick={() => setRunning(true)}>Start</button>
            <button onClick={() => setRunning(false)}>Stop</button>
            <button onClick={() => setDirection(1)}>Clockwise</button>
            <button onClick={() => setDirection(-1)}>Counterclockwise</button>
            <button onClick={() => setSpeed(prev => Math.min(prev + 20, 500))}>Slower</button>
            <button onClick={() => setSpeed(prev => Math.max(prev - 20, 10))}>Faster</button>
            <button onClick={randomColor}>RandomColor</button>
        </div>
    );
};

ReactDOM.render(<MainGUI />, document.getElementById('root'));