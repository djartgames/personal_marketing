import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NPCDialog from '../../lib/components/NPCDialog.jsx';

const npc = { id: 'guard', name: 'Guard', description: 'A stern soldier.' };
const step = {
  id: 's1',
  text: 'Who goes there?',
  options: [
    { label: 'A friend.' },
    { label: 'Leave me alone.' },
  ],
};

describe('NPCDialog', () => {
  it('returns null when npc is null', () => {
    const { container } = render(
      <NPCDialog npc={null} currentStep={step} onChoose={() => {}} onClose={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders NPC name and description', () => {
    render(<NPCDialog npc={npc} currentStep={step} onChoose={() => {}} onClose={() => {}} />);
    expect(screen.getByText('Guard')).toBeInTheDocument();
    expect(screen.getByText('A stern soldier.')).toBeInTheDocument();
  });

  it('renders current dialogue text', () => {
    render(<NPCDialog npc={npc} currentStep={step} onChoose={() => {}} onClose={() => {}} />);
    expect(screen.getByText('Who goes there?')).toBeInTheDocument();
  });

  it('renders option buttons', () => {
    render(<NPCDialog npc={npc} currentStep={step} onChoose={() => {}} onClose={() => {}} />);
    expect(screen.getByText('A friend.')).toBeInTheDocument();
    expect(screen.getByText('Leave me alone.')).toBeInTheDocument();
  });

  it('calls onChoose with option index when option clicked', () => {
    const onChoose = vi.fn();
    render(<NPCDialog npc={npc} currentStep={step} onChoose={onChoose} onClose={() => {}} />);
    fireEvent.click(screen.getByText('A friend.'));
    expect(onChoose).toHaveBeenCalledWith(0);
    fireEvent.click(screen.getByText('Leave me alone.'));
    expect(onChoose).toHaveBeenCalledWith(1);
  });

  it('calls onClose when Leave button clicked', () => {
    const onClose = vi.fn();
    render(<NPCDialog npc={npc} currentStep={step} onChoose={() => {}} onClose={onClose} />);
    fireEvent.click(screen.getByText('Leave'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when close button (×) clicked', () => {
    const onClose = vi.fn();
    render(<NPCDialog npc={npc} currentStep={step} onChoose={() => {}} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when backdrop clicked', () => {
    const onClose = vi.fn();
    render(<NPCDialog npc={npc} currentStep={step} onChoose={() => {}} onClose={onClose} />);
    fireEvent.click(document.querySelector('.modal-backdrop'));
    expect(onClose).toHaveBeenCalled();
  });

  it('shows conversation ended message when currentStep is null', () => {
    render(<NPCDialog npc={npc} currentStep={null} onChoose={() => {}} onClose={() => {}} />);
    expect(screen.getByText('The conversation has ended.')).toBeInTheDocument();
  });
});
