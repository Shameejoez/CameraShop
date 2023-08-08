import useFocusLockModal from '../../hooks/use-focus-lock/use-focus-lock-modal';
import { useRef } from 'react';
import useKeyDownEsc from '../../hooks/use-key-down-esc/use-key-down-esc';
import useOutsideClick from '../../hooks/use-out-side-click/use-out-side-click';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { takeMyCameras, takeOrderStatus } from '../../store/basket-process/basket-selectors';
import { LoadingStatus } from '../../consts';

type BasketAddSuccessProps = {
    onClickSetBasketSucess: (isActive: string) => void;
    isActive: string;
    place?: string;
}

function BasketAddSucess ({onClickSetBasketSucess, isActive, place}: BasketAddSuccessProps): JSX.Element {
  const refModal = useRef<HTMLDivElement | null>(null);
  const orderStatus = useAppSelector(takeOrderStatus);
  useFocusLockModal({isVisible: isActive , ref: refModal});
  useKeyDownEsc({handler: onClickSetBasketSucess, isVisible: isActive});
  useOutsideClick({elementRef: refModal, handler: onClickSetBasketSucess });
  const myCameras = useAppSelector(takeMyCameras);

  const onClickSetVisibleBasketSuccess = (mode: string) => {
    onClickSetBasketSucess(mode);
  };

  return (
    <div className={`modal ${isActive} modal--narrow`} style={{width: 'calc(100% - 16.8px)'}}>
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content" ref={refModal}>
          {
            place === 'basket' ?
              <>
                <p className="title title--h4">{
                  // eslint-disable-next-line no-nested-ternary
                  orderStatus === LoadingStatus.Rejected ? 'Добавьте товар в корзину' :
                    myCameras.length > 0 /* && orderStatus === LoadingStatus.Rejected */ ? 'Ошибка сервера, попробуйте позднее' :
                      'Спасибо за покупку'
                }
                </p>
                { orderStatus === LoadingStatus.Rejected ?
                  <svg className="modal__icon" aria-hidden="true" viewBox='0 0 32 32'>
                    <use xlinkHref="#Incorrect_Symbol_1_"/>
                  </svg>
                  :
                  <svg className="modal__icon" width="80" height="78" aria-hidden="true">
                    <use xlinkHref="#icon-review-success"></use>
                  </svg>}
                <div className="modal__buttons">
                  { orderStatus === LoadingStatus.Rejected ?
                    <Link to="#" className="btn btn--purple modal__btn modal__btn--width-width" onClick={() =>onClickSetBasketSucess('')}>Закрыть</Link>
                    :
                    <Link to="/catalog" className="btn btn--purple modal__btn modal__btn--width-width" onClick={() =>onClickSetVisibleBasketSuccess('')}>Продолжить покупки</Link>}
                </div>
              </>
              :
              <>
                <p className="title title--h4">Товар успешно добавлен в корзину</p>
                <svg className="modal__icon" width={86} height={80} aria-hidden="true">
                  <use xlinkHref="#icon-success" />
                </svg>
                <div className="modal__buttons">
                  <Link to="/catalog" className="btn btn--transparent modal__btn" onClick={() =>onClickSetVisibleBasketSuccess('')}>Продолжить покупки</Link>
                  <Link to={'/catalog/basket'} className="btn btn--purple modal__btn modal__btn--fit-width" onClick={() => onClickSetVisibleBasketSuccess('')}>Перейти в корзину</Link>
                </div>
              </>
          }
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => onClickSetVisibleBasketSuccess('')}>
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

export default BasketAddSucess;

