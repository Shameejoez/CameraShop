import { Review, sendRewiew } from '../../../types/types';
import ReviewItem from '../Review-Item/Review-item';
import ReviewSucsessPopup from '../Review-success-popup/Review-sucsess-popup';
import ReviewForm from '../Review-form/Review-form';
import { useState } from 'react';

type ReviewListProps = {
    dataReviews: Review[];
    loadMoreReview: (number: number) => void;
    visibleArrayPath: number;
    onSubmit: (review: sendRewiew) => void;
}

function ReviewList ({dataReviews, loadMoreReview = () => void 0, visibleArrayPath, onSubmit}: ReviewListProps):JSX.Element {
  const copyDataReviwes = [...dataReviews];
  const [modalVisible, setModalVisible] = useState<string>('');
  const [successVisible, setSuccessVisible] = useState<string>('');

  const handleSetModalVisible = (mode: string) => {
    setModalVisible(mode);
  };

  const handleSuccessVisible = (mode: string) => {
    setSuccessVisible(mode);
  };

  const renderMoreReviews = () => copyDataReviwes.reverse().splice(0, 3 * visibleArrayPath).map((review) => <ReviewItem key={review.id} dataReview={review}/> );


  return (
    <>
      <section className="review-block" data-review-list='review-list-test'>
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={() => handleSetModalVisible('is-active')}>Оставить свой отзыв</button>
          </div>
          <ul className="review-block__list">

            {/* Отзывы */}
            {renderMoreReviews()}

          </ul>
          <div className="review-block__buttons">
            <button className="btn btn--purple" type="button" onClick={() => loadMoreReview(1)}>Показать больше отзывов
            </button>
          </div>
        </div>
      </section>

      <ReviewForm isVisible={modalVisible} setIsVisible={handleSetModalVisible} onSubmit={onSubmit} setIsVisibleSuccess={setSuccessVisible}/>

      <ReviewSucsessPopup isVisible={successVisible} setIsVisible={handleSuccessVisible}/>
    </>

  );
}

export default ReviewList;
