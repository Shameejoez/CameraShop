import { useState } from 'react';
import { CardProductInfo } from '../../types/types';
import { HashName } from '../../consts';
import { Link, useLocation } from 'react-router-dom';

type ProductTabProps = {
 characteristics: Pick<CardProductInfo, 'type' | 'category' | 'vendorCode' | 'level' | 'description'>;
}


function ProductTabs ({characteristics}: ProductTabProps):JSX.Element {
  const parsedHash = useLocation().hash;

  const [currentHash, setCurrentHash] = useState<string>(parsedHash);

  const renderActiveTab = (hash: string) => {
    setCurrentHash(hash);
  };

  const {vendorCode, category, level, type, description} = characteristics;

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <Link className={`tabs__control ${currentHash === HashName.Characteristic ? 'is-active' : ''}`} type="button" to={'#characteristic'}
          onClick={() => renderActiveTab('#characteristic')}
        >Характеристики
        </Link>
        <Link className={`tabs__control ${currentHash === HashName.Description ? 'is-active' : ''}`} type="button" to={'#description'}
          onClick={() => renderActiveTab('#description')}
        >Описание
        </Link>
      </div>
      <div className="tabs__content">
        <div className={`tabs__element ${currentHash === HashName.Characteristic ? 'is-active' : ''}`}>
          <ul className="product__tabs-list">
            <div>
              <li className="item-list"><span className="item-list__title">Артикул:</span>
                <p className="item-list__text"> {vendorCode}</p>
              </li>
              <li className="item-list"><span className="item-list__title">Категория:</span>
                <p className="item-list__text">{category}</p>
              </li>
              <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                <p className="item-list__text">{type}</p>
              </li>
              <li className="item-list"><span className="item-list__title">Уровень:</span>
                <p className="item-list__text">{level}</p>
              </li>
            </div>
          </ul>
        </div>
        <div className={`tabs__element ${currentHash === HashName.Description ? 'is-active' : ''}`}>
          <div className="product__tabs-text">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}


export default ProductTabs;
