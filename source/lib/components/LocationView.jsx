/**
 * @file LocationView – renders current location details including
 * description, present items, and resident NPCs.
 */

import PropTypes from 'prop-types';
import { LocationViewHelper } from './helpers/LocationViewHelper.jsx';

function LocationView({ location, onPickUp, onTalkTo }) {
  if (!location) {
    return <p className="text-muted fst-italic">You are in the void.</p>;
  }

  const helper = new LocationViewHelper({ onPickUp, onTalkTo });

  return (
    <div className="edwin-location-view">
      <h2 className="location__name">{location.name}</h2>
      <p className="location__description">{location.description}</p>
      {helper.renderItems(location)}
      {helper.renderNPCs(location)}
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
