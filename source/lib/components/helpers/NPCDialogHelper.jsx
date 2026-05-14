class NPCDialogHelper {
  constructor(handleChoose) {
    this.handleChoose = handleChoose;
  }

  renderDescription(npc) {
    if (!npc.description) {return null;}
    return <p className="text-muted fst-italic small mb-3">{npc.description}</p>;
  }

  renderOptions(currentStep) {
    if (!currentStep.options || !currentStep.options.length) {return null;}
    return (
      <div className="npc-dialog__options d-flex flex-column gap-2 mt-3">
        {currentStep.options.map((option, idx) => (
          <button
            key={idx}
            type="button"
            className="btn btn-outline-primary text-start"
            onClick={() => this.handleChoose(idx)}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  renderCurrentStep(currentStep) {
    if (!currentStep) {
      return <p className="text-muted fst-italic">The conversation has ended.</p>;
    }
    return (
      <>
        <p className="npc-dialog__text">{currentStep.text}</p>
        {this.renderOptions(currentStep)}
      </>
    );
  }
}

export { NPCDialogHelper };
