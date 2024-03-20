import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import WaveSurfer from "wavesurfer.js";
import Spectrogram from "wavesurfer.js/dist/plugins/spectrogram.esm";
import audio from "./audio/original_3337-4698_2023-08-31T18-28-00Z.wav";

function App() {
    const waveformRef = useRef(null);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
    const [zoomLevel, setZoomLevel] = useState(0);
    const wsRef = useRef(null);

    useEffect(() => {
        if (!waveformRef.current) return;

        const colormap = require('colormap');
        const colors = colormap({
            colormap: 'hot',
            nshades: 256,
            format: 'float',
            alpha: 1,
        });


        const ws = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: 'rgb(255, 255, 255)',
            progressColor: 'rgb(255, 255, 255)',
            mediaControls: true,
            url: audio,
            sampleRate: 250000,
            height: 0,
            plugins: [
                Spectrogram.create({
                    labels: true,
                    labelsColor: "white",
                    labelsHzColor: "white",
                    height: 256,
                    colorMap: colors,
                    splitChannels: true,
                    frequencyMin: 0,
                    frequencyMax: 125000,
                    fftSamples: 1024,
                })
            ],
        });

        wsRef.current = ws;

        ws.once('interaction', () => {
            ws.play();
        });

        return () => {
            ws.destroy();
        };
    }, []);
    const handleSpeedChange = (event) => {
        const newSpeed = parseFloat(event.target.value);
        setPlaybackSpeed(newSpeed);
        if (wsRef.current) {
            wsRef.current.setPlaybackRate(newSpeed, false);
        }
    };

    const handleZoomIn = () => {
        const newZoomLevel = zoomLevel + 50;
        setZoomLevel(newZoomLevel);
        if (wsRef.current) {
            wsRef.current.zoom(newZoomLevel);
        }
    };

    const handleZoomOut = () => {
        const newZoomLevel = zoomLevel - 50;
        setZoomLevel(newZoomLevel < 0 ? 0 : newZoomLevel);
        if (wsRef.current) {
            wsRef.current.zoom(newZoomLevel);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <h1>Spectrogram PoC</h1>
                </div>
                <div id="waveform" ref={waveformRef} style={{width: '100%', height: '400px'}}></div>
                    <div style={{ display: 'flex' }}>
                    <div>
                        <div>
                            <div>
                                <span>Playback Speed</span>
                            </div>
                            <span>{playbackSpeed}x</span>
                        </div>
                        <input
                            type="range"
                            min="0.1"
                            max="1.0"
                            step="0.1"
                            value={playbackSpeed}
                            onChange={handleSpeedChange}
                            onInput={handleSpeedChange}
                        />
                    </div>

                    <div style={{ marginLeft: '200px' }}>
                    <div>
                        <span>Zoom</span>
                    </div>
                    <span>{zoomLevel + 100}%</span>
                    <div>
                        <button onClick={handleZoomOut} style={{marginRight: '5px'}}>-</button>
                        <button onClick={handleZoomIn}>+</button>
                    </div>
                    </div>
                    </div>
            </header>
        </div>
    );
}

export default App;



