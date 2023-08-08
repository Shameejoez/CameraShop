import { Link } from 'react-router-dom';
import { AppRoutes, RAITING_COUNT } from '../../consts';
import { CardProductInfo } from '../../types/types';
import StarsRating from '../stars-rating/stars-rating';
import { useAppSelector } from '../../hooks';
import { takeRatings } from '../../store/data-process/data-selectors';
import { takeMyCameras } from '../../store/basket-process/basket-selectors';

type CardProductProps = {
  camera: CardProductInfo;
  onClickGetCurrentCamera: (camera: CardProductInfo) => void;
  onClickSetAddBasket: (isActive: string) => void;
    // передается в случае карточики с похожими товарами
    onReviewsBack?: () => void;
}

function CardProduct ({camera, onReviewsBack = () => void 0, onClickGetCurrentCamera, onClickSetAddBasket}: CardProductProps):JSX.Element {
  const myCameras = useAppSelector(takeMyCameras);
  const addedCamera = myCameras.find((cam) => cam.name === camera.name);

  const onClickAddCamera = () => {
    onClickSetAddBasket('is-active');
    onClickGetCurrentCamera(camera);
  };

  const onInfoButtonClick = () => {
    onReviewsBack();
  };

  const { id, name, price, type, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount } = camera;

  const rating = useAppSelector(takeRatings).filter((el) => el.id === id )[0]?.currentRating;

  const renderStarsRating = () =>
    Array.from({length: RAITING_COUNT}, (_, i) =>
      <StarsRating key={i} isActive={ i + 1 <= Math.ceil(rating)}/>
    );

  const renderBuyButton = () =>
    addedCamera ?
      <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoutes.Basket}>
        <svg width={16} height={16} aria-hidden="true">
          <use xlinkHref="#icon-basket" />
        </svg>В корзине
      </Link> :
      <button
        className="btn btn--purple product-card__btn" type="button" onClick={onClickAddCamera}
      >Купить
      </button>;

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
        {
          renderBuyButton()
        }
        <Link className="btn btn--transparent" to={`/catalog/${AppRoutes.Product}/${id}#description`} onClick={onInfoButtonClick}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CardProduct;

