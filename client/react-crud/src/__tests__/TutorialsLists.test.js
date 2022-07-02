import {screen, act, waitFor, fireEvent} from '@testing-library/react';
import flushPromises from 'flush-promises';
import {render as customRender} from '../utility/test-utils';
import userEvent from '@testing-library/user-event';
import TutorialsList from '../components/TutorialsList';
import TutorialDataService from '../services/TutorialDataService';

describe('Tutorials List', () => {
  const tutorials = [
    {
      title: 'Testing TDD 1',
      description: 'Description of TDD 1',
      id: 1,
    },
  ];

  describe('List Component', () => {
    let mock;
    async function loadTutorials() {
      mock = jest
        .spyOn(TutorialDataService, 'getAll')
        .mockResolvedValue({data: tutorials});
      customRender(<TutorialsList />);
      return act(flushPromises);
    }

    it('Renders Tutorials List', () => {
      customRender(<TutorialsList></TutorialsList>);
      expect(screen.getByText('Tutorials List')).toBeInTheDocument();
    });

    it('Renders List of Tutorials', () => {
      customRender(<TutorialsList tutorials={tutorials} />);
      expect(screen.getByText(tutorials[0].title)).toBeInTheDocument();
    });

    it('Highlights active tutorial', () => {
      customRender(<TutorialsList tutorials={tutorials} />);
      userEvent.click(screen.getByText(tutorials[0].title));
      expect(screen.getByText(tutorials[0].description)).toBeInTheDocument();
    });

    it('calls retrieveTutorials on render', () => {
      const retrieveTutorials = jest.spyOn(TutorialDataService, 'getAll');
      customRender(<TutorialsList />);
      expect(retrieveTutorials).toHaveBeenCalled();
    });

    it('calls loads tutorials', async () => {
      await loadTutorials();
      expect(await screen.findByText(tutorials[0].title)).toBeInTheDocument();
      mock.mockRestore();
    });

    describe('tutorial info', () => {
      it('displays edit tutorials button when item selected', async () => {
        await loadTutorials();
        mock.mockRestore();
        userEvent.click(await screen.findByText(tutorials[0].title));
        await waitFor(() => {
          expect(screen.getByText('Edit')).toBeInTheDocument();
        });
      });
    });

    it('redirects to info page', async () => {
      await loadTutorials();
      mock.mockRestore();
      userEvent.click(await screen.findByText(tutorials[0].title));
      userEvent.click(await screen.findByText('Edit'));
      expect(window.location.pathname).toBe(`/tutorials/${tutorials[0].id}`);
    });
  });

  describe('search box component', () => {
    it('Renders search box', () => {
      customRender(<TutorialsList />);
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('call search handler', () => {
      customRender(<TutorialsList />);
      const mock = jest
        .spyOn(TutorialDataService, 'findByTitle')
        .mockResolvedValue(tutorials);
      userEvent.click(screen.getByText('Search'));
      expect(mock).toHaveBeenCalled();
    });

    it('renders results on search success', async () => {
      customRender(<TutorialsList />);
      jest
        .spyOn(TutorialDataService, 'findByTitle')
        .mockResolvedValue({data: tutorials});
      userEvent.click(screen.getByText('Search'));
      expect(await screen.findByText(tutorials[0].title)).toBeInTheDocument();
    });
  });
});
