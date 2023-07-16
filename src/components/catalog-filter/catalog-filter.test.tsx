import { screen, render, fireEvent } from '@testing-library/react';
import CatalogFilter from './catalog-filter';


describe('Catalog-filter', () => {
  const resetPage = jest.fn;
  it('should render catalog-filter', () => {

    render(<CatalogFilter resetPage={resetPage}/>);

    const chekOne = screen.getByRole('checkbox', {name: 'Коллекционная'});
    const chekTwo = screen.getByRole('checkbox', {name: 'Моментальная'});
    const chekThree = screen.getByRole('checkbox', {name: 'Цифровая'});
    const chekFour = screen.getByRole('checkbox', {name: 'Плёночная'});
    const chekFive = screen.getByRole('checkbox', {name: 'Видеокамера'});
    const chekSix = screen.getByRole('checkbox', {name: 'Фотоаппарат'});
    const chekSeven = screen.getByRole('checkbox', {name: 'Нулевой'});
    const chekEight = screen.getByRole('checkbox', {name: 'Любительский'});
    const chekNine = screen.getByRole('checkbox', {name: 'Профессиональный'});

    fireEvent.click(chekOne);
    fireEvent.click(chekTwo);
    fireEvent.click(chekThree);
    fireEvent.click(chekFour);
    fireEvent.click(chekFive);
    fireEvent.click(chekSix);
    fireEvent.click(chekSeven);
    fireEvent.click(chekEight);
    fireEvent.click(chekNine);

    expect(chekOne).toBeChecked();
    expect(chekTwo).toBeChecked();
    expect(chekThree).toBeChecked();
    expect(chekFour).toBeChecked();
    expect(chekFive).toBeChecked();
    expect(chekSix).toBeChecked();
    expect(chekSeven).toBeChecked();
    expect(chekNine).toBeChecked();
  });
});


