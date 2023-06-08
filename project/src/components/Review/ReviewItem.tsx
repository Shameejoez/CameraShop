import { DateFormat, RAITING_COUNT } from '../../consts';
import { Review } from '../../types/types';
import { renderData } from '../../utils';
import StarsRating from '../Stars-rating/Stars-rating';

type ReviewItemProps = {
  dataReview: Review;
}

function ReviewItem ({dataReview}: ReviewItemProps): JSX.Element {

  const {advantage, createAt, disadvantage, rating, review, userName} = dataReview;


  const renderStarsRating = () =>
    Array.from({length: RAITING_COUNT}, (_, i) =>
      <StarsRating key={i} count={ i + 1 <= rating ? 1 : 0 }/>
    );

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">{renderData(createAt, DateFormat.commentFormat)}</time>
      </div>
      <div className="rate review-card__rate">
        {renderStarsRating()}
        <p className="visually-hidden">Оценка: 5</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}


export default ReviewItem;
