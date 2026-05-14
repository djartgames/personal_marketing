class LocationViewHelper {
  constructor({ onPickUp, onTalkTo } = {}) {
    this.onPickUp = onPickUp;
    this.onTalkTo = onTalkTo;
  }

  renderItemDescription(item) {
    if (!item.description) {return null;}
    return <span className="ms-2 text-muted small">{item.description}</span>;
  }

  renderPickUpButton(item) {
    if (!item.isPickable || !this.onPickUp) {return null;}
    return (
      <button
        type="button"
        className="btn btn-sm btn-outline-success"
        onClick={() => this.onPickUp(item)}
      >
        Pick up
      </button>
    );
  }

  renderNPCDescription(npc) {
    if (!npc.description) {return null;}
    return <span className="ms-2 text-muted small">{npc.description}</span>;
  }

  renderTalkButton(npc) {
    if (!this.onTalkTo) {return null;}
    return (
      <button
        type="button"
        className="btn btn-sm btn-outline-primary"
        onClick={() => this.onTalkTo(npc)}
      >
        Talk
      </button>
    );
  }

  renderItems(location) {
    if (!location.items || !location.items.length) {return null;}
    return (
      <div className="location__items mt-3">
        <h6>Items here:</h6>
        <ul className="list-group">
          {location.items.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{item.name}</strong>
                {this.renderItemDescription(item)}
              </span>
              {this.renderPickUpButton(item)}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderNPCs(location) {
    if (!location.npcs || !location.npcs.length) {return null;}
    return (
      <div className="location__npcs mt-3">
        <h6>People here:</h6>
        <ul className="list-group">
          {location.npcs.map((npc) => (
            <li
              key={npc.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{npc.name}</strong>
                {this.renderNPCDescription(npc)}
              </span>
              {this.renderTalkButton(npc)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export { LocationViewHelper };
