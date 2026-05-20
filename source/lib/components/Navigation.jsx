/**
 * @file Navigation – renders directional movement controls for the
 * current location's exits.
 */

import PropTypes from 'prop-types';
import { NavigationHelper } from './helpers/NavigationHelper.jsx';

const helper = new NavigationHelper();

function Navigation({ paths, onNavigate }) {
  const exits = helper.getExits(paths);

  if (exits.length === 0) {
    return helper.renderEmpty();
  }

  return (
    <div className="edwin-navigation">
      <h6 className="mb-2">🧭 Go…</h6>
      <div className="d-flex flex-wrap gap-2">
        {exits.map((direction) => (
          <button
            key={direction}
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onNavigate(direction)}
          >
            {helper.getLabel(direction, paths[direction])}
          </button>
        ))}
      </div>
    </div>
  );
}

Navigation.propTypes = {
  paths: PropTypes.objectOf(
    PropTypes.shape({
      target: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default Navigation;
