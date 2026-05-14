class InventoryHelper {
  constructor({ onDrop, onUse } = {}) {
    this.onDrop = onDrop;
    this.onUse = onUse;
  }

  renderItemDescription(item) {
    if (!item.description) {return null;}
    return <p className="mb-0 small text-muted">{item.description}</p>;
  }

  renderUseButton(item) {
    if (!item.isUsable || !this.onUse) {return null;}
    return (
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => this.onUse(item.id)}
      >
        Use
      </button>
    );
  }

  renderDropButton(item) {
    if (!this.onDrop) {return null;}
    return (
      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={() => this.onDrop(item.id)}
      >
        Drop
      </button>
    );
  }
}

export { InventoryHelper };
