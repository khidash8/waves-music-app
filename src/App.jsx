import "./styles/App.scss";
import Songs from "./components/Songs";
import Player from "./components/Player";
import data from "./data";
import { useRef, useState } from "react";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentsong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libaryStatus, setLibaryStatus] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  // ? audio
  const audioRef = useRef(null);

  // ? set current time and duration from audio
  const handleTimeUpdate = (e) => {
    // * calculate time
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    // * calculate percentage
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const fill = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({ ...songInfo, currentTime, duration, fillPercentage: fill });
  };

  // ? handle end of song
  const handleEndSong = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    setCurrentsong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) {
      setAutoPlay(true);

      setTimeout(() => {
        setAutoPlay(false);
      }, 3000);
    }

    // isPlaying && (await audioRef.current.play());
  };

  return (
    <div className={`App ${libaryStatus ? "libray__move" : ""}`}>
      {/* Nav */}
      <Nav libaryStatus={libaryStatus} setLibaryStatus={setLibaryStatus} />

      {/* Songs */}
      <Songs currentSong={currentSong} />

      {/* Player */}
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        songs={songs}
        setCurrentsong={setCurrentsong}
        setSongs={setSongs}
      />

      {/* Library */}
      <Library
        songs={songs}
        setCurrentSong={setCurrentsong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libaryStatus={libaryStatus}
      />

      {/* Actual Audio */}
      <audio
        autoPlay={autoPlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={handleEndSong}
      />
    </div>
  );
}

export default App;
