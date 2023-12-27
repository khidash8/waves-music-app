import PropTypes from "prop-types";
import LibrarySongs from "./LibrarySongs";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libaryStatus,
}) => {
  return (
    <div className={`library ${libaryStatus ? "libray__active" : ""}`}>
      <h2>Library</h2>
      <div className="library__songs">
        {songs.map((song) => (
          <LibrarySongs
            key={song.id}
            song={song}
            setCurrentSong={setCurrentSong}
            songs={songs}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

// ! Prop Validation
Library.propTypes = {
  songs: PropTypes.array,
  setCurrentSong: PropTypes.func,
  audioRef: PropTypes.object,
  isPlaying: PropTypes.bool,
  setSongs: PropTypes.func,
  libaryStatus: PropTypes.bool,
};

export default Library;
