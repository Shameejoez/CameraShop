import { Link } from 'react-router-dom';

type PaginationProps = {
  setActivePage: (page: number) => void;
  countPage: number;
  activePage: number;
}

function Pagination ({ setActivePage, countPage, activePage}: PaginationProps): JSX.Element {
  // число передающееся в Каталог - это индекс массива
  // activePage - это индекс массива
  const intForPageCount = 1;

  const renderPaginationLi = () =>
    Array.from({length: countPage }, (_, i) =>
      (
        <li key={i + 1} className="pagination__item" onClick={()=> { setActivePage(i);}}>

          <Link className={`pagination__link pagination__link${activePage + intForPageCount === i + intForPageCount ? '--active' : ''}`} to="#">{ i + intForPageCount }</Link>

        </li>
      ));

  return (
    <div className="pagination">
      <ul className="pagination__list">{ activePage > 0 &&
        <li className="pagination__item" onClick={()=> {
          countPage && setActivePage(activePage - intForPageCount);}}
        >
          <Link className="pagination__link pagination__link" to="#">Назад</Link>
        </li>}
      { renderPaginationLi()}
      { activePage < 4 &&
      <li className="pagination__item" onClick={()=> {
        setActivePage(activePage + intForPageCount);}}
      >
        <Link className="pagination__link pagination__link" to="#">Далее</Link>

      </li>}
      </ul>
    </div>
  );
}

export default Pagination;
