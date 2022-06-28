import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('Renders the App Component', () => {
    render(<App/>);
    expect(screen.getByRole("App")).toBeInTheDocument();
  });
});
