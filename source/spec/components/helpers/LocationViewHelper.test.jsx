import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LocationViewHelper } from '../../../lib/components/helpers/LocationViewHelper.jsx';

describe('LocationViewHelper', () => {
  describe('renderItemDescription', () => {
    it('renders the item description when present', () => {
      const helper = new LocationViewHelper({});
      render(<span>{helper.renderItemDescription({ description: 'Glows faintly.' })}</span>);
      expect(screen.getByText('Glows faintly.')).toBeInTheDocument();
    });

    it('returns null when description is absent', () => {
      const helper = new LocationViewHelper({});
      expect(helper.renderItemDescription({ description: undefined })).toBeNull();
    });
  });

  describe('renderPickUpButton', () => {
    it('renders Pick up button when item is pickable and onPickUp is provided', () => {
      const onPickUp = vi.fn();
      const helper = new LocationViewHelper({ onPickUp });
      render(<div>{helper.renderPickUpButton({ id: 'gem', isPickable: true })}</div>);
      expect(screen.getByText('Pick up')).toBeInTheDocument();
    });

    it('calls onPickUp with the item when clicked', () => {
      const onPickUp = vi.fn();
      const helper = new LocationViewHelper({ onPickUp });
      const item = { id: 'gem', isPickable: true };
      render(<div>{helper.renderPickUpButton(item)}</div>);
      fireEvent.click(screen.getByText('Pick up'));
      expect(onPickUp).toHaveBeenCalledWith(item);
    });

    it('returns null when item is not pickable', () => {
      const helper = new LocationViewHelper({ onPickUp: vi.fn() });
      expect(helper.renderPickUpButton({ id: 'rock', isPickable: false })).toBeNull();
    });

    it('returns null when onPickUp is not provided', () => {
      const helper = new LocationViewHelper({});
      expect(helper.renderPickUpButton({ id: 'gem', isPickable: true })).toBeNull();
    });
  });

  describe('renderNPCDescription', () => {
    it('renders the NPC description when present', () => {
      const helper = new LocationViewHelper({});
      render(<span>{helper.renderNPCDescription({ description: 'A hooded figure.' })}</span>);
      expect(screen.getByText('A hooded figure.')).toBeInTheDocument();
    });

    it('returns null when description is absent', () => {
      const helper = new LocationViewHelper({});
      expect(helper.renderNPCDescription({ description: undefined })).toBeNull();
    });
  });

  describe('renderTalkButton', () => {
    it('renders Talk button when onTalkTo is provided', () => {
      const onTalkTo = vi.fn();
      const helper = new LocationViewHelper({ onTalkTo });
      render(<div>{helper.renderTalkButton({ id: 'merchant' })}</div>);
      expect(screen.getByText('Talk')).toBeInTheDocument();
    });

    it('calls onTalkTo with the npc when clicked', () => {
      const onTalkTo = vi.fn();
      const helper = new LocationViewHelper({ onTalkTo });
      const npc = { id: 'merchant' };
      render(<div>{helper.renderTalkButton(npc)}</div>);
      fireEvent.click(screen.getByText('Talk'));
      expect(onTalkTo).toHaveBeenCalledWith(npc);
    });

    it('returns null when onTalkTo is not provided', () => {
      const helper = new LocationViewHelper({});
      expect(helper.renderTalkButton({ id: 'merchant' })).toBeNull();
    });
  });

  describe('renderItems', () => {
    it('renders the items section when items are present', () => {
      const helper = new LocationViewHelper({});
      const location = { items: [{ id: 'key', name: 'Golden Key', isPickable: false }] };
      render(<div>{helper.renderItems(location)}</div>);
      expect(screen.getByText('Golden Key')).toBeInTheDocument();
    });

    it('returns null when items array is empty', () => {
      const helper = new LocationViewHelper({});
      expect(helper.renderItems({ items: [] })).toBeNull();
    });

    it('returns null when items is absent', () => {
      const helper = new LocationViewHelper({});
      expect(helper.renderItems({ items: undefined })).toBeNull();
    });
  });

  describe('renderImage', () => {
    it('renders an img with src and alt when image is present', () => {
      const helper = new LocationViewHelper({});
      const location = { name: 'Forest', image: 'https://example.com/forest.jpg' };
      render(<div>{helper.renderImage(location)}</div>);
      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
      expect(img.getAttribute('src')).toBe('https://example.com/forest.jpg');
      expect(img.getAttribute('alt')).toBe('Forest');
    });

    it('returns null when image is absent', () => {
      const helper = new LocationViewHelper({});
      expect(helper.renderImage({ name: 'Forest', image: null })).toBeNull();
    });

    it('returns null when image is an empty string', () => {
      const helper = new LocationViewHelper({});
      expect(helper.renderImage({ name: 'Forest', image: '' })).toBeNull();
    });
  });

  describe('renderNPCs', () => {
    it('renders the NPCs section when NPCs are present', () => {
      const helper = new LocationViewHelper({});
      const location = { npcs: [{ id: 'guard', name: 'Guard' }] };
      render(<div>{helper.renderNPCs(location)}</div>);
      expect(screen.getByText('Guard')).toBeInTheDocument();
    });

    it('returns null when npcs array is empty', () => {
      const helper = new LocationViewHelper({});
      expect(helper.renderNPCs({ npcs: [] })).toBeNull();
    });

    it('returns null when npcs is absent', () => {
      const helper = new LocationViewHelper({});
      expect(helper.renderNPCs({ npcs: undefined })).toBeNull();
    });
  });
});
