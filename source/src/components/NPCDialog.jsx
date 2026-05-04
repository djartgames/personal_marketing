/**
 * @fileoverview NPCDialog – a modal dialogue interface for NPC conversations.
 */

import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Dialogue UI for interacting with an NPC.
 *
 * @param {object} props
 * @param {object} props.npc - The NPC being spoken to (serialized).
 * @param {object | null} props.currentStep - Current dialogue step.
 * @param {Function} props.onChoose - Called with optionIndex when player picks.
 * @param {Function} props.onClose - Called when dialogue ends or is dismissed.
 */
function NPCDialog({ npc, currentStep, onChoose, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleChoose = useCallback(
    (idx) => {
      onChoose(idx);
    },
    [onChoose]
  );

  const handleClose = useCallback(() => {
    setIsClosing(true);
    onClose();
  }, [onClose]);

  if (!npc || isClosing) { return null; }

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
            {npc.description && (
              <p className="text-muted fst-italic small mb-3">{npc.description}</p>
            )}

            {currentStep ? (
              <>
                <p className="npc-dialog__text">{currentStep.text}</p>
                {currentStep.options && currentStep.options.length > 0 && (
                  <div className="npc-dialog__options d-flex flex-column gap-2 mt-3">
                    {currentStep.options.map((option, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="btn btn-outline-primary text-start"
                        onClick={() => handleChoose(idx)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted fst-italic">The conversation has ended.</p>
            )}
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
