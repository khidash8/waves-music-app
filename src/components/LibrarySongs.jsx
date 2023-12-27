import PropTypes from "prop-types";
// import { playAudio } from "../utils";

const LibrarySongs = ({
  song,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const handleClick = async () => {
    const id = song.id;

    // ? set active song
    const selectedSong = songs.filter((state) => state.id === id);

    await setCurrentSong(selectedSong[0]);

    // playAudio(isPlaying, audioRef);
    if (isPlaying) audioRef.current.play();

    // ? add active state
    const newSongs = songs.map((song) => {
      if (song.id === id) {
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

  return (
    <div
      className={`librarySong ${song.active ? "active" : ""}`}
      onClick={handleClick}
    >
      <img src={song.cover} alt={song.name} />
      <div className="librarySong__description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

// ! Prop Validation
LibrarySongs.propTypes = {
  song: PropTypes.object,
  songs: PropTypes.array,
  setCurrentSong: PropTypes.func,
  audioRef: PropTypes.object,
  isPlaying: PropTypes.bool,
  setSongs: PropTypes.func,
};

export default LibrarySongs;
