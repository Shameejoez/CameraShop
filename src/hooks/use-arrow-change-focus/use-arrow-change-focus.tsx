import { MutableRefObject, useEffect, useState } from 'react';

type arrowChangeFocusProps = {
    ref: MutableRefObject<HTMLDivElement | null>;
    inputValue: string;
}

const useArrowChangeFocus = ({ ref, inputValue }: arrowChangeFocusProps) => {
  const [isFocus, setFocus] = useState<boolean>(false);
  const [elementFocus, setElementFocus] = useState<number>(0);

  useEffect(() => {
    if (inputValue.length === 0) {
      setElementFocus(0);
    }

    const focusElements = ref.current?.querySelectorAll('a, input') as (NodeListOf<HTMLElement>);
    const firstElement = focusElements[0];

    const onDownArrowShift = (e: KeyboardEvent) => {
      if (!isFocus) {
        return;
      }
      if (e.key !== 'ArrowDown') {
        return;
      }
      e.preventDefault();

      if (document.activeElement === focusElements[focusElements.length - 1]) {
        setElementFocus(0);
        focusElements[0].focus();

      } else {
        setElementFocus((prev) => prev + 1);
        focusElements[elementFocus + 1].focus();

      }
    };

    const onUpArrowShift = (e: KeyboardEvent) => {
      if (!isFocus) {
        return;
      }

      if (e.key !== 'ArrowUp') {
        return;
      }
      e.preventDefault();

      if (document.activeElement === focusElements[0]) {
        setElementFocus(focusElements.length - 1);
        focusElements[focusElements.length - 1].focus();
      } else {
        setElementFocus((prev) => prev - 1);
        focusElements[elementFocus - 1 ].focus();
      }

    };


    const onKeyDownSetFocus = (e: KeyboardEvent ) => {

      if(e.key === 'Enter' && e.target === firstElement) {
        e.preventDefault();
      }

      if (e.target === firstElement || document.activeElement === firstElement) {
        setElementFocus(0);
        setFocus(true);
      }
    };

    const onClickSetFocus = (e: MouseEvent ) => {
      if (e.target === firstElement || document.activeElement === firstElement) {
        setElementFocus(0);
        setFocus(true);

      } else {
        setFocus(false);
        setElementFocus(0);
      }
    };

    document.addEventListener('keydown', onKeyDownSetFocus);
    document.addEventListener('keydown', onUpArrowShift);
    document.addEventListener('click', onClickSetFocus);
    document.addEventListener('keydown', onDownArrowShift);

    return () => {

      document.removeEventListener('keydown', onKeyDownSetFocus);
      document.removeEventListener('keydown', onDownArrowShift);
      document.removeEventListener('click', onClickSetFocus);
      document.removeEventListener('keydown', onUpArrowShift);
    };
  }, [elementFocus, ref, isFocus, inputValue ]);

};


export default useArrowChangeFocus;
