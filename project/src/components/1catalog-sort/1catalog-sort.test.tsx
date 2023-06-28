import { screen, render } from '@testing-library/react';
import CatalogSort from './1catalog-sort';


describe('Catalog-sort', () => {
  it('Should render catalog-sort', () => {
    render(<CatalogSort/>);

    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();

    expect(screen.getByRole('radio', {name: 'По возрастанию'})).toBeInTheDocument();
    expect(screen.getByRole('radio', {name: 'По убыванию'})).toBeInTheDocument();
  });
});
