import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navigation from '../../lib/components/Navigation.jsx';

describe('Navigation', () => {
  it('shows empty state message when no exits', () => {
    render(<Navigation paths={{}} onNavigate={() => {}} />);
    expect(screen.getByText('There are no obvious exits.')).toBeInTheDocument();
  });

  it('renders known direction labels', () => {
    render(<Navigation paths={{ north: 'town', south: 'cave' }} onNavigate={() => {}} />);
    expect(screen.getByText('↑ North')).toBeInTheDocument();
    expect(screen.getByText('↓ South')).toBeInTheDocument();
  });

  it('falls back to direction key for unknown directions', () => {
    render(<Navigation paths={{ secret: 'vault' }} onNavigate={() => {}} />);
    expect(screen.getByText('secret')).toBeInTheDocument();
  });

  it('calls onNavigate with the direction when button clicked', () => {
    const onNavigate = vi.fn();
    render(<Navigation paths={{ east: 'market' }} onNavigate={onNavigate} />);
    fireEvent.click(screen.getByText('→ East'));
    expect(onNavigate).toHaveBeenCalledWith('east');
  });

  it('renders all available direction buttons', () => {
    const paths = { north: 'a', south: 'b', east: 'c', west: 'd', up: 'e', down: 'f', in: 'g', out: 'h' };
    render(<Navigation paths={paths} onNavigate={() => {}} />);
    expect(screen.getByText('↑ North')).toBeInTheDocument();
    expect(screen.getByText('▲ Up')).toBeInTheDocument();
    expect(screen.getByText('⤵ In')).toBeInTheDocument();
  });
});
