import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Player = ({
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  audioRef,
  currentSong,
  songs,
  setCurrentsong,
  setSongs,
}) => {
  // todo: Events
  // ? play /pause based on play button press
  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // ? skip song based on forward/backward button press
  const skipHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  // ? set current time based on slider
  const handleInputValueChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  // ? skip song based on forward/backward button press
  const handleSkip = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    // * skip Forward
    if (direction === "skipForward") {
      await setCurrentsong(songs[(currentIndex + 1) % songs.length]);
      skipHandler(songs[(currentIndex + 1) % songs.length]);
    }

    // * skip Backward
    if (direction === "skipBackward") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentsong(songs[songs.length - 1]);
        skipHandler(songs[songs.length - 1]);

        // * play
        isPlaying && audioRef.current.play();

        return;
      }

      await setCurrentsong(songs[(currentIndex - 1) % songs.length]);
      skipHandler(songs[(currentIndex - 1) % songs.length]);
    }

    // * play
    isPlaying && audioRef.current.play();
  };

  // todo: Functions
  // ? Format time in minutes and seconds
  const calculateTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  // todo: styles
  const fillPercentage = {
    transform: `translateX(${songInfo.fillPercentage}%)`,
  };

  const linearGradient = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
  };

  // ! Render
  return (
    <div className="player">
      {/*  */}

      {/* Player Time */}
      <div className="player__time__controller">
        <p>{calculateTime(songInfo.currentTime)}</p>

        <div className="player__track">
          <input
            value={songInfo.currentTime}
            type="range"
            min="0"
            max={songInfo.duration || 0}
            onChange={handleInputValueChange}
            style={linearGradient}
          />
          <div style={fillPercentage} className="player__track__fill"></div>
        </div>

        <p>{songInfo.duration ? calculateTime(songInfo.duration) : "0:00"}</p>
      </div>

      {/* Player Play */}
      <div className="player__play__controller">
        <FontAwesomeIcon
          icon={faAngleLeft}
          size="2x"
          onClick={() => handleSkip("skipBackward")}
        />
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          onClick={handlePlay}
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          size="2x"
          onClick={() => handleSkip("skipForward")}
        />
      </div>
    </div>
  );
};

// ! PROPTYPES / Validation
Player.propTypes = {
  currentSong: PropTypes.object,
  isPlaying: PropTypes.bool,
  setIsPlaying: PropTypes.func,
  songInfo: PropTypes.object,
  setSongInfo: PropTypes.func,
  audioRef: PropTypes.object,
  songs: PropTypes.array,
  setCurrentsong: PropTypes.func,
  setSongs: PropTypes.func,
};

export default Player;
