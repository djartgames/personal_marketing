import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GameContainerHelper } from '../../../lib/components/helpers/GameContainerHelper.jsx';

describe('GameContainerHelper', () => {
  describe('renderActionPanel', () => {
    it('renders the ActionPanel when actions are available', () => {
      const helper = new GameContainerHelper();
      const actions = [{ id: 'a1', label: 'Shout' }];
      render(<div>{helper.renderActionPanel(actions, vi.fn())}</div>);
      expect(screen.getByText('Shout')).toBeInTheDocument();
    });

    it('calls onAction when an action button is clicked', () => {
      const onAction = vi.fn();
      const helper = new GameContainerHelper();
      const actions = [{ id: 'a1', label: 'Shout' }];
      render(<div>{helper.renderActionPanel(actions, onAction)}</div>);
      fireEvent.click(screen.getByText('Shout'));
      expect(onAction).toHaveBeenCalledWith('a1');
    });

    it('returns null when there are no actions', () => {
      const helper = new GameContainerHelper();
      expect(helper.renderActionPanel([], vi.fn())).toBeNull();
    });
  });

  describe('renderNPCDialog', () => {
    it('renders the NPCDialog when activeNPC is set', () => {
      const helper = new GameContainerHelper();
      const npc = { id: 'innkeeper', name: 'Innkeeper', description: null };
      const step = { id: 's1', text: 'Hello traveller!', options: [] };
      render(
        <div>
          {helper.renderNPCDialog(npc, step, vi.fn(), vi.fn())}
        </div>
      );
      expect(screen.getByText('Hello traveller!')).toBeInTheDocument();
    });

    it('returns null when activeNPC is null', () => {
      const helper = new GameContainerHelper();
      expect(helper.renderNPCDialog(null, null, vi.fn(), vi.fn())).toBeNull();
    });
  });
});
