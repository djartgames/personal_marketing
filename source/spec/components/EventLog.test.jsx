import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EventLog from '../../lib/components/EventLog.jsx';

describe('EventLog', () => {
  it('shows empty state when no entries', () => {
    render(<EventLog entries={[]} />);
    expect(screen.getByText('No events yet.')).toBeInTheDocument();
  });

  it('renders log entries', () => {
    const entries = [
      { text: 'You entered the tavern.', timestamp: 1000 },
      { text: 'You picked up a coin.', timestamp: 2000 },
    ];
    render(<EventLog entries={entries} />);
    expect(screen.getByText('You entered the tavern.')).toBeInTheDocument();
    expect(screen.getByText('You picked up a coin.')).toBeInTheDocument();
  });

  it('displays entries newest first', () => {
    const entries = [
      { text: 'First event', timestamp: 1000 },
      { text: 'Second event', timestamp: 2000 },
    ];
    render(<EventLog entries={entries} />);
    const items = screen.getAllByRole('listitem');
    expect(items[0].textContent).toBe('Second event');
    expect(items[1].textContent).toBe('First event');
  });

  it('respects maxEntries limit', () => {
    const entries = Array.from({ length: 10 }, (_, i) => ({
      text: `Event ${i}`,
      timestamp: i,
    }));
    render(<EventLog entries={entries} maxEntries={3} />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
    expect(items[0].textContent).toBe('Event 9');
  });
});
