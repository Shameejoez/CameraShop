import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { takePromo } from '../../store/data-process/data-selector';
import { PromoProduct } from '../../types/types';
import { getPromo } from '../../store/action';
import { AppRoutes } from '../../consts';
import { Link } from 'react-router-dom';

function Banner (): JSX.Element | null {
  const promo = useAppSelector(takePromo);
  const dispatch = useAppDispatch();

  useEffect(() => {

    if (!promo) {

      dispatch(getPromo());
    }

  }, [dispatch, promo]);

  if (!promo) {
    return null;
  }

  const {previewImg, name, id, previewImg2x, previewImgWebp, previewImgWebp2x} = promo ;

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x}`} /><img src={previewImg} srcSet={previewImg2x} width={1280} height={280} alt="баннер" />
      </picture>
      <p className="banner__info"><span className="banner__message">Новинка!</span><span className="title title--h1">{name}</span><span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`${AppRoutes.Product}/${id}`}>Подробнее</Link>
      </p>
    </div>
  );
}


export default Banner;
