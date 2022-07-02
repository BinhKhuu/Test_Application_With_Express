import {screen, waitFor, act} from '@testing-library/react';
import {render as customRender} from '../utility/test-utils';
import AddTutorials from '../components/AddTutorials';
import userEvent from '@testing-library/user-event';
import TutorialDataService from '../services/TutorialDataService';
import {expect, jest} from '@jest/globals';
import flushPromises from 'flush-promises';

describe('AddTutorials', () => {
  it('renders tutorials add screen', () => {
    customRender(<AddTutorials />);
    expect(screen.getByText('Add Tutorials')).toBeInTheDocument();
  });

  it('renders add tuorials form', () => {
    customRender(<AddTutorials />);
    expect(screen.getByLabelText('title-input')).toBeInTheDocument();
    expect(screen.getByLabelText('description-input')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  describe('form inputs', () => {
    const title = 'UGH';
    const description = 'Big UGH';

    function fillInForm() {
      customRender(<AddTutorials />);
      userEvent.type(screen.getByLabelText('title-input'), title);
      userEvent.type(screen.getByLabelText('description-input'), description);
    }

    it('updates title when user inputs value', () => {
      fillInForm();
      expect(screen.getByLabelText('title-input').value).toBe(title);
    });

    it('updates description when user inputs value', () => {
      fillInForm();
      expect(screen.getByLabelText('description-input').value).toBe(
        description,
      );
    });

    describe('when user submits', () => {
      const mockSave = jest.spyOn(TutorialDataService, 'create');
      async function submitForm() {
        fillInForm();
        mockSave.mockResolvedValue({title, description, published: true});
        userEvent.click(screen.getByText('Submit'));
        return act(flushPromises);
      }

      it('submits calls api user submits', async () => {
        await submitForm();
        await waitFor(() => {
          expect(mockSave).toHaveBeenCalledWith(
            expect.objectContaining({title: title, description: description}),
          );
        });
      });

      it('displays success message when user submits', async () => {
        await submitForm();
        await waitFor(() => {
          expect(
            screen.getByText('You submitted successfully!'),
          ).toBeInTheDocument();
        });
      });

      it('clears input when add new is clicked', async () => {
        await submitForm();
        userEvent.click(screen.getByText('Add more'));
        await waitFor(() => {
          expect(
            screen.queryByText('You submitted successfully!'),
          ).not.toBeInTheDocument();
        });
      });
    });
  });
});
