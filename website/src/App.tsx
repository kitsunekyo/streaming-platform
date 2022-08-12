import React from "react";
import Hls from "hls.js";

import "./App.css";

const streamUrl = "http://localhost:8000/live/obs/index.m3u8";

function App() {
  const videoEl = React.useRef<HTMLVideoElement>(null);

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

  return (
    <div className="App">
      <video
        ref={videoEl}
        style={{ height: 480 }}
        controls
        muted
        autoPlay={true}
      />
    </div>
  );
}

export default App;
