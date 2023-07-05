import { Link } from 'react-router-dom';
import { AppRoutes, RAITING_COUNT } from '../../consts';
import { CardProductInfo } from '../../types/types';
import StarsRating from '../stars-rating/stars-rating';

type CardProductProps = {
    data: CardProductInfo;
    // передается в случае карточики с похожими товарами
    onReviewsBack?: () => void;
}

function CardProduct ({data, onReviewsBack = () => void 0}: CardProductProps):JSX.Element {

  const { id, name, price, type, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount } = data;

  const rating = 3;

  const renderStarsRating = () =>
    Array.from({length: RAITING_COUNT}, (_, i) =>
      <StarsRating key={i} isActive={ i + 1 <= rating}/>
    );

  return (
    <div className="product-card" data-testid={'product-card-test'}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`}/><img src={`/${previewImg}`} srcSet={`/${previewImg2x}`} width={280} height={240} alt={`${type} «${name}»`} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {renderStarsRating()}
          <p className="visually-hidden">Рейтинг: 3</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-Ru')} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to={`/catalog/${AppRoutes.Product}/${id}#description`} onClick={onReviewsBack}>Подробнее
        </Link>
      </div>
    </div>
  );
}


export default CardProduct;
