import { MutableRefObject } from 'react';
import { useEffect } from 'react';

type useFocusLockProps = {
  ref: MutableRefObject<HTMLDivElement | null>;
  isVisible: string;
}

const useFocusLockModal = ( {ref, isVisible}: useFocusLockProps) => {

  useEffect(() => {
    // отключаем скролл и отыгрываем его ширину, чтобы экран не дергался
    if(isVisible) {
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.width = 'calc(100% - 18.8px)';
    }
    else {
      document.documentElement.style.overflow = '';
      document.documentElement.style.width = '';
    }

    const focusableModalElements = ref.current?.querySelectorAll('a[href], button:not([disabled]), textarea, input, select');

    if (!focusableModalElements) {
      return;
    }

    const firstElement = focusableModalElements[0] as HTMLElement;
    const lastElement = focusableModalElements[focusableModalElements.length - 1] as HTMLElement;

    setTimeout(() => {
      firstElement.focus();
    }, 300);

    const onTabKyedown = (e: KeyboardEvent) => {

      if (isVisible === '') {
        return;
      }

      if( e.code !== 'Tab') {
        return;
      }
      if(!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        return e.preventDefault();
      }

      if ((e.shiftKey && document.activeElement === firstElement) || document.activeElement?.id === 'star-1') {
        lastElement.focus();
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', onTabKyedown);

    return () => document.removeEventListener('keydown', onTabKyedown);

  }, [ref, isVisible]);

};


export default useFocusLockModal;
