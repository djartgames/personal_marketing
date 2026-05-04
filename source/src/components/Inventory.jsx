/**
 * @fileoverview Inventory – renders the player's item list.
 */

import PropTypes from 'prop-types';

/**
 * Renders the player's inventory.
 *
 * @param {object} props
 * @param {Array<import('../types/index.js').ItemData>} props.items - Inventory items.
 * @param {Function} [props.onDrop] - Called with itemId when player drops an item.
 * @param {Function} [props.onUse] - Called with itemId when player uses an item.
 */
function Inventory({ items, onDrop, onUse }) {
  return (
    <div className="edwin-inventory card">
      <div className="card-header">
        <h6 className="mb-0">🎒 Inventory</h6>
      </div>
      {items.length === 0 ? (
        <div className="card-body text-muted fst-italic">Your pack is empty.</div>
      ) : (
        <ul className="list-group list-group-flush">
          {items.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-start">
              <div>
                <strong>{item.name}</strong>
                {item.description && (
                  <p className="mb-0 small text-muted">{item.description}</p>
                )}
              </div>
              <div className="btn-group btn-group-sm ms-2">
                {item.isUsable && onUse && (
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => onUse(item.id)}
                  >
                    Use
                  </button>
                )}
                {onDrop && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onDrop(item.id)}
                  >
                    Drop
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Inventory.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      isUsable: PropTypes.bool,
    })
  ).isRequired,
  onDrop: PropTypes.func,
  onUse: PropTypes.func,
};

export default Inventory;
