import { Review, sendRewiew } from '../../../types/types';
import ReviewItem from '../review-Item/review-item';
import ReviewSucsessPopup from '../review-success-popup/review-sucsess-popup';
import ReviewForm from '../../review/review-form/review-form';
import { useState } from 'react';
import { REVIEW_COUNT } from '../../../consts';

type ReviewListProps = {
    dataReviews: Review[];
    onClick: (number: number) => void;
    visibleArrayPath: number;
    onSubmit: (review: sendRewiew) => void;
}

function ReviewList ({dataReviews, onClick = () => void 0, visibleArrayPath, onSubmit}: ReviewListProps):JSX.Element {

  const copyDataReviwes = [...dataReviews];
  const quantityReviewPath = Math.ceil(copyDataReviwes.length / REVIEW_COUNT);
  const [modalVisible, setModalVisible] = useState<string>('');
  const [successVisible, setSuccessVisible] = useState<string>('');

  const handleSetModalVisible = (mode: string) => {
    setModalVisible(mode);
  };

  const handleSuccessVisible = (mode: string) => {
    setSuccessVisible(mode);
  };

  const renderMoreReviews = () => copyDataReviwes.reverse().splice(0, REVIEW_COUNT * visibleArrayPath).map((review) => <ReviewItem key={review.id} dataReview={review}/> );

  return (
    <>
      <section className="review-block" data-review-list='review-list-test'>
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3" >Отзывы</h2>
            <button className="btn" type="button" onClick={() => handleSetModalVisible('is-active')} >Оставить свой отзыв</button>
          </div>
          <ul className="review-block__list">
            {/* Отзывы */}
            {renderMoreReviews()}
          </ul>
          <div className="review-block__buttons">
            <button className={`btn btn--purple ${ visibleArrayPath === quantityReviewPath ? 'visually-hidden' : ''}`} type="button" onClick={() => onClick(1)} >Показать больше отзывов
            </button>
          </div>
        </div>
      </section>
      <ReviewForm isVisible={modalVisible} setIsVisible={handleSetModalVisible} onSubmit={onSubmit} setIsVisibleSuccess={handleSuccessVisible} />
      <ReviewSucsessPopup isVisible={successVisible} setIsVisible={handleSuccessVisible}/>
    </>
  );
}

export default ReviewList;
