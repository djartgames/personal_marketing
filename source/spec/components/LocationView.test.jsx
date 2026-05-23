import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LocationView from '../../lib/components/LocationView.jsx';

describe('LocationView', () => {
  it('shows void message when location is null', () => {
    render(<LocationView location={null} />);
    expect(screen.getByText('You are in the void.')).toBeInTheDocument();
  });

  it('renders location name and description', () => {
    const location = { id: 'tavern', name: 'The Rusty Flagon', description: 'A dark tavern.', items: [], npcs: [] };
    render(<LocationView location={location} />);
    expect(screen.getByText('The Rusty Flagon')).toBeInTheDocument();
    expect(screen.getByText('A dark tavern.')).toBeInTheDocument();
  });

  it('renders items in the location', () => {
    const location = {
      id: 'hall',
      name: 'Great Hall',
      description: '',
      items: [{ id: 'sword', name: 'Sword', description: 'Sharp.', isPickable: false }],
      npcs: [],
    };
    render(<LocationView location={location} />);
    expect(screen.getByText('Sword')).toBeInTheDocument();
    expect(screen.getByText('Sharp.')).toBeInTheDocument();
  });

  it('shows Pick up button for pickable items when onPickUp provided', () => {
    const location = {
      id: 'hall',
      name: 'Hall',
      description: '',
      items: [{ id: 'coin', name: 'Coin', isPickable: true }],
      npcs: [],
    };
    const onPickUp = vi.fn();
    render(<LocationView location={location} onPickUp={onPickUp} />);
    expect(screen.getByText('Pick up')).toBeInTheDocument();
  });

  it('calls onPickUp with item data when Pick up clicked', () => {
    const item = { id: 'coin', name: 'Coin', isPickable: true };
    const location = { id: 'hall', name: 'Hall', description: '', items: [item], npcs: [] };
    const onPickUp = vi.fn();
    render(<LocationView location={location} onPickUp={onPickUp} />);
    fireEvent.click(screen.getByText('Pick up'));
    expect(onPickUp).toHaveBeenCalledWith(item);
  });

  it('does not show Pick up button for non-pickable items', () => {
    const location = {
      id: 'hall',
      name: 'Hall',
      description: '',
      items: [{ id: 'statue', name: 'Statue', isPickable: false }],
      npcs: [],
    };
    render(<LocationView location={location} onPickUp={() => {}} />);
    expect(screen.queryByText('Pick up')).toBeNull();
  });

  it('renders NPCs in the location', () => {
    const location = {
      id: 'inn',
      name: 'Inn',
      description: '',
      items: [],
      npcs: [{ id: 'innkeeper', name: 'Gareth', description: 'A stout man.' }],
    };
    render(<LocationView location={location} />);
    expect(screen.getByText('Gareth')).toBeInTheDocument();
    expect(screen.getByText('A stout man.')).toBeInTheDocument();
  });

  it('calls onTalkTo with npc data when Talk clicked', () => {
    const npc = { id: 'innkeeper', name: 'Gareth' };
    const location = { id: 'inn', name: 'Inn', description: '', items: [], npcs: [npc] };
    const onTalkTo = vi.fn();
    render(<LocationView location={location} onTalkTo={onTalkTo} />);
    fireEvent.click(screen.getByText('Talk'));
    expect(onTalkTo).toHaveBeenCalledWith(npc);
  });

  it('renders image above name when image is provided', () => {
    const location = {
      id: 'forest',
      name: 'Forest',
      description: 'Dark trees.',
      image: 'https://example.com/forest.jpg',
      items: [],
      npcs: [],
    };
    const { container } = render(<LocationView location={location} />);
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img.getAttribute('src')).toBe('https://example.com/forest.jpg');
    expect(img.getAttribute('alt')).toBe('Forest');
    const wrapper = container.querySelector('.edwin-location-view');
    expect(wrapper.firstChild).toBe(img);
  });

  it('does not render an image when image is absent', () => {
    const location = { id: 'void', name: 'Void', description: '', items: [], npcs: [] };
    const { container } = render(<LocationView location={location} />);
    expect(container.querySelector('img')).toBeNull();
  });
});
