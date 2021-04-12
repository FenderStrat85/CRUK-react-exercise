import { render, screen } from '@testing-library/react';
import App from './App';

test('example test', () => {
  render(<App />);
  const linkElement = screen.getByText(/some text here/i);
  expect(linkElement).toBeInTheDocument();
});
