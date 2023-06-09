
type SartsRatingProps = {
  isActive: boolean;
}

function StarsRating ({isActive}: SartsRatingProps ): JSX.Element {

  return (
    <svg width={17} height={16} aria-hidden="true" data-testid="star-test">
      <use xlinkHref={ isActive ? '#icon-full-star' : '#icon-star'} />
    </svg>
  );
}

export default StarsRating;
