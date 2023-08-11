import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { takePromo } from '../../store/data-process/data-selectors';
import { getPromo } from '../../store/action';
import { AppRoutes } from '../../consts';
import { Link } from 'react-router-dom';

function Banner (): JSX.Element | null {
  const promo = useAppSelector(takePromo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPromo());

  }, []);

  if (!promo) {
    return null;
  }

  const {previewImg, name, id, previewImg2x, previewImgWebp, previewImgWebp2x} = promo ;

  return (
    <div className="banner" data-testid={'banner-test'}>
      <picture>
        <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x}`} /><img src={previewImg} srcSet={previewImg2x} width={1280} height={280} alt="баннер" />
      </picture>
      <p className="banner__info"><span className="banner__message">Новинка!</span><span className="title title--h1">{name}</span><span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" data-testid={'promo-link'} to={`${AppRoutes.Product}/${id}#description`} >Подробнее</Link>
      </p>
    </div>
  );
}


export default Banner;
