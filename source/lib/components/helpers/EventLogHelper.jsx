class EventLogHelper {
  getVisible(entries, maxEntries) {
    return entries.slice(-maxEntries).reverse();
  }

  renderEmpty() {
    return (
      <li className="list-group-item text-muted fst-italic">No events yet.</li>
    );
  }
}

export { EventLogHelper };
