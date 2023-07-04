import { screen, render } from '@testing-library/react';
import StarsRating from './stars-rating';


describe('StarsRating', () => {
  it('should render rating', () => {

    render(<StarsRating isActive={1 <= 5}/>);

    expect(screen.getByTestId('star-test')).toBeInTheDocument();
  });
});
