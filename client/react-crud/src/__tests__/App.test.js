import {fireEvent, getByText, render, screen} from '@testing-library/react';
import {render as customRender} from '../utility/test-utils';
import {createMemoryHistory} from 'history';
import App from '../App';
import userEvent from '@testing-library/user-event';
import {act} from 'react-dom/test-utils';

describe('App', () => {
  it('Renders the App Component with browser router', () => {
    const history = createMemoryHistory();
    customRender(<App></App>, {history});
    expect(screen.getByRole('application')).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  describe('Navigation', () => {
    it('displays a navbar', () => {
      const navBarClass = 'navbar';
      customRender(<App></App>);
      expect(screen.getByRole('navigation')).toHaveClass(navBarClass);
    });

    it('displays a navigation links', () => {
      customRender(<App></App>);
      expect(screen.getByRole('navigation')).toHaveTextContent('Binh');
      expect(screen.getByRole('navigation')).toHaveTextContent('Tutorials');
      expect(screen.getByRole('navigation')).toHaveTextContent('Add');
    });

    it('updates url when clicked', () => {
      //https://stackoverflow.com/questions/61869886/simplest-test-for-react-routers-link-with-testing-library-react
      const history = createMemoryHistory();
      let location;
      customRender(<App></App>, {
        history,
        location,
      });
      // when no route is set up links should at least change the location pathname
      userEvent.click(screen.getByText('Tutorials'));
      expect(window.location.pathname).toBe('/tutorials');
      userEvent.click(screen.getByText('Add'));
      expect(window.location.pathname).toBe('/add');
    });
  });
});

describe('Routes', () => {
  it('redirects page to route path tutorials', () => {
    const history = createMemoryHistory();
    customRender(<App></App>, {history: history});
    userEvent.click(screen.getByText('Tutorials'));
    expect(screen.getByText('Tutorials List')).toBeInTheDocument();
  });

  it('redirects page to route path Add', () => {
    const history = createMemoryHistory();
    customRender(<App></App>, {history: history});
    userEvent.click(screen.getByText('Add'));
    expect(screen.getByText('Add Tutorials')).toBeInTheDocument();
  });
});
