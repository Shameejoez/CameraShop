import { screen, render } from '@testing-library/react';
import Header from './header';
import 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';


describe('Header', () => {
  it('should render header', () => {

    render(
      <BrowserRouter>
        <Header/>
      </BrowserRouter>);

    expect(screen.getByTestId('header-test')).toBeInTheDocument()
  });
});
