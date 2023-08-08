import BasketItem from '../components/basket-item/basket-item';
import BasketAddItem from '../components/basket-popups/basket-add-delete-item';
import BasketAddSucess from '../components/basket-popups/basket-add-sucess';
import BasketError from '../components/basket-popups/basket-error';
import Breadcrumb from '../components/breadcrumbs/breadcrumbs';
import { CuponStatus, LoadingStatus, defaultCard } from '../consts';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postCupon, postOrders } from '../store/action';
import { takeAddedCoupon, takeCuponStatus, takeDiscount, takeMyCameras, takeOrderStatus, takeTotalPrice } from '../store/basket-process/basket-selectors';
import { resetStatusCupon, resetStatusOrder, setAddedCoupon } from '../store/basket-process/basket-slice';
import { CardProductInfo } from '../types/types';
import { useState, ChangeEvent, useEffect } from 'react';

type BasketProps = {
  isActiveSuccessBasket: string;
  isActiveAddBasket: string;
  onClickSetBasketAdd: (isActive: string) => void;
  onClickBasketSucess: (isActive: string) => void;
}

function Basket ({isActiveAddBasket, isActiveSuccessBasket, onClickBasketSucess, onClickSetBasketAdd}: BasketProps): JSX.Element {
  const dispatch = useAppDispatch();
  const myCameras = useAppSelector(takeMyCameras);
  const orderStatus = useAppSelector(takeOrderStatus);
  const addedCoupon = useAppSelector(takeAddedCoupon);
  const cuponStatus = useAppSelector(takeCuponStatus);
  const totalPrice = useAppSelector(takeTotalPrice);
  const discount = totalPrice / 100 * (useAppSelector(takeDiscount));
  const [curentCamera, setCurrentCamera] = useState<CardProductInfo>(defaultCard);
  const [cuponField, setCuponField] = useState<string>(addedCoupon);
  const priceToPay = totalPrice - discount;
  const [isErrorVisible, setErrorVisible] = useState<string>('');

  useEffect(() => {
    if (orderStatus === LoadingStatus.Rejected) {
      setErrorVisible('is-active');
    }

    if (orderStatus === LoadingStatus.Fullfield) {
      onClickBasketSucess('is-active');
    }

    if(isErrorVisible === '') {
      dispatch(resetStatusOrder());
    }
  }, [isErrorVisible, orderStatus]);

  const onChangeSetCupon = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(resetStatusCupon());
    setCuponField(e.target.value);
  };

  const onClickSetErrorVisible = (mode: string) => {
    setErrorVisible(mode);
  };

  const setCuponFieldStyle = () => {
    if (cuponField.length === 0) {
      return '';
    }
    if(cuponField.length > 0 && cuponStatus === CuponStatus.Rejected) {
      return 'is-invalid';
    }
    if((cuponField.length > 0 && cuponStatus === CuponStatus.Vaild) || (cuponField.length > 0 && cuponField === addedCoupon)) {
      dispatch(setAddedCoupon(cuponField));
      return 'is-valid';
    }
    return '';
  };

  const onCLickSubmitOrder = () => {
    const ids = myCameras.map((el) => el.id);
    dispatch(postOrders({camerasIds: ids, coupon: addedCoupon === '' ? null : addedCoupon}));
  };

  const onClickUseCupon = () => {
    dispatch(postCupon(cuponField));
  };

  return (
    <main>
      <div className="page-content">
        <Breadcrumb/>
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            <ul className="basket__list">
              {
                myCameras.map((camera) => <BasketItem camera={camera} key={camera.id} onClickGetCurrentCamera={setCurrentCamera} onClickSetBasketAdd={onClickSetBasketAdd}/>)
              }
            </ul>
            <div className="basket__summary">
              <div className="basket__promo">
                <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                <div className="basket-form">
                  <form action="#">
                    <div className={`custom-input ${setCuponFieldStyle()}`} >
                      <label><span className="custom-input__label">Промокод</span>
                        <input type="text" name="promo" placeholder="Введите промокод" value={cuponField} onChange={onChangeSetCupon}/>
                      </label>
                      <p className="custom-input__error">Промокод неверный</p>
                      <p className="custom-input__success">Промокод принят!</p>
                    </div>
                    <button className="btn" type="button" onClick={onClickUseCupon}>Применить
                    </button>
                  </form>
                </div>
              </div>
              <div className="basket__summary-order">
                <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{totalPrice.toLocaleString('ru-Ru')} ₽</span></p>
                <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">{discount.toLocaleString('ru-Ru')} ₽</span></p>
                <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{priceToPay.toLocaleString('ru-Ru')} ₽</span></p>
                <button className="btn btn--purple" type="button" onClick={onCLickSubmitOrder}>Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <BasketAddItem camera={curentCamera} isActive={isActiveAddBasket} onClickBasketSucess={onClickBasketSucess} onClickSetBasketAdd={onClickSetBasketAdd} place='basket'/>
      <BasketAddSucess isActive={isActiveSuccessBasket} onClickSetBasketSucess={onClickBasketSucess} place='basket' />
      <BasketError isActive={isErrorVisible} onClickSetBasketError={onClickSetErrorVisible}/>
    </main>
  );
}

export default Basket;
