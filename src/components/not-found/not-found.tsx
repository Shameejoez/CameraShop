import { Link } from 'react-router-dom';
import './not-found.css';
import { AppRoutes } from '../../consts';

function NotFound (): JSX.Element {
  return (
    <div className="not-found__container" data-testid="not-found-test">
      <title className="not-found__message"><p>404: <br/>Страница<br/>не<br/>найдена</p></title>

      <Link className="not-found__button" to={AppRoutes.Catalog}> Страница каталога</Link>
    </div>
  );
}


export default NotFound;
