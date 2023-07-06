import { Link, useSearchParams, } from 'react-router-dom';
import {useEffect} from 'react';

type PaginationProps = {
  setActivePage: (page: number) => void;
  countPage: number;
  activePage: number;
}

function Pagination ({ setActivePage, countPage, activePage}: PaginationProps): JSX.Element {
  // число передающееся в Каталог - это индекс массива
  // activePage - это индекс массива


  const [ pageUrl, setPageUrl ] = useSearchParams();
  const pageParam = pageUrl.get('page');

  useEffect(() => {
    if (pageParam) {
      setActivePage(Number(pageParam) - 1);
    }
  }, [setActivePage, pageParam]);


  const onClickSetPageUrl = (idx: number) => {
    setPageUrl({page: String(idx + 1)});
  };


  const renderPaginationLi = () =>
    Array.from({length: countPage }, (_, i) =>
      (
        <li key={i + 1} className="pagination__item" onClick={()=> onClickSetPageUrl(i)} data-testid={`${i + 1}-pag-test`}>
          <Link className={`pagination__link pagination__link${activePage === i ? '--active' : ''}`} to="#" >
            { i + 1 }
          </Link>
        </li>
      ));

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          activePage > 0 &&
        <li className="pagination__item" onClick={()=> {
          onClickSetPageUrl(activePage - 1);}}
        >
          <Link className="pagination__link pagination__link" to="#">Назад</Link>
        </li>
        }
        { renderPaginationLi()}
        {
          activePage < 4 &&
      <li className="pagination__item" onClick={()=> {
        onClickSetPageUrl(activePage + 1);}}
      >
        <Link className="pagination__link pagination__link" to="#">Далее</Link>
      </li>
        }
      </ul>
    </div>
  );
}

export default Pagination;
