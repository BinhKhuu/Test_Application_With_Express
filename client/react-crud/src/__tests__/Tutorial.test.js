import {screen, act, waitFor, fireEvent} from '@testing-library/react';
import flushPromises from 'flush-promises';
import {render as customRender} from '../utility/test-utils';
import userEvent from '@testing-library/user-event';
import TutorialService from '../services/TutorialDataService';
import {expect, jest} from '@jest/globals';
import Tutorial from '../components/Tutorial';

describe('Tutorials info', () => {
  let mock;
  let location;
  const mockLocation = new URL('http://localhost:3000/tutorials/1');
  const tutorial = {
    title: 'Testing TDD 1',
    description: 'Description of TDD 1',
    id: 1,
  };
  let updatedTitle = ' Updated';
  let udpatedDesc = ' Updated';

  async function loadTutorial() {
    mock = jest
      .spyOn(TutorialService, 'get')
      .mockImplementation(() => {
        return Promise.resolve({data: tutorial});
      })
      .mockResolvedValue({data: tutorial});
    customRender(<Tutorial />);
    return act(flushPromises);
  }

  async function updateTutorial() {
    await loadTutorial();
    userEvent.type(screen.getByDisplayValue(tutorial.title), updatedTitle);
    userEvent.type(screen.getByDisplayValue(tutorial.description), udpatedDesc);
  }

  beforeEach(() => {
    location = window.location;
    mockLocation.replace = jest.fn();
    // You might need to mock other functions as well
    // location.assign = jest.fn();
    // location.reload = jest.fn();
    delete window.location;
    window.location = mockLocation;
  });

  it('Renders tutorial info page', () => {
    customRender(<Tutorial />);
    expect(screen.getByText('Tutorial')).toBeInTheDocument();
  });

  it('Renders tutorials form', () => {
    customRender(<Tutorial />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
  });

  it('Renders form actions', async () => {
    await loadTutorial();
    expect(await screen.findByText('Publish')).toBeInTheDocument();
    expect(await screen.findByText('Delete')).toBeInTheDocument();
    expect(await screen.findByText('Update')).toBeInTheDocument();
  });

  describe('Load Tutorials', () => {
    it('calls loading function', async () => {
      await loadTutorial();
      await waitFor(() => {
        expect(mock).toHaveBeenCalled();
      });
    });

    it('Loads tutorials info', async () => {
      await loadTutorial();
      await waitFor(() => {
        expect(screen.getByDisplayValue(tutorial.title)).toBeInTheDocument();
      });
    });
  });

  describe('Edit inputs', () => {
    it('update input when user input changes', async () => {
      await updateTutorial();
      expect(
        screen.getByDisplayValue(`${tutorial.title}${updatedTitle}`),
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(`${tutorial.title}${udpatedDesc}`),
      ).toBeInTheDocument();
    });
  });

  describe('Tutorial Actions', () => {
    it('Updates Tutorial', async () => {
      await updateTutorial();
      const updateMock = jest
        .spyOn(TutorialService, 'update')
        .mockImplementation(() => {
          Promise.resolve();
        });
      userEvent.click(screen.getByText(`Update`));
      await waitFor(() => {
        expect(updateMock).toHaveBeenCalled();
      });
    });

    it('Deletes Tutorial', async () => {
      await updateTutorial();
      const deleteMock = jest
        .spyOn(TutorialService, 'remove')
        .mockImplementation(() => {
          Promise.resolve();
        });
      userEvent.click(screen.getByText(`Delete`));
      await waitFor(() => {
        expect(deleteMock).toHaveBeenCalled();
      });
    });

    it('Publishes Tutorial', async () => {
      await updateTutorial();
      const publishMock = jest
        .spyOn(TutorialService, 'update')
        .mockImplementation(() => {
          Promise.resolve();
        });
      userEvent.click(screen.getByText(`Publish`));
      await waitFor(() => {
        expect(publishMock).toHaveBeenCalled();
      });
    });

    it('Displays message when updated sucessfully', async () => {
      await updateTutorial();
      const updateMock = jest.spyOn(TutorialService, 'update');
      userEvent.click(screen.getByText(`Update`));
      updateMock.mockReturnValue({data: tutorial});
      await waitFor(() => {
        expect(
          screen.getByText('The tutorial was updated successfully!'),
        ).toBeInTheDocument();
      });
    });

    it('redirects when deleted sucessfully', async () => {
      await updateTutorial();
      const deleteMock = jest
        .spyOn(TutorialService, 'remove')
        .mockImplementation(() => {
          Promise.resolve();
        });
      userEvent.click(screen.getByText(`Delete`));
      await waitFor(() => {
        expect(location.pathname).toBe('/');
      });
    });
  });

  afterEach(() => {
    window.location = location;
  });
});
