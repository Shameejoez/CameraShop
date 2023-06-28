import { screen, render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import { BrowserRouter } from 'react-router-dom';


describe('Pagination', () => {
  const countPage = 8;// Тут используется как раз useState о котором я говорил
  const setActivePage = jest.fn(); // это setState
  const activePage = 1; //  state

  it('should clicks on numbers work and Pagination randered', () => {
    render (
      <BrowserRouter>
        <Pagination activePage={activePage} setActivePage={setActivePage} countPage={countPage}/>
      </BrowserRouter>
    );

    expect(screen.getByText('1' && '2' && '3' && '4' && '5' && '6' && '7' && '8' && 'Назад' && 'Далее')).toBeInTheDocument();

    const activeButton = screen.getByRole('link', {name: '5'});

    fireEvent.click(activeButton); // после этого клика должен смениться активны класс, но он не меняется

    expect(setActivePage).toBeCalled();
  });
});
