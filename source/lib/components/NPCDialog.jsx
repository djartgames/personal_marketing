/**
 * @file NPCDialog – a modal dialogue interface for NPC conversations.
 */

import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { NPCDialogHelper } from './helpers/NPCDialogHelper.jsx';

function NPCDialog({ npc, currentStep, onChoose, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleChoose = useCallback((idx) => { onChoose(idx); }, [onChoose]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    onClose();
  }, [onClose]);

  if (!npc || isClosing) {return null;}

  const helper = new NPCDialogHelper(handleChoose);

  return (
    <div className="edwin-npc-dialog modal d-block" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{npc.name}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            />
          </div>

          <div className="modal-body">
            {helper.renderDescription(npc)}
            {helper.renderCurrentStep(currentStep)}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Leave
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={handleClose} />
    </div>
  );
}

NPCDialog.propTypes = {
  npc: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  currentStep: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
      })
    ),
  }),
  onChoose: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NPCDialog;
