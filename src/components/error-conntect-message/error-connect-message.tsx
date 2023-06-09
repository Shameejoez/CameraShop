import { useRef } from 'react';
import useFocusLockModal from '../../hooks/use-focus-lock/use-focus-lock-modal';

type ErrorConnectMessageProps = {
  isVisible: string;
}

function ErrorConnectMessage ({isVisible}: ErrorConnectMessageProps):JSX.Element {

  const modalRef = useRef<HTMLDivElement | null>(null);

  const refreshPageHandler = () => {
    window.location.reload();
  };

  useFocusLockModal({ref: modalRef, isVisible: isVisible});

  return (
    <div className={`modal modal--narrow ${isVisible}`} ref={modalRef} style={isVisible === 'is-active' ? {width: 'calc(100% - 18.8px)'} : undefined}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" >
          <p className="title title--h4" >Сервер не отвечает. Перезагрузите страницу или попробуйте позже</p>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
            <g><g><g><path d="M500.3,409.4c-10.8,0-18.2,7.2-18.2,18.2V609c0,10.8,7.2,18.2,18.2,18.2c11,0,18.2-7.2,18.2-18.2V427.6C518.3,416.6,511.1,409.4,500.3,409.4z"/><path d="M500.3,663.3c-10.8,0-18.2,7.2-18.2,18.2c0,11,7.2,18.2,18.2,18.2c11,0,18.2-7.2,18.2-18.2C518.5,670.5,511.1,663.3,500.3,663.3z"/><path d="M881.4,460c0-109-90.7-196.1-199.7-196.1c-39.9,0-72.5,10.8-105.3,29c-47.1-61.7-119.8-101.5-203.3-101.5C231.5,191.5,119,304,119,445.6c0,3.6,0,10.8,0,14.4c-65.3,29-109,90.7-109,167c0,101.5,79.9,181.5,181.5,181.5h617.1c101.5,0,181.5-79.9,181.5-181.5C990.4,550.8,946.7,489.1,881.4,460z M808.7,772.3H191.7c-79.9,0-145.2-65.3-145.2-145.2c0-68.9,47.3-127,112.6-141.6c-3.6-14.6-3.6-25.4-3.6-39.9c0-119.8,97.9-217.9,217.9-217.9c83.5,0,159.6,47.3,196.1,119.8c29-29,68.9-47.3,112.6-47.3c90.7,0,163.4,72.5,163.4,163.4c0,7.2,0,14.4,0,21.8c61.7,14.4,109,72.5,109,141.6C953.9,707,888.6,772.3,808.7,772.3z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={refreshPageHandler}>Перезагрузить страницу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorConnectMessage;
