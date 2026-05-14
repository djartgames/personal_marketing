import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ActionPanelHelper } from '../../../lib/components/helpers/ActionPanelHelper.jsx';

describe('ActionPanelHelper', () => {
  describe('renderEmpty', () => {
    it('renders the nothing to do message', () => {
      const helper = new ActionPanelHelper();
      render(helper.renderEmpty());
      expect(screen.getByText('Nothing to do here.')).toBeInTheDocument();
    });
  });
});
