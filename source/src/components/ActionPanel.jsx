/**
 * @fileoverview ActionPanel – renders the list of available player actions.
 */

import PropTypes from 'prop-types';

/**
 * Displays available actions as clickable buttons.
 *
 * @param {object} props
 * @param {Array<{id: string, label: string, description?: string}>} props.actions
 * @param {Function} props.onAction - Called with action id.
 */
function ActionPanel({ actions, onAction }) {
  if (actions.length === 0) {
    return (
      <div className="edwin-action-panel">
        <p className="text-muted fst-italic">Nothing to do here.</p>
      </div>
    );
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
