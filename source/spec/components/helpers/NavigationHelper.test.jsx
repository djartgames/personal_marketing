import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NavigationHelper } from '../../../lib/components/helpers/NavigationHelper.jsx';

describe('NavigationHelper', () => {
  describe('getExits', () => {
    it('returns the keys of the paths object', () => {
      const helper = new NavigationHelper();
      const paths = {
        north: { target: 'room2', label: '↑ North' },
        east: { target: 'room3', label: '→ East' },
      };
      expect(helper.getExits(paths)).toEqual(['north', 'east']);
    });

    it('returns empty array for empty paths', () => {
      const helper = new NavigationHelper();
      expect(helper.getExits({})).toEqual([]);
    });
  });

  describe('getLabel', () => {
    it('returns the label from the path object', () => {
      const helper = new NavigationHelper();
      expect(helper.getLabel('north', { target: 'town', label: '↑ North' })).toBe('↑ North');
      expect(helper.getLabel('deeper', { target: 'forest', label: 'Deeper' })).toBe('Deeper');
    });

    it('falls back to the direction key when no label is provided', () => {
      const helper = new NavigationHelper();
      expect(helper.getLabel('upstairs', { target: 'attic' })).toBe('upstairs');
      expect(helper.getLabel('upstairs', undefined)).toBe('upstairs');
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
