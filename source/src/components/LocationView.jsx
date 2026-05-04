/**
 * @fileoverview LocationView – renders current location details including
 * description, present items, and resident NPCs.
 */

import PropTypes from 'prop-types';

/**
 * Displays information about the player's current location.
 *
 * @param {object} props
 * @param {object} props.location - Serialized Location object.
 * @param {Function} [props.onPickUp] - Called with item when player picks up.
 * @param {Function} [props.onTalkTo] - Called with npc when player initiates dialogue.
 */
function LocationView({ location, onPickUp, onTalkTo }) {
  if (!location) {
    return <p className="text-muted fst-italic">You are in the void.</p>;
  }

  return (
    <div className="edwin-location-view">
      <h2 className="location__name">{location.name}</h2>
      <p className="location__description">{location.description}</p>

      {location.items && location.items.length > 0 && (
        <div className="location__items mt-3">
          <h6>Items here:</h6>
          <ul className="list-group">
            {location.items.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  <strong>{item.name}</strong>
                  {item.description && (
                    <span className="ms-2 text-muted small">{item.description}</span>
                  )}
                </span>
                {item.isPickable && onPickUp && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success"
                    onClick={() => onPickUp(item)}
                  >
                    Pick up
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {location.npcs && location.npcs.length > 0 && (
        <div className="location__npcs mt-3">
          <h6>People here:</h6>
          <ul className="list-group">
            {location.npcs.map((npc) => (
              <li
                key={npc.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  <strong>{npc.name}</strong>
                  {npc.description && (
                    <span className="ms-2 text-muted small">{npc.description}</span>
                  )}
                </span>
                {onTalkTo && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onTalkTo(npc)}
                  >
                    Talk
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

LocationView.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    items: PropTypes.array,
    npcs: PropTypes.array,
  }),
  onPickUp: PropTypes.func,
  onTalkTo: PropTypes.func,
};

export default LocationView;
