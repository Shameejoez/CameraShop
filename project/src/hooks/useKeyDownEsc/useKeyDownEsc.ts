import { useEffect } from 'react';


type useKeyDownEsckProps = {
    handler: (setVisible: string ) => void;
    isVisible: string;
};

function useKeyDownEsc ({ handler, isVisible}: useKeyDownEsckProps) {
  useEffect(() => {
    if(isVisible === '') {
      return;
    }
    const onKeyDownEsc = (e: KeyboardEvent) => {
      if(e.code !== 'Escape') {
        return;
      }
      if(e.code === 'Escape') {
        handler('');
      }
    };

    document.addEventListener('keydown', onKeyDownEsc);

    return () => {
      document.removeEventListener('keydown', onKeyDownEsc);
    };
  }, [isVisible, handler]);
}


export default useKeyDownEsc;
