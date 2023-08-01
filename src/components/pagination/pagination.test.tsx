import { screen, render, fireEvent } from '@testing-library/react';
import Pagination from './pagination';
import { BrowserRouter } from 'react-router-dom';


describe('Pagination', () => {
  const countPage = 8;
  const setActivePage = jest.fn();
  const activePage = 1;

  it('should clicks on numbers work and Pagination randered', () => {
    render (
      <BrowserRouter>
        <Pagination activePage={activePage} setActivePage={setActivePage} countPage={countPage}/>
      </BrowserRouter>
    );

    expect(screen.getByText('1' && '2' && '3' && '4' && '5' && '6' && '7' && '8' && 'Назад' && 'Далее')).toBeInTheDocument();

    const activeButton = screen.getByRole('link', {name: '5'});

    fireEvent.click(activeButton);

    expect(setActivePage).toBeCalled();
  });
});
