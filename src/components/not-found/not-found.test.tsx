import { render, screen } from '@testing-library/react';
import NotFound from './not-found';
import { BrowserRouter } from 'react-router-dom';

describe('NotFound', () => {
  it('should render notfound', () => {
    render(
      <BrowserRouter>
        <NotFound/>
      </BrowserRouter>

    );

    expect(screen.getByTestId('not-found-test')).toBeInTheDocument();
  });

});
