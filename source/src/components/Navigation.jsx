/**
 * @fileoverview Navigation – renders directional movement controls for the
 * current location's exits.
 */

import PropTypes from 'prop-types';

const DIRECTION_LABELS = {
  north: '↑ North',
  south: '↓ South',
  east: '→ East',
  west: '← West',
  up: '▲ Up',
  down: '▼ Down',
  in: '⤵ In',
  out: '⤴ Out',
};

/**
 * Renders navigation buttons for available exits.
 *
 * @param {object} props
 * @param {object} props.paths - Map of direction → locationId.
 * @param {Function} props.onNavigate - Called with a direction string.
 */
function Navigation({ paths, onNavigate }) {
  const exits = Object.keys(paths);

  if (exits.length === 0) {
    return (
      <div className="edwin-navigation">
        <p className="text-muted fst-italic">There are no obvious exits.</p>
      </div>
    );
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
            {DIRECTION_LABELS[direction] ?? direction}
          </button>
        ))}
      </div>
    </div>
  );
}

Navigation.propTypes = {
  paths: PropTypes.objectOf(PropTypes.string).isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default Navigation;
