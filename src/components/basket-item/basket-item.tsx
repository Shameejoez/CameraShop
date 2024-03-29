import { useAppDispatch, useAppSelector } from '../../hooks';
import { takeMyCameras } from '../../store/basket-process/basket-selectors';
import { replaceCountMyCameras } from '../../store/basket-process/basket-slice';
import { CardProductInfo } from '../../types/types';
import { ChangeEvent, useEffect, useState } from 'react';

type BasketItemProps = {
  camera: CardProductInfo;
  onClickGetCurrentCamera: (camera: CardProductInfo) => void;
  onClickSetBasketAdd: (isActive: string) => void;

}

function BasketItem ({camera, onClickGetCurrentCamera, onClickSetBasketAdd}: BasketItemProps):JSX.Element {

  const dispatch = useAppDispatch();
  const count = useAppSelector(takeMyCameras).find((el) => el.id === camera.id)?.count;
  const [countCamera, setCountCamera] = useState<number>(count as number);

  useEffect(() => {
    dispatch(replaceCountMyCameras({id: camera.id, newCount: countCamera}));
  },[countCamera]);

  const {category, previewImg2x, previewImgWebp, previewImg, previewImgWebp2x, level, name, type, price, vendorCode, id} = camera;

  const onClickDeleteItem = () => {
    onClickGetCurrentCamera(camera);
    onClickSetBasketAdd('is-active');
  };

  const onClickPlusCount = () => {
    if(count !== 99) {
      setCountCamera((prev) => prev + 1);
    }
  };

  const onClickMinusCount = () => {
    if (count !== 1) {
      setCountCamera((prev) => prev - 1);
    }
  };

  const onChangesetCount = (e: ChangeEvent<HTMLInputElement>) => {

    const currentValue = e.target.value.trim().replace(/\D/g , '');

    if(Number(currentValue) > 99) {
      setCountCamera(99);
      return;
    }

    if(Number(currentValue) < 1) {
      setCountCamera(1);
      return;
    }
    setCountCamera(Number(currentValue));
  };


  return (
    <li className="basket-item" data-testid={'basket-item-test'}>
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`} /><img src={`/${previewImg}`} srcSet={`/${previewImg2x}`} width={140} height={120} alt={name} />
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
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-Ru')} ₽</p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара" onClick={onClickMinusCount} disabled={(count as number) <= 1}>
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input type="text" id={`counter${id}`} aria-label="количество товара" value={countCamera} onChange={onChangesetCount} />
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара" onClick={onClickPlusCount} disabled={(count as number) >= 99}>
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{(price * (count as number)).toLocaleString('ru-Ru')} ₽</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={onClickDeleteItem}>
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;

