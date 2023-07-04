import { SocialIcons, FooterNavLiElements } from '../../consts';

function Footer (): JSX.Element {

  const renderSocialLi = () =>

    SocialIcons.map(({name, icon}) => (
      <li className="social__item" key={name}>
        <a className="link" href="#" aria-label={`Переход на страницу ${name}`} >
          <svg width={20} height={20} aria-hidden="true">
            <use xlinkHref={icon} />
          </svg>
        </a>
      </li>)
    );

  const renderNavLi = () =>
    FooterNavLiElements.map(({name, elements}) =>
      (
        <li className="footer__nav-item" key={name}>
          <p className="footer__title">{name}</p>
          <ul className="footer__list">
            {elements.map((element) => (
              <li className="footer__item" key={element}>
                <a className="link" href="#">{element}
                </a>
              </li>
            )) }
          </ul>
        </li>
      ));

  return (
    <footer className="footer" data-testid={'footer-test'}>
      <div className="container">
        <div className="footer__info">
          <a className="footer__logo" href="index.html" aria-label="Переход на главную">
            <svg width={100} height={36} aria-hidden="true">
              <use xlinkHref="#icon-logo-mono" />
            </svg>
          </a>
          <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
          <ul className="social">
            {renderSocialLi()}
          </ul>
        </div>
        <ul className="footer__nav">
          {renderNavLi()}
        </ul>
      </div>
    </footer>
  );
}


export default Footer;
