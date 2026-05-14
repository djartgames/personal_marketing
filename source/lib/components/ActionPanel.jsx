/**
 * @file ActionPanel – renders the list of available player actions.
 */

import PropTypes from 'prop-types';
import { ActionPanelHelper } from './helpers/ActionPanelHelper.jsx';

const helper = new ActionPanelHelper();

function ActionPanel({ actions, onAction }) {
  if (actions.length === 0) {
    return helper.renderEmpty();
  }

  return (
    <div className="edwin-action-panel">
      <h6 className="mb-2">⚡ Actions</h6>
      <div className="d-flex flex-column gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            className="btn btn-primary text-start"
            onClick={() => onAction(action.id)}
            title={action.description ?? ''}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

ActionPanel.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  onAction: PropTypes.func.isRequired,
};

export default ActionPanel;
