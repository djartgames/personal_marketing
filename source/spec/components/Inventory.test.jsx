import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Inventory from '../../lib/components/Inventory.jsx';

describe('Inventory', () => {
  it('shows empty state when no items', () => {
    render(<Inventory items={[]} />);
    expect(screen.getByText('Your pack is empty.')).toBeInTheDocument();
  });

  it('renders item names', () => {
    const items = [
      { id: 'sword', name: 'Iron Sword', description: 'A sturdy blade.', isUsable: false },
      { id: 'potion', name: 'Health Potion', isUsable: true },
    ];
    render(<Inventory items={items} />);
    expect(screen.getByText('Iron Sword')).toBeInTheDocument();
    expect(screen.getByText('Health Potion')).toBeInTheDocument();
  });

  it('renders item description when provided', () => {
    const items = [{ id: 'gem', name: 'Ruby Gem', description: 'Sparkles red.' }];
    render(<Inventory items={items} />);
    expect(screen.getByText('Sparkles red.')).toBeInTheDocument();
  });

  it('shows Drop button when onDrop is provided', () => {
    const items = [{ id: 'sword', name: 'Sword', isUsable: false }];
    render(<Inventory items={items} onDrop={() => {}} />);
    expect(screen.getByText('Drop')).toBeInTheDocument();
  });

  it('calls onDrop with item id when Drop is clicked', () => {
    const onDrop = vi.fn();
    const items = [{ id: 'sword', name: 'Sword', isUsable: false }];
    render(<Inventory items={items} onDrop={onDrop} />);
    fireEvent.click(screen.getByText('Drop'));
    expect(onDrop).toHaveBeenCalledWith('sword');
  });

  it('shows Use button when item isUsable and onUse is provided', () => {
    const items = [{ id: 'potion', name: 'Potion', isUsable: true }];
    render(<Inventory items={items} onUse={() => {}} />);
    expect(screen.getByText('Use')).toBeInTheDocument();
  });

  it('calls onUse with item id when Use is clicked', () => {
    const onUse = vi.fn();
    const items = [{ id: 'potion', name: 'Potion', isUsable: true }];
    render(<Inventory items={items} onUse={onUse} />);
    fireEvent.click(screen.getByText('Use'));
    expect(onUse).toHaveBeenCalledWith('potion');
  });

  it('does not show Use button when isUsable is false', () => {
    const items = [{ id: 'rock', name: 'Rock', isUsable: false }];
    render(<Inventory items={items} onUse={() => {}} />);
    expect(screen.queryByText('Use')).toBeNull();
  });
});
