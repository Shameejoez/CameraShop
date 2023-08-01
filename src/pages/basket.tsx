import BasketItem from '../components/basket-item/basket-item';
import BasketAddItem from '../components/basket-popups/basket-add-item';
import BasketAddSucess from '../components/basket-popups/basket-add-sucess';
import Breadcrumb from '../components/breadcrumbs/breadcrumbs';
import { defaultCard } from '../consts';
import { useAppSelector } from '../hooks';
import { takeMyCameras, takeTotalPrice } from '../store/basket-process/basket-selectors';
import { CardProductInfo } from '../types/types';
import { useState } from 'react';

type BasketProps = {
  isActiveSuccessBasket: string;
  isActiveAddBasket: string;
  onClickSetBasketAdd: (isActive: string) => void;
  onClickBasketSucess: (isActive: string) => void;
}

function Basket ({isActiveAddBasket, isActiveSuccessBasket, onClickBasketSucess, onClickSetBasketAdd}: BasketProps): JSX.Element {
  const myCameras = useAppSelector(takeMyCameras);
  const totalPrice = useAppSelector(takeTotalPrice);
  const [curentCamera, setCurrentCamera] = useState<CardProductInfo>(defaultCard);

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
                    <div className="custom-input">
                      <label><span className="custom-input__label">Промокод</span>
                        <input type="text" name="promo" placeholder="Введите промокод" />
                      </label>
                      <p className="custom-input__error">Промокод неверный</p>
                      <p className="custom-input__success">Промокод принят!</p>
                    </div>
                    <button className="btn" type="submit">Применить
                    </button>
                  </form>
                </div>
              </div>
              <div className="basket__summary-order">
                <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{totalPrice.toLocaleString('ru-Ru')} ₽</span></p>
                <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
                <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">111 390 ₽</span></p>
                <button className="btn btn--purple" type="submit">Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <BasketAddItem camera={curentCamera} isActive={isActiveAddBasket} onClickBasketSucess={onClickBasketSucess} onClickSetBasketAdd={onClickSetBasketAdd} place='basket'/>
      <BasketAddSucess isActive={isActiveSuccessBasket} onClickSetBasketSucess={onClickBasketSucess} />
    </main>
  );
}

export default Basket;