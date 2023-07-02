import { useRef } from 'react';
import useOutsideClick from '../../../hooks/use-out-side-click/use-out-side-click';
import useKeyDownEsc from '../../../hooks/use-key-down-esc/use-key-down-esc';
import useFocusLockModal from '../../../hooks/use-focus-lock/use-focus-lock-modal';

type sucsessPopupProps = {
  isVisible: string;
  setIsVisible: (mode: string) => void;
}

function ReviewSucsessPopup ({isVisible, setIsVisible}:sucsessPopupProps):JSX.Element {

  const modalSuccessRef = useRef<HTMLDivElement | null>(null);

  useKeyDownEsc({handler: setIsVisible, isVisible});
  useOutsideClick({elementRef: modalSuccessRef, handler:setIsVisible, isVisible});
  useFocusLockModal({ref: modalSuccessRef, isVisible});

  return (
    <div className={`modal ${isVisible} modal--narrow`} data-testid={'modal-success-test'} style={isVisible === 'is-active' ? {width: 'calc(100% - 18.8px)'} : undefined}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" ref={modalSuccessRef}>
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={() => setIsVisible('')}>Вернуться к покупкам
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => setIsVisible('')}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewSucsessPopup;
