import { Link, useLocation } from 'react-router-dom';

type BreadcrumbProps = {
  name?: string;
  id?: string;
}

function Breadcrumb({ name, id}: BreadcrumbProps): JSX.Element {

  const translateRoute = (route: string) =>
    route.includes('catalog') ? 'Каталог' : route;

  const location = useLocation();

  let crumbLink = '';
  const allRoutes = location.pathname.split('/').filter((route) => route !== '' && route !== 'product');

  const crumbs = allRoutes.map((crumb, i) => {
    crumbLink += `/${crumb}`;
    return (
      <li className="breadcrumbs__item" key={crumb}>
        {
          crumb === id || i === allRoutes.length - 1 ? <span className="breadcrumbs__link breadcrumbs__link--active">{name || translateRoute(crumb)}</span> :

            <Link className="breadcrumbs__link" to={crumbLink}>{crumb === id ? name : translateRoute(crumb)}
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
        }
      </li>
    );
  }
  );

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={'/'}>Главная
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          {crumbs}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumb;
