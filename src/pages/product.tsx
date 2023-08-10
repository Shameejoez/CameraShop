import Breadcrumb from '../components/breadcrumbs/breadcrumbs';
import { COUNT_SLIDER_VISIBLE_ELEMENT, LoadingStatus, RAITING_COUNT, SLIDER_STEP, START_SLIDER_POSITION, defaultCard } from '../consts';
import StarsRating from '../components/stars-rating/stars-rating';
import CardProduct from '../components/card-product/card-product';
import { useAppDispatch, useAppSelector } from '../hooks';
import { takeCamera, takeGetCameraStatus, takeReviews, takeSimilar } from '../store/data-process/data-selectors';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCamera, getReviews, getSimilarCameras, postReview } from '../store/action';
import ProductTabs from '../components/product-tabs/product-tabs';
import ReviewList from '../components/review/review-list/review-list';
import { CardProductInfo, sendRewiew } from '../types/types';
import ErrorConnectMessage from '../components/error-conntect-message/error-connect-message';
import ButtonScrollUp from '../components/button-scroll-up/button-scroll-up';
import Spinner from '../components/spinner/spinner';
import BasketAddItem from '../components/basket-popups/basket-add-delete-item/basket-add-delete-item';
import BasketAddSucess from '../components/basket-popups/basket-add-sccess/basket-add-sucess';

type ProductProps = {
  isActiveSuccessBasket: string;
  isActiveAddBasket: string;
  onClickSetBasketAdd: (isActive: string) => void;
  onClickBasketSucess: (isActive: string) => void;
}


function Product({isActiveAddBasket, isActiveSuccessBasket, onClickBasketSucess, onClickSetBasketAdd}: ProductProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentProduct = useAppSelector(takeCamera);
  const similarProducts = useAppSelector(takeSimilar);
  const reviews = useAppSelector(takeReviews);
  const FIRST_REVIEWS_PATH = 1;
  const [visibleArrayPathReviews, setVisibleArrayPathReviews] = useState(FIRST_REVIEWS_PATH);
  const getCameraStatus = useAppSelector(takeGetCameraStatus);
  const [curentCamera, setCurrentCamera] = useState<CardProductInfo>(defaultCard);

  const getCurrentCamera = (camera: CardProductInfo) => {
    onClickSetBasketAdd('is-active');
    setCurrentCamera(camera);
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    if (id) {
      const parseId = Number(id);
      dispatch(getCamera(parseId));
      dispatch(getSimilarCameras(parseId));
      dispatch(getReviews(parseId));
      window.scrollTo(0,0);
    }

  }, [dispatch, id]);

  const onScrollUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  };

  const onSubmitPostReview = (review: sendRewiew) => {
    dispatch(postReview(review));
  };


  const onLoadMoreReview = (numberPath: number) => {
    setVisibleArrayPathReviews((prev) => prev + numberPath );
  };

  const onClickVisibleArrayPathReviewsBack = () => {
    setVisibleArrayPathReviews(1);
  };

  const [sliderPosition, setSliderPosition] = useState(START_SLIDER_POSITION);
  const MAX_SLIDER_WIDTH = -Math.ceil(similarProducts.length / COUNT_SLIDER_VISIBLE_ELEMENT) * SLIDER_STEP + SLIDER_STEP;

  const onNextSliderPosition = () => {
    setSliderPosition((prev) => prev - SLIDER_STEP);
  };

  const onPrevSliderPosition = () => {
    setSliderPosition((prev) => prev + SLIDER_STEP);
  };

  if ( loading || getCameraStatus === LoadingStatus.Pending) {
    return <Spinner/>;
  }

  if (!currentProduct) {
    return <ErrorConnectMessage isVisible={getCameraStatus === LoadingStatus.Rejected ? 'is-active' : ''}/>;
  }

  const { category, description, level, name, previewImg,
    previewImg2x, previewImgWebp, previewImgWebp2x, price, reviewCount, type, vendorCode } = currentProduct;

  const productTabsData = {
    description: description,
    level: level,
    type: type,
    category: category,
    vendorCode: vendorCode
  };

  const renderStarsRating = () =>
    Array.from({ length: RAITING_COUNT }, (_, i) =>
      <StarsRating key={i} isActive={i + 1 <= 3} />
    );

  return (
    <>
      <main style={{overflow: 'hidden' }} data-testid={'productid-test'}>
        <div className="page-content">
          <Breadcrumb name={name} id={id}/>
          <div className="page-content__section" >
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`} />
                    <img src={`/${previewImg}`} srcSet={`/${previewImg2x}`} width={560} height={480} alt={`${category} ${name}`} />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3" >{name}</h1>
                  <div className="rate product__rate">
                    {renderStarsRating()}
                    <p className="visually-hidden">Рейтинг: {''}</p>
                    <p className="rate__count"><span className="visually-hidden" >Всего оценок:</span>{reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-Ru')} ₽</p>
                  <button className="btn btn--purple" type="button" name='add-to-basket' data-testid={'main-add-product-test'} onClick={()=> getCurrentCamera(currentProduct)}>
                    <svg width={24} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-add-basket" />
                    </svg>Добавить в корзину
                  </button>
                  <ProductTabs characteristics={productTabsData} />
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <section className="product-similar" >
              <div className="container">
                <h2 className="title title--h3">Похожие товары</h2>
                <div className="product-similar__slider">
                  <div className='product-similar__slider-list-box'>
                    <div className="product-similar__slider-list" style={{ left: sliderPosition }} >
                      {/* Похожие товары */}
                      {
                        similarProducts.map((camera) => (
                          <CardProduct camera={camera} key={camera.id} onReviewsBack={onClickVisibleArrayPathReviewsBack} onClickGetCurrentCamera={getCurrentCamera}
                            onClickSetAddBasket={onClickSetBasketAdd}
                          />))
                      }
                    </div>
                  </div>
                  <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled={sliderPosition === 0}
                    onClick={onPrevSliderPosition}
                  >
                    <svg width={7} height={12} aria-hidden="true">
                      <use xlinkHref="#icon-arrow" />
                    </svg>
                  </button>
                  <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" disabled={sliderPosition === MAX_SLIDER_WIDTH}
                    onClick={onNextSliderPosition}
                  >
                    <svg width={7} height={12} aria-hidden="true">
                      <use xlinkHref="#icon-arrow" />
                    </svg>
                  </button>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            {/* Отзывы */}
            <ReviewList dataReviews={reviews} onClick={onLoadMoreReview} visibleArrayPath={visibleArrayPathReviews} onSubmit={onSubmitPostReview} />
          </div>
        </div>
        <ErrorConnectMessage isVisible={getCameraStatus === LoadingStatus.Rejected ? 'is-active' : ''}/>
      </main>
      <ButtonScrollUp onScrollUp={onScrollUp}/>
      <BasketAddItem camera={curentCamera} isActive={isActiveAddBasket} onClickSetBasketAdd={onClickSetBasketAdd} onClickBasketSucess={onClickBasketSucess}/>
      <BasketAddSucess onClickSetBasketSucess={onClickBasketSucess} isActive={isActiveSuccessBasket}/>
    </>
  );
}

export default Product;
