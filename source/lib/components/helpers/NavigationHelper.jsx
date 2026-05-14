const DIRECTION_LABELS = {
  north: '↑ North',
  south: '↓ South',
  east: '→ East',
  west: '← West',
  up: '▲ Up',
  down: '▼ Down',
  in: '⤵ In',
  out: '⤴ Out',
};

class NavigationHelper {
  getExits(paths) {
    return Object.keys(paths);
  }

  getLabel(direction) {
    return DIRECTION_LABELS[direction] ?? direction;
  }

  renderEmpty() {
    return (
      <div className="edwin-navigation">
        <p className="text-muted fst-italic">There are no obvious exits.</p>
      </div>
    );
  }
}

export { NavigationHelper };
