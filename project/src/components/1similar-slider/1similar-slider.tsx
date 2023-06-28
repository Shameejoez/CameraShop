import { CardProductInfo } from '../../types/types';
import CardProduct from '../1card-product/1card-product';

type SimilarSliderProps = {
    data: CardProductInfo[];
}

function SimilarSlider ({data}: SimilarSliderProps): JSX.Element {
  return (
    <div className="product-similar__slider">
      <div className="product-similar__slider-list">
        {/* Похожие товары */}
        {
          data.map((product) => <CardProduct data={product} key={product.id} />)
        }
      </div>
      <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled>
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
      <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
    </div>
  );
}


export default SimilarSlider;
