import { render, screen } from '@testing-library/react';
import App from '../App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('App', () => {
  it('Renders the App Component', () => {
    render(<App></App>);
    expect(screen.getByText('UGH')).toBeInTheDocument();
  });
});
