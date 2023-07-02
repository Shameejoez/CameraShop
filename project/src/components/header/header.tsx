import { Outlet, Link } from 'react-router-dom';
import Footer from '../footer/footer';
import HeaderNavElement from './header-nav-element/header-nav-element';
import { AppRoutes, HeaderNames } from '../../consts';

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
          <div className="form-search">
            <form>
              <label>
                <svg className="form-search__icon" width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-lens" />
                </svg>
                <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" />
              </label>
              <ul className="form-search__select-list">
                <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 8i</li>
                <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 7i</li>
                <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 6i</li>
                <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 5i</li>
                <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 4i</li>
              </ul>
            </form>
            <button className="form-search__reset" type="reset">
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg><span className="visually-hidden">Сбросить поиск</span>
            </button>
          </div>
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
