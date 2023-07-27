import { screen, render } from '@testing-library/react';
import Spinner from './spinner';


describe('spinner', () => {
  it('should render', () => {
    render(<Spinner/>);

    expect(screen.getByTestId('spinner-test')).toBeInTheDocument();
  });
});
