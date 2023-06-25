import { RefObject, useEffect } from 'react';


type outsideClickProps = {
    elementRef: RefObject<HTMLElement | null>;
    handler: (setVisible: string ) => void;
    isVisible?: string;
}


function useOutsideClick ({elementRef, handler, isVisible}: outsideClickProps) {

  useEffect(() => {
    if (isVisible === '') {
      return;
    }

    const handleClick = (e: Event) => {
      if (!elementRef.current) {
        return;
      }
      if (!elementRef.current.contains(e.target as HTMLElement)) {
        handler('');
      }
    };

    document.addEventListener('mouseup', handleClick);

    return () => {
      document.removeEventListener('mouseup', handleClick);
    };

  }, [elementRef,isVisible, handler]);
}


export default useOutsideClick;
