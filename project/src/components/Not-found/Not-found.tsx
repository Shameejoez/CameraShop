import { Link } from 'react-router-dom';
import '../Not-found/Not-found.css';
import { AppRoutes } from '../../consts';

function NotFound (): JSX.Element {
  return (
    <div className="not-found__container">
      <title className="not-found__message"><p>404: <br/>Страница<br/>не<br/>найдена</p></title>

      <Link className="not-found__button" to={AppRoutes.Catalog}> Страница каталога</Link>
    </div>
  );
}


export default NotFound;
