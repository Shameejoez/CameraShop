import { Link } from 'react-router-dom';
import {useEffect} from 'react';
import useSearchParamsCustom from '../../hooks/use-search-params-custom/use-search-params-custom';

type PaginationProps = {
  setActivePage: (page: number) => void;
  countPage: number;
  activePage: number;
}

function Pagination ({ setActivePage, countPage, activePage}: PaginationProps): JSX.Element {
  // число передающееся в Каталог - это индекс массива
  // activePage - это индекс массива

  const setPageParams = useSearchParamsCustom({initialPage: 1});
  const page = setPageParams.page;


  useEffect(() => {
    if (page) {
      setActivePage(Number(page) - 1);
    }
  }, [page]);


  const onClickSetPageUrl = (idx: number) => {
    setPageParams.setPageParams(idx + 1);
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
