/* eslint-disable no-nested-ternary */
import { useAppDispatch } from '../../hooks';
import { RatingStarCategories, ReviewCustomInputData, STARS_COUNT } from '../../consts';
import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import type { sendRewiew } from '../../types/types';
import { getReviews, postReview } from '../../store/action';
import { useParams } from 'react-router-dom';
import useInput from '../../hooks/useInput';

type ReviewFormProps = {
  isVisible: string;
  setIsVisible: (mode: string) => void;
}

function ReviewForm({ isVisible, setIsVisible }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const advantage = useInput('');
  const disadvantage = useInput('');
  const name = useInput('');
  const [review, setReview] = useState<string>('');
  const [reviewDurty, setReviewDurty] = useState(false);
  const [reviewError, setReviewError] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [ratingError, setRatingError] = useState(false);


  const onBlurisDurtyHandler = ( e: ChangeEvent) => {
    getReviewHandler(e as ChangeEvent<HTMLTextAreaElement>);
    setReviewDurty(true);
  };


  const getReviewHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
    checkReviewLengthHandler(e.target.value);
  };

  const checkReviewLengthHandler = (text: string) => {
    if (text.length < 5) {
      setReviewError(true);
    } else {
      setReviewError(false);
    }
  };

  const isValidReview = () =>
    !reviewDurty ? '' : reviewDurty && reviewError ? 'is-invalid' : 'is-valid';


  const getRatingHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const currentRating = Number(e.target.value);
    setRating(currentRating);
    chekValidRating(currentRating);
  };

  const chekValidRating = (value: number) =>
    value === 0 ? setRatingError(true) : setRatingError(false);


  const getStateInputHandler = (nameInput: string) => {
    switch (nameInput) {
      case 'Ваше имя':
        return name;
      case 'Достоинства':
        return advantage;
      case 'Недостатки':
        return disadvantage;
    }
  };

  const setStateInputHandler = (nameInput: string, e: ChangeEvent<HTMLInputElement>) => {
    switch (nameInput) {
      case 'Ваше имя':
        return name.onChange(e);
      case 'Достоинства':
        return advantage.onChange(e);
      case 'Недостатки':
        return disadvantage.onChange(e);
    }
  };

  const removeAllFields = () => {
    name.clearInput();
    advantage.clearInput();
    disadvantage.clearInput();
    setReview('');
    setRating(0);
  }

  const renderStarsRating = () =>
    RatingStarCategories.map((categories, i) => (
      <Fragment key={categories}>
        <input className="visually-hidden" id={`star-${STARS_COUNT - i}`} name="rate" type="radio" defaultValue={STARS_COUNT - i} onChange={(e) => getRatingHandler(e)} />
        <label className="rate__label" htmlFor={`star-${STARS_COUNT - i}`} title={categories} />
      </Fragment>
    ));


  const isAllInputError = () => {
    advantage.setIsDerty(true);
    disadvantage.setIsDerty(true);
    name.setIsDerty(true);
    setReviewDurty(true);
    setRatingError(true);

    if (review.length < 5) {
      setReviewError(true);
    }
  };
  const postReviewHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating === 0 || name.value.trim() === '' || advantage.value.trim() === '' || disadvantage.value.trim() === '' || review.length === 0 ) {
      return isAllInputError();
    }
    const currentReview: sendRewiew = {
      cameraId: Number(id),
      rating: rating,
      userName: name.value,
      advantage: advantage.value,
      disadvantage: disadvantage.value,
      review: review,
    };


    dispatch(postReview(currentReview));
    dispatch(getReviews(Number(id)));
    setIsVisible('');
    removeAllFields();

  };


  const isValidOrNoHandler = (inputName: string) =>
    !getStateInputHandler(inputName)?.isDurty ? '' : getStateInputHandler(inputName)?.isValid && getStateInputHandler(inputName)?.isDurty ? 'is-valid' : 'is-invalid';


  const renderCustomInput = () =>
    ReviewCustomInputData.map(({ placeholder, labelSpan, errorMessage }) => (
      <div className={`custom-input form-review__item 
      ${isValidOrNoHandler(labelSpan)}`} key={labelSpan}
      >
        <label>
          <span className="custom-input__label">{labelSpan}
            <svg width={9} height={9} aria-hidden="true">
              <use xlinkHref="#icon-snowflake" />
            </svg>
          </span>
          <input type="text" name={labelSpan} placeholder={placeholder} value={getStateInputHandler(labelSpan)?.value}
            onChange={(e) => setStateInputHandler(labelSpan, e)} onBlur={(e) => getStateInputHandler(labelSpan)?.onBlur(e)}
          />
        </label>
        <p className="custom-input__error">{errorMessage}</p>
      </div>
    ));

  return (
    <div className={`modal ${isVisible}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={(e) => postReviewHandler(e)}>
              <div className="form-review__rate">
                <fieldset className={`rate form-review__item ${ratingError ? 'is-invalid' : ''}`}>
                  <legend className="rate__caption">Рейтинг
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group ">
                      {renderStarsRating()}
                    </div>
                    <div className="rate__progress"><span className="rate__stars">0</span> <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message ">Нужно оценить товар</p>
                </fieldset>
                {renderCustomInput()}
                <div className={`custom-textarea ${isValidReview()}`}>
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <textarea name="user-comment" minLength={5} placeholder="Поделитесь своим опытом покупки" defaultValue={review}
                      onChange={getReviewHandler} onBlur={(e) => onBlurisDurtyHandler(e)}
                    />
                  </label>
                  <div className="custom-textarea__error">Нужно добавить комментарий</div>
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit" >Отправить отзыв</button>
            </form>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => setIsVisible('') }>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>

  );
}


export default ReviewForm;
