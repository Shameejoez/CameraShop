/* eslint-disable no-nested-ternary */
import { LoadingStatus, RatingStarCategories, ReviewCustomInputData, STARS_COUNT } from '../../../consts';
import { ChangeEvent, FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import type { sendRewiew } from '../../../types/types';
import { useParams } from 'react-router-dom';
import useInput from '../../../hooks/use-input/use-input';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { takeReviewSubmitStatus } from '../../../store/data-process/data-selectors';
import { setSubmitReviewStatus } from '../../../store/data-process/data-slice';
import useOutsideClick from '../../../hooks/use-out-side-click/use-out-side-click';
import useKeyDownEsc from '../../../hooks/use-key-down-esc/use-key-down-esc';
import useFocusLockModal from '../../../hooks/use-focus-lock/use-focus-lock-modal';

type ReviewFormProps = {
  isVisible: string;
  setIsVisible: (mode: string) => void;
  onSubmit: (review: sendRewiew) => void;
  setIsVisibleSuccess: (mode: string) => void;
}

function ReviewForm ({ isVisible, setIsVisible, onSubmit, setIsVisibleSuccess, }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const reviewFormRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams();
  const submitReviewStatus = useAppSelector(takeReviewSubmitStatus);
  const advantage = useInput('');
  const disadvantage = useInput('');
  const name = useInput('');
  const [review, setReview] = useState<string>('');
  const [reviewDirty, setReviewDirty] = useState(false);
  const [reviewError, setReviewError] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [ratingError, setRatingError] = useState(false);
  const [ratingDirty, setRatingDirty] = useState(false);


  useOutsideClick({elementRef: reviewFormRef, handler: setIsVisible, isVisible});
  useKeyDownEsc({handler: setIsVisible, isVisible});
  useFocusLockModal({ref: reviewFormRef, isVisible});


  const onBlurDirtyRating = () => {
    setRatingDirty(true);
    chekValidRating(rating); // чтобы выдать ошибку нужны оба параметра( ratingError и ratingDirty)

  };

  const textAreaBlurHandler = ( e: React.FocusEvent<HTMLTextAreaElement>) => {
    setReviewDirty(true);
    textareaChanheHandler(e);
  };

  const textareaChanheHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
    !reviewDirty ? '' : reviewDirty && reviewError ? 'is-invalid' : 'is-valid';


  const onChangeRating = (e: ChangeEvent<HTMLInputElement>) => {
    const currentRating = Number(e.target.value);
    setRating(currentRating);
    chekValidRating(currentRating);
  };

  const chekValidRating = (value: number) =>
    value === 0 ? setRatingError(true) : setRatingError(false);


  const getStateInput = (nameInput: string) => {
    switch (nameInput) {
      case 'Ваше имя':
        return name;
      case 'Достоинства':
        return advantage;
      case 'Недостатки':
        return disadvantage;
    }
  };

  const onChangeInput = (nameInput: string, e: ChangeEvent<HTMLInputElement>) => {
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
        <input className="visually-hidden" id={`star-${STARS_COUNT - i}`} name="rate" type="radio" value={STARS_COUNT - i} checked={STARS_COUNT - i === rating} onChange={onChangeRating}
          onBlur={onBlurDirtyRating}
        />
        <label className="rate__label" htmlFor={`star-${STARS_COUNT - i}`} title={categories} />
      </Fragment>
    ));


  // включить состояние ошибки во всех полях
  const isAllInputError = () => {
    advantage.setIsDerty(true);
    disadvantage.setIsDerty(true);
    name.setIsDerty(true);
    setReviewDirty(true);
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
    setReviewDirty(false);
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
    if (submitReviewStatus === LoadingStatus.Fullfield) {
      setIsVisible('');
      removeAllFields();
      setIsVisibleSuccess('is-active');
      dispatch(setSubmitReviewStatus(LoadingStatus.Unknown));// возвращает статус unknown
    }
  });

  const isValidOrNo = (inputName: string) =>
    !getStateInput(inputName)?.isDirty ? '' : getStateInput(inputName)?.isValid && getStateInput(inputName)?.isDirty ? 'is-valid' : 'is-invalid';

  const renderCustomInput = () =>
    ReviewCustomInputData.map(({ placeholder, labelSpan, errorMessage }) => (
      <div className={`custom-input form-review__item 
      ${isValidOrNo(labelSpan)}`} key={labelSpan}
      >
        <label>
          <span className="custom-input__label">{labelSpan}
            <svg width={9} height={9} aria-hidden="true">
              <use xlinkHref="#icon-snowflake" />
            </svg>
          </span>
          <input type="text" name={labelSpan} placeholder={placeholder} value={getStateInput(labelSpan)?.value}
            onChange={(e) => onChangeInput(labelSpan, e)} onBlur={(e) => getStateInput(labelSpan)?.onBlur(e.target.value)}
          />
        </label>
        <p className="custom-input__error">{errorMessage}</p>
      </div>
    ));

  return (
    <div className={`modal ${isVisible}`} data-testid="review-form-test" style={isVisible === 'is-active' ? {width: 'calc(100% - 16.8px)'} : undefined}>
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content" ref={reviewFormRef} >
          <p className="title title--h4" >Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={(e) => postReviewHandler(e)}>
              <div className="form-review__rate">
                <fieldset className={`rate form-review__item ${ratingError && ratingDirty ? 'is-invalid' : ''}`}>
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
                      onChange={textareaChanheHandler} onBlur={textAreaBlurHandler}
                    />
                  </label>
                  <div className="custom-textarea__error">{review.length >= 1 ? 'Хотя бы 5 символов' : 'Нужно добавить комментарий'}</div>
                </div>
              </div>
              <div style={{color: 'red', textAlign: 'center'}}>{submitReviewStatus === LoadingStatus.Rejected && 'Ошибка. Сервер не отвечает.'} </div>
              <button id="button-post" className="btn btn--purple form-review__btn" type="submit" disabled={submitReviewStatus === LoadingStatus.Pending} >Отправить отзыв
              </button>
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
