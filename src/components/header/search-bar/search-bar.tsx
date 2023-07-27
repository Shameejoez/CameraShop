import { useAppSelector } from '../../../hooks';
import { takeCameras } from '../../../store/data-process/data-selectors';
import { useState, ChangeEvent, useRef, useEffect } from 'react';
import browserHistory from '../../../browser-history';
import useArrowChangeFocus from '../../../hooks/use-arrow-change-focus/use-arrow-change-focus';

function SearchBar (): JSX.Element {
  const productNames = useAppSelector(takeCameras).map((el) => ({id:el.id ,name:el.name}));
  const [inputValue, setInputValue] = useState<string>('');
  const barRef = useRef<HTMLDivElement | null>(null);
  const [xx, xxxx] = useState<number | null>(null);
  const focusedEllement = productNames.filter((el) => el.name === document.activeElement?.textContent);

  useEffect(() => {
    if (document.activeElement?.textContent !== focusedEllement[0]?.name) {
      return;
    }
    xxxx(focusedEllement[0].id);
    document.addEventListener('keydown', onKeyDownEnterRedirectProduct);

    return () => document.removeEventListener('keydown', onKeyDownEnterRedirectProduct);
  }, [focusedEllement]);


  useArrowChangeFocus({ref: barRef, inputValue: inputValue});

  const onClickClearInput = () => {
    setInputValue('');
  };


  const onChangeSetInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

  };

  const searchProducts = productNames.filter((el) => el.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()));

  const onKeyDownEnterRedirectProduct = (e: KeyboardEvent) => {

    if(e.code === 'Enter' && xx) {

      setInputValue('');
      browserHistory.push(`/catalog/product/${xx}#description`);
    }
    xxxx(null);
    window.blur();
  };

  const onClickRedirectProduct = (id: number) => {
    window.blur();
    setInputValue('');
    browserHistory.push(`/catalog/product/${id}#description`);
  };


  const renderSearchItem = () => {
    if ( searchProducts.length === 0 ) {
      return <li className="form-search__select-item" data-testid={'no-similar'} tabIndex={0} >Не найдено</li>;
    }
    if (searchProducts.length > 0) {
      return searchProducts.map((el) =>(
        <li key={el.name} className="form-search__select-item" data-testid={el.id}
          tabIndex={0} onClick={() => onClickRedirectProduct(el.id)}
        >{el.name}
        </li>));
    }
  };

  return (
    <div className="form-search" ref={barRef}>
      <form>
        <label>
          <svg className="form-search__icon" width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-lens" />
          </svg>
          <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" onChange={onChangeSetInputValue} value={inputValue}
            data-testid={'search-bar-test'}
          />
        </label>
        <ul className="form-search__select-list scroller" style={inputValue.length > 0 ? {visibility: 'visible'} : {visibility: 'hidden'}}>
          {renderSearchItem()}
        </ul>
      </form>
      <button className="form-search__reset" type="reset" onClick={onClickClearInput} style={inputValue.length > 0 ? {visibility: 'visible'} : {visibility: 'hidden'}}>
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default SearchBar;
