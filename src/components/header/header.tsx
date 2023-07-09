import { Outlet, Link } from 'react-router-dom';
import Footer from '../footer/footer';
import HeaderNavElement from './header-nav-element/header-nav-element';
import { AppRoutes, HeaderNames } from '../../consts';
import SearchBar from './search-bar/search-bar';

function Header ():JSX.Element {
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
              {Object.values(HeaderNames).map((name) => <HeaderNavElement key={name} name={name}/> )}
            </ul>
          </nav>
          <SearchBar/>
          <Link className="header__basket-link" to="#">
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-basket" />
            </svg>
          </Link>
        </div>
      </header>
      <Outlet />
      <Footer />
    </div>

  );
}


export default Header;
