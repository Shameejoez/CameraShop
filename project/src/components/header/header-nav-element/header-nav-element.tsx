import { HeaderNames } from '../../../consts';

type HeaderNavElementProps = {
    name: HeaderNames;
}

function HeaderNavElement ({name}: HeaderNavElementProps): JSX.Element {
  return (
    <li className="main-nav__item"><a className="main-nav__link" href="#">{name}</a>
    </li>
  );
}


export default HeaderNavElement;
