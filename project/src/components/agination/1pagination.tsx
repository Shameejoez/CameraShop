import { Link, useSearchParams } from 'react-router-dom';

type PaginationProps = {
  setActivePage: (page: number) => void;
  countPage: number;
  activePage: number;
}

function Pagination ({ setActivePage, countPage, activePage}: PaginationProps): JSX.Element {
  // число передающееся в Каталог - это индекс массива
  // activePage - это индекс массива
  const intForPageCount = 1;

  const [ pageUrl, setPageUrl ] = useSearchParams();
  const pageParam = pageUrl.get('page');

  if (pageParam) {
    setActivePage(Number(pageParam) - 1);
  }

  const onClickSetPageUrl = (idx: number) => {
    setPageUrl({page: String(idx + intForPageCount)});
  };


  const renderPaginationLi = () =>
    Array.from({length: countPage }, (_, i) =>
      (
        <li key={i + 1} className="pagination__item" onClick={()=> onClickSetPageUrl(i)} data-testid={`${i + 1}-pag-test`}>
          <Link className={`pagination__link pagination__link${activePage + intForPageCount === i + intForPageCount ? '--active' : ''}`} to="#" >
            { i + intForPageCount }
          </Link>
        </li>
      ));

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          activePage > 0 &&
        <li className="pagination__item" onClick={()=> {
          countPage && onClickSetPageUrl(activePage - intForPageCount);}}
        >
          <Link className="pagination__link pagination__link" to="#">Назад</Link>
        </li>
        }
        { renderPaginationLi()}
        {
          activePage < 4 &&
      <li className="pagination__item" onClick={()=> {
        onClickSetPageUrl(activePage + intForPageCount);}}
      >
        <Link className="pagination__link pagination__link" to="#">Далее</Link>
      </li>
        }
      </ul>
    </div>
  );
}

export default Pagination;
