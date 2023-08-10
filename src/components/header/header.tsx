import { Outlet, Link, useLocation } from 'react-router-dom';
import Footer from '../footer/footer';
import HeaderNavElement from './header-nav-element/header-nav-element';
import { AppRoutes, HeaderNames } from '../../consts';
import SearchBar from './search-bar/search-bar';
import { takeMyCameras } from '../../store/basket-process/basket-selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { deleteAllFilters } from '../../store/filter-process/filter-slice';

function Header ():JSX.Element {
  const camerasCount = useAppSelector(takeMyCameras).map((el) => el.count);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(deleteAllFilters());

  }, [location]);

  const renderTotalCount = () => {
    if (camerasCount.length > 0) {
      return camerasCount.reduce((sum, count) => (sum as number) + (count as number));
    } else {
      return 0;
    }
  };

  return (
    <div className="wrapper" data-testid={'header-test'}>
      <header className="header" id="header">
        <div className="container">
          <a className="header__logo" href={`/${AppRoutes.Catalog}`} aria-label="Переход на главную">
            <svg width={100} height={36} aria-hidden="true">
              <use xlinkHref="#icon-logo" />
            </svg>
          </a>
          <nav className="main-nav header__main-nav">
            <ul className="main-nav__list">
              {Object.values(HeaderNames).map((name) => <HeaderNavElement key={name} name={name}/>)}
            </ul>
          </nav>
          <SearchBar/>
          <Link className="header__basket-link" to={`/${AppRoutes.Basket}`}>
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-basket" />
            </svg>
            {
             renderTotalCount() as number > 0 &&
              <span className="header__basket-count">{renderTotalCount()}</span>
            }
          </Link>
        </div>
      </header>
      <Outlet />
      <Footer />
    </div>
  );
}


export default Header;
