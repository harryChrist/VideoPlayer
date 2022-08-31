import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import './App.css';
import Controls from "./components/Controls";
import screenful from "screenfull";

const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

function App() {
  const playerRef = useRef(null);
  const controlsRef = useRef(null);
  const playerContainerRef = useRef(null);
  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
  const [count, setCount] = useState(0);

  const [videoState, setvideoState] = useState({
    pip: false,
    playing: false,
    controls: false,
    light: false,
    muted: true,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  });

  const {
    playing,
    controls,
    light,
    muted,
    loop,
    playbackRate,
    pip,
    played,
    seeking,
    volume,
  } = videoState;

  const handlePlayPause = () => {
    setvideoState({ ...videoState, playing: !videoState.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState) => {
    if (count > 3) {
      controlsRef.current.style.visibility = "hidden";
      setCount(0);
    }
    if (controlsRef.current.style.visibility == "visible") {
      setCount(count + 1);
    }
    if (!videoState.seeking) {
      setvideoState({ ...videoState, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    console.log({ newValue });
    setvideoState({ ...videoState, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = (e) => {
    setvideoState({ ...videoState, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    console.log({ value: e.target });
    setvideoState({ ...videoState, seeking: false });
    // console.log(sliderRef.current.value)
    playerRef.current.seekTo(newValue / 100, "fraction");
  };

  const handleDuration = (duration) => {
    setvideoState({ ...videoState, duration });
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setvideoState({ ...videoState, seeking: false, volume: parseFloat(newValue / 100) });
  };
  const handleVolumeChange = (e, newValue) => {
    // console.log(newValue);
    setvideoState({
      ...videoState,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const toggleFullScreen = () => {
    screenful.toggle(playerContainerRef.current);
  };

  const handleMouseMove = () => {
    console.log("mousemove");
    controlsRef.current.style.visibility = "visible";
    setCount(0);
  };

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = "hidden";
    setCount(0);
  };

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat == "normal" ? "remaining" : "normal"
    );
  };

  const handlePlaybackRate = (rate) => {
    setvideoState({ ...videoState, playbackRate: rate });
  };

  const hanldeMute = () => {
    setvideoState({ ...videoState, muted: !videoState.muted });
  };

  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : "00:00";

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
  const elapsedTime =
    timeDisplayFormat == "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);

  return (
    <>
      <div>
        <div>
          <title>React Video Player</title>
        </div>
      </div>

      <div className='pContainer'>
        <div ref={playerContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
          className='playerWrapper'>

          <ReactPlayer
            ref={playerRef}
            width="100%"
            height="100%"
            pip={pip}
            playing={playing}
            light={light}
            controls={controls}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onProgess={handleProgress}
            url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>

          <Controls
            ref={controlsRef}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            onDuration={handleDuration}
            onRewind={handleRewind}
            onPlayPause={handlePlayPause}
            onFastForward={handleFastForward}
            playing={playing}
            played={played}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
            onMute={hanldeMute}
            muted={muted}
            onVolumeChange={handleVolumeChange}
            onVolumeSeekDown={handleVolumeSeekDown}
            onChangeDispayFormat={handleDisplayFormat}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRate}
            onToggleFullScreen={toggleFullScreen}
            volume={volume} />
        </div>
      </div>
    </>
  );
}

export default App;
