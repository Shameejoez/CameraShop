import { screen, render } from '@testing-library/react';
import ReviewItem from './1review-item';
import { Review } from '../../../types/types';


const reviews: Review = {
  advantage: 'Ва ва ваааууууу',
  disadvantage: 'фу фу фиииии',
  cameraId: 88,
  createAt: '18.12.12',
  id: '44',
  rating: 5,
  review: 'Ну ни че так',
  userName: 'Puma'

};

describe('ReviewItem', () => {

  const reviewItem = <ReviewItem dataReview={reviews}/>;
  it('should render ReviewItem', () => {

    render(reviewItem);

    expect(screen.getByText(reviews.userName)).toBeInTheDocument();
    expect(screen.getByText(reviews.advantage)).toBeInTheDocument();
    expect(screen.getByText(reviews.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(reviews.review)).toBeInTheDocument();

  });
});
