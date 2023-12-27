import PropTypes from "prop-types";

const Songs = ({ currentSong }) => {
  return (
    <div className="songsContainer">
      <img src={currentSong.cover} alt={currentSong.name} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

Songs.propTypes = {
  currentSong: PropTypes.object.isRequired,
};

export default Songs;
