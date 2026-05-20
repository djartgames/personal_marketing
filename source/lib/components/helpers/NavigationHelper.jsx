class NavigationHelper {
  getExits(paths) {
    return Object.keys(paths);
  }

  getLabel(direction, path) {
    return path?.label ?? direction;
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
