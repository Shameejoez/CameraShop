/* eslint-disable no-nested-ternary */
import { RatingStarCategories, ReviewCustomInputData, ReviewSubmitStatus, STARS_COUNT } from '../../../consts';
import { ChangeEvent, FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import type { sendRewiew } from '../../../types/types';
import { useParams } from 'react-router-dom';
import useInput from '../../../hooks/use-input/use-input';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { takeReviewSubmitStatus } from '../../../store/data-process/data-selector';
import { setSubmitReviewStatus } from '../../../store/data-process/data-slicer';
import useOutsideClick from '../../../hooks/use-out-side-click/use-out-side-click';
import useKeyDownEsc from '../../../hooks/use-key-down-esc/use-key-down-esc';

type ReviewFormProps = {
  isVisible: string;
  setIsVisible: (mode: string) => void;
  onSubmit: (review: sendRewiew) => void;
  setIsVisibleSuccess: (mode: string) => void;
}

function ReviewForm ({ isVisible, setIsVisible, onSubmit, setIsVisibleSuccess }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const reviewFormRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams();
  const submitReviewStatus = useAppSelector(takeReviewSubmitStatus);
  const advantage = useInput('');
  const disadvantage = useInput('');
  const name = useInput('');
  const [review, setReview] = useState<string>('');
  const [reviewDurty, setReviewDurty] = useState(false);
  const [reviewError, setReviewError] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [ratingError, setRatingError] = useState(false);


  useOutsideClick({elementRef: reviewFormRef, handler: setIsVisible, isVisible});
  useKeyDownEsc({handler: setIsVisible, isVisible});

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
        return name.onChange(e.target.value);
      case 'Достоинства':
        return advantage.onChange(e.target.value);
      case 'Недостатки':
        return disadvantage.onChange(e.target.value);
    }
  };

  const removeAllFields = () => {
    setReview('');
    name.clearInput();
    advantage.clearInput();
    disadvantage.clearInput();
    setRating(0);
    removeValidToDefult();
  };

  const renderStarsRating = () =>
    RatingStarCategories.map((categories, i) => (
      <Fragment key={categories}>
        <input className="visually-hidden" id={`star-${STARS_COUNT - i}`} name="rate" type="radio" value={STARS_COUNT - i} checked={STARS_COUNT - i === rating} onChange={(e) => getRatingHandler(e)}/>
        <label className="rate__label" htmlFor={`star-${STARS_COUNT - i}`} title={categories} />
      </Fragment>
    ));


  // включить состояние ошибки во всех полях
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

  // привести инпуты в дефолтное состояние

  const removeValidToDefult = () => {
    advantage.setIsDerty(false);
    disadvantage.setIsDerty(false);
    name.setIsDerty(false);
    setReviewDurty(false);
    setRatingError(false);
    setReviewError(false);

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

    onSubmit(currentReview);

  };

  useEffect(() => {
    if (submitReviewStatus === ReviewSubmitStatus.Fullfield) {
      setIsVisible('');
      removeAllFields();
      setIsVisibleSuccess('is-active');
      dispatch(setSubmitReviewStatus(ReviewSubmitStatus.Unknown));// возвращает статус unknown
    }
  });

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
            onChange={(e) => setStateInputHandler(labelSpan, e)} onBlur={(e) => getStateInputHandler(labelSpan)?.onBlur(e.target.value)}
          />
        </label>
        <p className="custom-input__error">{errorMessage}</p>
      </div>
    ));

  return (
    <div className={`modal ${isVisible}`} data-testid="review-form-test">
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content" ref={isVisible === 'is-active' ? reviewFormRef : null}>
          <p className="title title--h4" >Оставить отзыв</p>
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
                    <textarea name="user-comment" minLength={5} placeholder="Поделитесь своим опытом покупки" value={review}
                      onChange={getReviewHandler} onBlur={(e) => onBlurisDurtyHandler(e)}
                    />
                  </label>
                  <div className="custom-textarea__error">Нужно добавить комментарий</div>
                </div>
              </div>
              <div style={{color: 'red', textAlign: 'center'}}>{submitReviewStatus === ReviewSubmitStatus.Rejected && 'Ошибка. Сервер не отвечает.'} </div>
              <button className="btn btn--purple form-review__btn" type="submit" disabled={submitReviewStatus === ReviewSubmitStatus.Pending} >Отправить отзыв</button>
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
