/**
 * @file Inventory – renders the player's item list.
 */

import PropTypes from 'prop-types';
import { InventoryHelper } from './helpers/InventoryHelper.jsx';

function Inventory({ items, onDrop, onUse }) {
  const helper = new InventoryHelper({ onDrop, onUse });

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
                {helper.renderItemDescription(item)}
              </div>
              <div className="btn-group btn-group-sm ms-2">
                {helper.renderUseButton(item)}
                {helper.renderDropButton(item)}
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
