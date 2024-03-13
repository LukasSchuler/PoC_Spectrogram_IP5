import React, { useEffect, useRef } from 'react';
import './App.css';
import WaveSurfer from "wavesurfer.js";
import Spectrogram from "wavesurfer.js/dist/plugins/spectrogram.esm";
import audio from "./audio/3337-4698_2023-08-31T18-28-00Z.wav"


function App() {
    const waveformRef = useRef(null); // Create a ref for the waveform container



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
            height:100,

        });

        // Initialize the Spectrogram plugin
        ws.registerPlugin(
            Spectrogram.create({
                labels: true,
                labelsColor: "black",
                labelsHzColor: "black",
                height: 1000,
                splitChannels: true,
                frequencyMin: 10000,
                frequencyMax: 130000,
                fftSamples: 16384,

            })
        );

        // Play on click
        ws.once('interaction', () => {
            ws.play();
            ws.setPlaybackRate(0.1, false)

        });

        // Clean up on unmount
        return () => {
            ws.destroy();
        };
    }, [waveformRef]); // Include waveformRef in the dependency array

    return (
        <div className="App">
            <header className="App-header">
                <div id="waveform" ref={waveformRef} style={{ width: '100%', height: '500px' }}></div> {/* Assign the ref to the waveform container */}
            </header>
        </div>
    );
}

export default App;
