import useFocusLockModal from '../../../hooks/use-focus-lock/use-focus-lock-modal';
import { useRef } from 'react';
import useKeyDownEsc from '../../../hooks/use-key-down-esc/use-key-down-esc';
import useOutsideClick from '../../../hooks/use-out-side-click/use-out-side-click';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { takeMyCameras } from '../../../store/basket-process/basket-selectors';

type BasketAddSuccessProps = {
    onClickSetBasketError: (isActive: string) => void;
    isActive: string;
}

function BasketError ({onClickSetBasketError, isActive}: BasketAddSuccessProps): JSX.Element {

  const refModal = useRef<HTMLDivElement | null>(null);
  useFocusLockModal({isVisible: isActive , ref: refModal});
  useKeyDownEsc({handler: onClickSetBasketError, isVisible: isActive});
  useOutsideClick({elementRef: refModal, handler: onClickSetBasketError });
  const myCameras = useAppSelector(takeMyCameras);

  const onClickSetVisibleBaskekError = (mode: string) => {
    onClickSetBasketError(mode);
  };

  return (
    <div className={`modal ${isActive} modal--narrow`} style={{width: 'calc(100% - 16.8px)'}} data-testid={'popup-error-test'}>
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content" ref={refModal}>
          <p className="title title--h4">{
            myCameras.length === 0 ? 'Добавьте товар в корзину' : 'Ошибка сервера, попробуйте позднее'
          }
          </p>
          <svg className="modal__icon" aria-hidden="true" viewBox='0 0 32 32'>
            <use xlinkHref="#Incorrect_Symbol_1_"/>
          </svg>
          <div className="modal__buttons">
            <Link to="#" className="btn btn--purple modal__btn modal__btn--width-width" onClick={() =>onClickSetVisibleBaskekError('')}>Закрыть</Link>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => onClickSetVisibleBaskekError('')}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
        <div/>
      </div>
    </div>
  );
}


export default BasketError;
