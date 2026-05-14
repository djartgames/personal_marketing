import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ActionPanel from '../../lib/components/ActionPanel.jsx';

describe('ActionPanel', () => {
  it('shows empty state message when no actions', () => {
    render(<ActionPanel actions={[]} onAction={() => {}} />);
    expect(screen.getByText('Nothing to do here.')).toBeInTheDocument();
  });

  it('renders action buttons for each action', () => {
    const actions = [
      { id: 'act1', label: 'Open door' },
      { id: 'act2', label: 'Light torch', description: 'Illuminates the room' },
    ];
    render(<ActionPanel actions={actions} onAction={() => {}} />);
    expect(screen.getByText('Open door')).toBeInTheDocument();
    expect(screen.getByText('Light torch')).toBeInTheDocument();
  });

  it('calls onAction with action id when button is clicked', () => {
    const onAction = vi.fn();
    const actions = [{ id: 'act1', label: 'Open door' }];
    render(<ActionPanel actions={actions} onAction={onAction} />);
    fireEvent.click(screen.getByText('Open door'));
    expect(onAction).toHaveBeenCalledWith('act1');
  });

  it('sets title attribute from description', () => {
    const actions = [{ id: 'act1', label: 'Open door', description: 'Requires a key' }];
    render(<ActionPanel actions={actions} onAction={() => {}} />);
    expect(screen.getByTitle('Requires a key')).toBeInTheDocument();
  });
});
