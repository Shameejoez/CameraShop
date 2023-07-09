import { useAppSelector } from '../../../hooks';
import { takeCameras } from '../../../store/data-process/data-selectors';
import { useState, ChangeEvent } from 'react';
import browserHistory from '../../../browser-history';

function SearchBar (): JSX.Element {
  const productNames = useAppSelector(takeCameras).map((el) => ({id:el.id ,name:el.name}));
  const [inputValue, setInputValue] = useState<string>('');

  const onChangeSetInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

  };

  const searchProducts = productNames.filter((el) => el.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()));

  const onClickRedirectProduct = (id: number) => {
    window.blur();
    setInputValue('');
    browserHistory.push(`/catalog/product/${id}#description`);
  };


  const renderSearchItem = () => {
    if ( searchProducts.length === 0 ) {
      return <li className="form-search__select-item" tabIndex={0} >Не найдено</li>;
    }
    if (searchProducts.length > 0) {
      return searchProducts.map((el) => <li key={el.name} className="form-search__select-item" tabIndex={0} onClick={() => onClickRedirectProduct(el.id)}>{el.name}</li>);
    }
  };

  return (
    <div className="form-search">
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
      <button className="form-search__reset" type="reset">
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default SearchBar;
