import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Nav = ({ libaryStatus, setLibaryStatus }) => {
  return (
    <nav className="nav">
      <h1>Waves</h1>
      <button onClick={() => setLibaryStatus(!libaryStatus)}>
        Library
        <FontAwesomeIcon className="navButton__icon" icon={faMusic} />
      </button>
    </nav>
  );
};

// ! Prop Validation
Nav.propTypes = {
  libaryStatus: PropTypes.bool,
  setLibaryStatus: PropTypes.func,
};

export default Nav;
