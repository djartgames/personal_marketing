import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NavigationHelper } from '../../../lib/components/helpers/NavigationHelper.jsx';

describe('NavigationHelper', () => {
  describe('getExits', () => {
    it('returns the keys of the paths object', () => {
      const helper = new NavigationHelper();
      expect(helper.getExits({ north: 'room2', east: 'room3' })).toEqual(['north', 'east']);
    });

    it('returns empty array for empty paths', () => {
      const helper = new NavigationHelper();
      expect(helper.getExits({})).toEqual([]);
    });
  });

  describe('getLabel', () => {
    it('returns the display label for a known direction', () => {
      const helper = new NavigationHelper();
      expect(helper.getLabel('north')).toBe('↑ North');
      expect(helper.getLabel('south')).toBe('↓ South');
      expect(helper.getLabel('in')).toBe('⤵ In');
    });

    it('returns the direction itself for unknown directions', () => {
      const helper = new NavigationHelper();
      expect(helper.getLabel('upstairs')).toBe('upstairs');
    });
  });

  describe('renderEmpty', () => {
    it('renders the no exits message', () => {
      const helper = new NavigationHelper();
      render(helper.renderEmpty());
      expect(screen.getByText('There are no obvious exits.')).toBeInTheDocument();
    });
  });
});
