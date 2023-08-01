import browserHistory from '../../browser-history';
import useFocusLockModal from '../../hooks/use-focus-lock/use-focus-lock-modal';
import { useRef } from 'react';
import useKeyDownEsc from '../../hooks/use-key-down-esc/use-key-down-esc';
import useOutsideClick from '../../hooks/use-out-side-click/use-out-side-click';

type BasketAddSuccessProps = {
    onClickSetBasketSucess: (isActive: string) => void;
    isActive: string;
}

function BasketAddSucess ({onClickSetBasketSucess, isActive}: BasketAddSuccessProps): JSX.Element {
  const refModal = useRef<HTMLDivElement | null>(null);

  useFocusLockModal({isVisible: isActive , ref: refModal});
  useKeyDownEsc({handler: onClickSetBasketSucess, isVisible: isActive});
  useOutsideClick({elementRef: refModal, handler: onClickSetBasketSucess });

  const redirectToBasket = () => {
    onClickSetBasketSucess('');
    browserHistory.push('/catalog/basket');
  };

  return (
    <div className={`modal ${isActive} modal--narrow`} style={isActive === 'is-active' ? {width: 'calc(100% - 16.8px)'} : undefined}>
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content" ref={refModal}>
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width={86} height={80} aria-hidden="true">
            <use xlinkHref="#icon-success" />
          </svg>
          <div className="modal__buttons"><button className="btn btn--transparent modal__btn" onClick={() =>onClickSetBasketSucess('')}>Продолжить покупки</button>
            <button className="btn btn--purple modal__btn modal__btn--fit-width" onClick={redirectToBasket}>Перейти в корзину</button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап">
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BasketAddSucess;
