import { screen, render } from '@testing-library/react';
import StarsRating from './Stars-rating';


describe('StarsRating', () => {
  it('should render rating', () => {

    render(<StarsRating count={1}/>);

    expect(screen.getByTestId('star-test')).toBeInTheDocument();
  });
});
