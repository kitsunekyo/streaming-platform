import React from "react";
import Hls from "hls.js";

import "./App.css";

const streamUrl = "http://localhost:8000/live/obs/index.m3u8";

function App() {
  const videoEl = React.useRef<HTMLVideoElement>(null);
  const [volume, setVolume] = React.useState(0);

  React.useEffect(() => {
    if (!videoEl.current) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(videoEl.current);
    } else if (videoEl.current.canPlayType("application/vnd.apple.mpegurl")) {
      console.error("use native");
      videoEl.current.src = streamUrl;
    }
  }, []);

  React.useEffect(() => {
    if (!videoEl.current) return;
    videoEl.current.volume = volume;
  }, [volume]);

  return (
    <div className="App">
      <div className="bg-gray-800">
        <div>
          <video ref={videoEl} style={{ height: 480 }} muted autoPlay={true} />
        </div>
        <div className="flex gap-2 p-2">
          {volume === 0 ? (
            <button
              onClick={() => {
                if (!videoEl.current) return;
                videoEl.current.muted = false;
                setVolume(1);
              }}
            >
              🔈
            </button>
          ) : (
            <button
              onClick={() => {
                if (!videoEl.current) return;
                videoEl.current.muted = true;
                setVolume(0);
              }}
            >
              🔊
            </button>
          )}
          <button
            onClick={() => {
              if (!videoEl.current) return;
              videoEl.current.requestFullscreen();
            }}
          >
            fullscreen
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
