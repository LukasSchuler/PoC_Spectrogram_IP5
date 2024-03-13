import './App.css';

import SpectrogramPlayer from "react-audio-spectrogram-player";
import sxx from "./res/19-198-0001.json";
import src from "./res/3337.wav";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <SpectrogramPlayer
            src={src}
            sxx={sxx}
            specHeight={200}
            navHeight={50}
            navigator
            settings
            colormap="viridis"
            transparent
            dark
        />
      </header>
    </div>
  );
}

export default App;
