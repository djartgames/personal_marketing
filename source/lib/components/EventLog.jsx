/**
 * @file EventLog – displays a chronological list of game events.
 */

import PropTypes from 'prop-types';
import { EventLogHelper } from './helpers/EventLogHelper.jsx';

const helper = new EventLogHelper();

function EventLog({ entries, maxEntries = 50 }) {
  const visible = helper.getVisible(entries, maxEntries);

  return (
    <div className="edwin-event-log card">
      <div className="card-header">
        <h6 className="mb-0">📜 Event Log</h6>
      </div>
      <ul className="list-group list-group-flush event-log__list">
        {visible.length === 0 && helper.renderEmpty()}
        {visible.map((entry, idx) => (
          <li key={`${entry.timestamp}-${idx}`} className="list-group-item event-log__entry">
            {entry.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

EventLog.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
    })
  ).isRequired,
  maxEntries: PropTypes.number,
};

export default EventLog;
