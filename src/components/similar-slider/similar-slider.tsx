import { CardProductInfo } from '../../types/types';
import CardProduct from '../card-product/card-product';

type SimilarSliderProps = {
  cameras: CardProductInfo[];
  onClicksetCurrentCamera: (camera: CardProductInfo) => void;
  onClickSetAddBasket: (isActive: string) => void;
}

function SimilarSlider ({cameras, onClicksetCurrentCamera, onClickSetAddBasket}: SimilarSliderProps): JSX.Element {


  return (
    <div className="product-similar__slider">
      <div className="product-similar__slider-list">
        {/* Похожие товары */}
        {
          cameras.map((camera) => <CardProduct camera={camera} key={camera.id} onClickGetCurrentCamera={onClicksetCurrentCamera} onClickSetAddBasket={onClickSetAddBasket} />)
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
