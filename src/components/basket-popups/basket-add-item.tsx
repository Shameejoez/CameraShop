import { useAppDispatch } from '../../hooks';
import useFocusLockModal from '../../hooks/use-focus-lock/use-focus-lock-modal';
import useKeyDownEsc from '../../hooks/use-key-down-esc/use-key-down-esc';
import useOutsideClick from '../../hooks/use-out-side-click/use-out-side-click';
import { addMyCameras, deleteMyCameras } from '../../store/basket-process/basket-slice';
import { CardProductInfo } from '../../types/types';
import { useRef } from 'react';

type BasketAddItemProps = {
    camera: CardProductInfo;
    isActive: string;
    onClickSetBasketAdd: (isActive: string) => void;
    onClickBasketSucess: (isActive: string) => void;
    place?: string;
}

function BasketAddItem ({camera, isActive, onClickSetBasketAdd, onClickBasketSucess, place}: BasketAddItemProps) :JSX.Element {
  const dispatch = useAppDispatch();
  const refModal = useRef<HTMLInputElement | null>(null);
  useFocusLockModal({isVisible: isActive , ref: refModal});
  useKeyDownEsc({handler: onClickSetBasketAdd, isVisible: isActive});
  useOutsideClick({elementRef: refModal, handler: onClickSetBasketAdd });

  const {level, category, type, name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, vendorCode} = camera;

  const onClickAddMyCameras = () => {
    dispatch(addMyCameras({...camera, count:1}));
    onClickSetBasketAdd('');
    onClickBasketSucess('is-active');
  };

  const onClickDeleteAllMyCamera = () => {
    dispatch(deleteMyCameras({...camera, mode: 'all'}));
    onClickSetBasketAdd('');
  };

  return (
    <div className={`modal ${isActive}`} style={isActive === 'is-active' ? {width: 'calc(100% - 16.8px)'} : undefined} >
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content" ref={refModal}>
          {
            place === 'basket' ?
              <p className="title title--h4">Удалить этот товар?</p> : <p className="title title--h4">Добавить товар в корзину</p>
          }
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`/${previewImgWebp} , /${previewImgWebp2x}`} /><img src={`/${previewImg}`} srcSet={`/${previewImg2x}`} width={140} height={120} alt={name} />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{type} {category === 'Фотоаппарат' ? 'фотокамера' : 'видеокамера'}</li>
                <li className="basket-item__list-item">{level} уровень</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-Ru')} ₽</p>
            </div>
          </div>
          <div className="modal__buttons">
            {
              place === 'basket' ?
                <div>
                  <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={onClickDeleteAllMyCamera}>Удалить
                  </button>
                  <a className="btn btn--transparent modal__btn modal__btn--half-width" href="#" onClick={() => onClickSetBasketAdd('')}>Продолжить покупки
                  </a>
                  <button className="cross-btn" type="button" aria-label="Закрыть попап">
                    <svg width={10} height={10} aria-hidden="true">
                      <use xlinkHref="#icon-close" />
                    </svg>
                  </button>
                </div> :
                <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={onClickAddMyCameras}>
                  <svg width={24} height={16} aria-hidden="true">
                    <use xlinkHref="#icon-add-basket" />
                  </svg>Добавить в корзину
                </button>
            }
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => onClickSetBasketAdd('')}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BasketAddItem;
