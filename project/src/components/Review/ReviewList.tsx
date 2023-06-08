import { Review } from '../../types/types';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';
import { useState } from 'react';

type ReviewListProps = {
    dataReviews: Review[];
    loadMoreReview: (number: number) => void;
    visibleArrayPath: number;
}

function ReviewList ({dataReviews, loadMoreReview = () => void 0, visibleArrayPath}: ReviewListProps):JSX.Element {
  const copyDataReviwes = [...dataReviews];
  const [modalVisible, setModalVisible] = useState<string>('');

  const handleSetModalVisible = (mode: string) => {
    setModalVisible(mode);
  }

  const renderMoreReviews = () => copyDataReviwes.reverse().splice(0, 3 * visibleArrayPath).map((review) => <ReviewItem key={review.id} dataReview={review}/> );


  return (
    <>
      <section className="review-block">
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
      <ReviewForm isVisible={modalVisible} setIsVisible={handleSetModalVisible}/>
    </>

  );
}

export default ReviewList;
