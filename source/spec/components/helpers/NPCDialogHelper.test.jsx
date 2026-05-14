import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NPCDialogHelper } from '../../../lib/components/helpers/NPCDialogHelper.jsx';

describe('NPCDialogHelper', () => {
  describe('renderDescription', () => {
    it('renders the NPC description when present', () => {
      const helper = new NPCDialogHelper(vi.fn());
      render(<div>{helper.renderDescription({ description: 'An old wizard.' })}</div>);
      expect(screen.getByText('An old wizard.')).toBeInTheDocument();
    });

    it('returns null when description is absent', () => {
      const helper = new NPCDialogHelper(vi.fn());
      expect(helper.renderDescription({ description: undefined })).toBeNull();
    });
  });

  describe('renderOptions', () => {
    it('renders option buttons for each choice', () => {
      const handleChoose = vi.fn();
      const helper = new NPCDialogHelper(handleChoose);
      const step = { options: [{ label: 'Yes' }, { label: 'No' }] };
      render(<div>{helper.renderOptions(step)}</div>);
      expect(screen.getByText('Yes')).toBeInTheDocument();
      expect(screen.getByText('No')).toBeInTheDocument();
    });

    it('calls handleChoose with the option index when clicked', () => {
      const handleChoose = vi.fn();
      const helper = new NPCDialogHelper(handleChoose);
      const step = { options: [{ label: 'Greet' }, { label: 'Ignore' }] };
      render(<div>{helper.renderOptions(step)}</div>);
      fireEvent.click(screen.getByText('Ignore'));
      expect(handleChoose).toHaveBeenCalledWith(1);
    });

    it('returns null when options array is empty', () => {
      const helper = new NPCDialogHelper(vi.fn());
      expect(helper.renderOptions({ options: [] })).toBeNull();
    });

    it('returns null when options is absent', () => {
      const helper = new NPCDialogHelper(vi.fn());
      expect(helper.renderOptions({ options: undefined })).toBeNull();
    });
  });

  describe('renderCurrentStep', () => {
    it('renders the step text and options when a step is active', () => {
      const helper = new NPCDialogHelper(vi.fn());
      const step = {
        id: 's1',
        text: 'What brings you here?',
        options: [{ label: 'Adventure.' }],
      };
      render(<div>{helper.renderCurrentStep(step)}</div>);
      expect(screen.getByText('What brings you here?')).toBeInTheDocument();
      expect(screen.getByText('Adventure.')).toBeInTheDocument();
    });

    it('renders the conversation ended message when step is null', () => {
      const helper = new NPCDialogHelper(vi.fn());
      render(<div>{helper.renderCurrentStep(null)}</div>);
      expect(screen.getByText('The conversation has ended.')).toBeInTheDocument();
    });
  });
});
