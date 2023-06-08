import { Link } from 'react-router-dom';
import { AppRoutes, RAITING_COUNT } from '../../consts';
import { CardProductInfo } from '../../types/types';
import StarsRating from '../Stars-rating/Stars-rating';

type CardProductProps = {
    data: CardProductInfo;
    // передается в случае карточики с похожими товарами
    reviewsBack?: () => void;
}

function CardProduct ({data, reviewsBack = () => void 0}: CardProductProps):JSX.Element {

  const { id, name, price, type, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = data;

  const rating = 3;

  const renderStarsRating = () =>
    Array.from({length: RAITING_COUNT}, (_, i) =>
      <StarsRating key={i} count={ i + 1 <= rating ? 1 : 0 }/>
    );

  return (
    <div className="product-card" >
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`}/><img src={`/${previewImg}`} srcSet={`/${previewImg2x}`} width={280} height={240} alt={`${type} «${name}»`} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {renderStarsRating()}
          <p className="visually-hidden">Рейтинг: 3</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>23</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-Ru')} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to={`/catalog/${AppRoutes.Product}/${id}`} onClick={() => reviewsBack()}>Подробнее
        </Link>
      </div>
    </div>
  );
}


export default CardProduct;
