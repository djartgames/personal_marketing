import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navigation from '../../lib/components/Navigation.jsx';

describe('Navigation', () => {
  it('shows empty state message when no exits', () => {
    render(<Navigation paths={{}} onNavigate={() => {}} />);
    expect(screen.getByText('There are no obvious exits.')).toBeInTheDocument();
  });

  it('renders direction labels from path objects', () => {
    const paths = {
      north: { target: 'town', label: '↑ North' },
      south: { target: 'cave', label: '↓ South' },
    };
    render(<Navigation paths={paths} onNavigate={() => {}} />);
    expect(screen.getByText('↑ North')).toBeInTheDocument();
    expect(screen.getByText('↓ South')).toBeInTheDocument();
  });

  it('falls back to direction key when no label provided', () => {
    render(<Navigation paths={{ secret: { target: 'vault' } }} onNavigate={() => {}} />);
    expect(screen.getByText('secret')).toBeInTheDocument();
  });

  it('calls onNavigate with the direction when button clicked', () => {
    const onNavigate = vi.fn();
    render(<Navigation paths={{ east: { target: 'market', label: '→ East' } }} onNavigate={onNavigate} />);
    fireEvent.click(screen.getByText('→ East'));
    expect(onNavigate).toHaveBeenCalledWith('east');
  });

  it('renders all available direction buttons', () => {
    const paths = {
      north: { target: 'a', label: '↑ North' },
      south: { target: 'b', label: '↓ South' },
      east:  { target: 'c', label: '→ East' },
      west:  { target: 'd', label: '← West' },
      up:    { target: 'e', label: '▲ Up' },
      down:  { target: 'f', label: '▼ Down' },
      in:    { target: 'g', label: '⤵ In' },
      out:   { target: 'h', label: '⤴ Out' },
    };
    render(<Navigation paths={paths} onNavigate={() => {}} />);
    expect(screen.getByText('↑ North')).toBeInTheDocument();
    expect(screen.getByText('▲ Up')).toBeInTheDocument();
    expect(screen.getByText('⤵ In')).toBeInTheDocument();
  });
});
