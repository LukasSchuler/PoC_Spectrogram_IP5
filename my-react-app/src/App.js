import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import WaveSurfer from "wavesurfer.js";
import Spectrogram from "wavesurfer.js/dist/plugins/spectrogram.esm";
import audio from "./audio/3337-4698_2023-08-31T18-28-00Z.wav";


function App() {
    const waveformRef = useRef(null); // Create a ref for the waveform container
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0); // State for playback speed
    const wsRef = useRef(null); // Create a ref for WaveSurfer instance

    useEffect(() => {
        if (!waveformRef.current) return; // Check if the ref is available

        // Create an instance of WaveSurfer
        const ws = WaveSurfer.create({
            container: waveformRef.current, // Pass the ref to the container property
            waveColor: 'rgb(255, 255, 255)',
            progressColor: 'rgb(255, 255, 255)',
            mediaControls: true,
            url: audio,
            sampleRate: 250000,
            height:20,

        });

        const colormap = require('colormap');
        const colors = colormap({
            colormap: 'hot',
            nshades: 256,
            format: 'float',
            alpha:1,
        });

        // Initialize the Spectrogram plugin
        ws.registerPlugin(
            Spectrogram.create({
                labels: true,
                labelsColor: "white",
                labelsHzColor: "white",
                height: 256,
                colorMap: colors,
                splitChannels: true,
                frequencyMin: 10000,
                frequencyMax: 126000,
                fftSamples: 16384,
            })
        );

        wsRef.current = ws; // Save WaveSurfer instance to ref

        // Play on interaction
        ws.once('interaction', () => {
            ws.play();

        });

        // Clean up on unmount
        return () => {
            ws.destroy();
        };
    }, []); // Include only empty dependency array since we only want to run this once

    // Handler for changing playback speed
    const handleSpeedChange = (event) => {
        const newSpeed = parseFloat(event.target.value);
        setPlaybackSpeed(newSpeed);
        if (wsRef.current) {
            wsRef.current.setPlaybackRate(newSpeed, false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    value={playbackSpeed}
                    onChange={handleSpeedChange}
                    onInput={handleSpeedChange} // Handle continuous input changes
                />
                <div id="waveform" ref={waveformRef} style={{ width: '100%', height: '500px' }}></div> {/* Assign the ref to the waveform container */}
            </header>
        </div>
    );
}

export default App;


