import Breadcrumb from '../components/Breadcrumbs/Breadcrumbs';
import { COUNT_SLIDER_VISIBLE_ELEMENT, RAITING_COUNT, SLIDER_STEP, START_SLIDER_POSITION } from '../consts';
import StarsRating from '../components/Stars-rating/Stars-rating';
import CardProduct from '../components/Card-product/Card-product';
import { useAppDispatch, useAppSelector } from '../hooks';
import { takeCamera, takeReviews, takeSimilar } from '../store/data-process/data-selector';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCamera, getReviews, getSimilarCameras } from '../store/action';
import ProductTabs from '../components/ProductTabs/ProductTabs';
import ReviewList from '../components/Review/ReviewList';


function Product(): JSX.Element | null {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentProduct = useAppSelector(takeCamera);
  const similarProducts = useAppSelector(takeSimilar);
  const reviews = useAppSelector(takeReviews);
  const FIRST_REVIEWS_PATH = 1;
  const [visibleArrayPathReviews, setVisibleArrayPathReviews] = useState(FIRST_REVIEWS_PATH);

  const onChangevisibleArrayPathReviewsMore = (numberPath: number) => {
    setVisibleArrayPathReviews((prev) => prev + numberPath );
  };

  const onChangevisibleArrayPathReviewsRBack = () => {
    setVisibleArrayPathReviews(1);
  };

  useEffect(() => {
    if (id) {
      const parseId = Number(id);
      dispatch(getCamera(parseId));
      dispatch(getSimilarCameras(parseId));
      dispatch(getReviews(parseId));
    }

  }, [dispatch, id]);


  const [sliderPosition, setSliderPosition] = useState(START_SLIDER_POSITION);
  const MAX_SLIDER_WIDTH = -Math.ceil(similarProducts.length / COUNT_SLIDER_VISIBLE_ELEMENT) * SLIDER_STEP + SLIDER_STEP;

  const onNextSliderPosition = () => {
    setSliderPosition((prev) => prev - SLIDER_STEP);
  };

  const onPrevSliderPosition = () => {
    setSliderPosition((prev) => prev + SLIDER_STEP);
  };

  if (!currentProduct) {
    return null;
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

  // рейтинг заглушка
  const rating = 3;

  const renderStarsRating = () =>
    Array.from({ length: RAITING_COUNT }, (_, i) =>
      <StarsRating key={i} count={i + 1 <= rating ? 1 : 0} />
    );

  return (
    <main>
      <div className="page-content">
        <Breadcrumb name={name} id={id}/>
        <div className="page-content__section">
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
                  <p className="visually-hidden">Рейтинг: {rating}</p>
                  <p className="rate__count"><span className="visually-hidden" >Всего оценок:</span>{reviewCount}</p>
                </div>
                <p className="product__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-Ru')} ₽</p>
                <button className="btn btn--purple" type="button">
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
                      similarProducts.map((product) => (
                        <CardProduct data={product} key={product.id} reviewsBack={onChangevisibleArrayPathReviewsRBack} />))
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
          <ReviewList dataReviews={reviews} loadMoreReview={onChangevisibleArrayPathReviewsMore} visibleArrayPath={visibleArrayPathReviews} />
        </div>
      </div>
    </main>
  );
}


export default Product;