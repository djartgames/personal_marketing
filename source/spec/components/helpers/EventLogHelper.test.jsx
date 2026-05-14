import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EventLogHelper } from '../../../lib/components/helpers/EventLogHelper.jsx';

describe('EventLogHelper', () => {
  describe('getVisible', () => {
    it('returns the last N entries in reverse order', () => {
      const helper = new EventLogHelper();
      const entries = [
        { text: 'a', timestamp: 1 },
        { text: 'b', timestamp: 2 },
        { text: 'c', timestamp: 3 },
      ];
      expect(helper.getVisible(entries, 2)).toEqual([
        { text: 'c', timestamp: 3 },
        { text: 'b', timestamp: 2 },
      ]);
    });

    it('returns all entries when maxEntries exceeds length', () => {
      const helper = new EventLogHelper();
      const entries = [
        { text: 'x', timestamp: 1 },
        { text: 'y', timestamp: 2 },
      ];
      expect(helper.getVisible(entries, 10)).toEqual([
        { text: 'y', timestamp: 2 },
        { text: 'x', timestamp: 1 },
      ]);
    });

    it('returns empty array for empty entries', () => {
      const helper = new EventLogHelper();
      expect(helper.getVisible([], 10)).toEqual([]);
    });
  });

  describe('renderEmpty', () => {
    it('renders the no events message', () => {
      const helper = new EventLogHelper();
      render(<ul>{helper.renderEmpty()}</ul>);
      expect(screen.getByText('No events yet.')).toBeInTheDocument();
    });
  });
});
