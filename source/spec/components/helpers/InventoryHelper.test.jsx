import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InventoryHelper } from '../../../lib/components/helpers/InventoryHelper.jsx';

describe('InventoryHelper', () => {
  describe('renderItemDescription', () => {
    it('renders the description when present', () => {
      const helper = new InventoryHelper({});
      render(<div>{helper.renderItemDescription({ description: 'A sharp blade.' })}</div>);
      expect(screen.getByText('A sharp blade.')).toBeInTheDocument();
    });

    it('returns null when description is absent', () => {
      const helper = new InventoryHelper({});
      const result = helper.renderItemDescription({ description: undefined });
      expect(result).toBeNull();
    });
  });

  describe('renderUseButton', () => {
    it('renders the Use button when item is usable and onUse is provided', () => {
      const onUse = vi.fn();
      const helper = new InventoryHelper({ onUse });
      render(<div>{helper.renderUseButton({ id: 'potion', isUsable: true })}</div>);
      expect(screen.getByText('Use')).toBeInTheDocument();
    });

    it('calls onUse with item id when clicked', () => {
      const onUse = vi.fn();
      const helper = new InventoryHelper({ onUse });
      render(<div>{helper.renderUseButton({ id: 'potion', isUsable: true })}</div>);
      fireEvent.click(screen.getByText('Use'));
      expect(onUse).toHaveBeenCalledWith('potion');
    });

    it('returns null when item is not usable', () => {
      const helper = new InventoryHelper({ onUse: vi.fn() });
      expect(helper.renderUseButton({ id: 'rock', isUsable: false })).toBeNull();
    });

    it('returns null when onUse is not provided', () => {
      const helper = new InventoryHelper({});
      expect(helper.renderUseButton({ id: 'potion', isUsable: true })).toBeNull();
    });
  });

  describe('renderDropButton', () => {
    it('renders the Drop button when onDrop is provided', () => {
      const onDrop = vi.fn();
      const helper = new InventoryHelper({ onDrop });
      render(<div>{helper.renderDropButton({ id: 'sword' })}</div>);
      expect(screen.getByText('Drop')).toBeInTheDocument();
    });

    it('calls onDrop with item id when clicked', () => {
      const onDrop = vi.fn();
      const helper = new InventoryHelper({ onDrop });
      render(<div>{helper.renderDropButton({ id: 'sword' })}</div>);
      fireEvent.click(screen.getByText('Drop'));
      expect(onDrop).toHaveBeenCalledWith('sword');
    });

    it('returns null when onDrop is not provided', () => {
      const helper = new InventoryHelper({});
      expect(helper.renderDropButton({ id: 'sword' })).toBeNull();
    });
  });
});
