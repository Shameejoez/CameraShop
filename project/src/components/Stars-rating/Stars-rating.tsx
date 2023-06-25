
type SartsRatingProps = {
    count: number;
}

function StarsRating ({count}: SartsRatingProps ): JSX.Element {

  return (
    <svg width={17} height={16} aria-hidden="true" data-testid="star-test">
      <use xlinkHref={ count === 1 ? '#icon-full-star' : '#icon-star'} />
    </svg>
  );
}

export default StarsRating;
