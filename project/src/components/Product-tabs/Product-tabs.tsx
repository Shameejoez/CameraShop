import { useState } from 'react';
import { CardProductInfo } from '../../types/types';
import { tabName } from '../../consts';

type ProductTabProps = {
 characteristics: Pick<CardProductInfo, 'type' | 'category' | 'vendorCode' | 'level' | 'description'>;
}


function ProductTabs ({characteristics}: ProductTabProps):JSX.Element {

  const [currentTab, setCurrentTab] = useState<tabName>(tabName.Characteristic);

  const renderActiveTab = (tab: tabName) => {
    setCurrentTab(tab);
  };

  const {vendorCode, category, level, type, description} = characteristics;

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button className={`tabs__control ${currentTab === tabName.Characteristic ? 'is-active' : ''}`} type="button"
          onClick={(e) => renderActiveTab(e.currentTarget.textContent as tabName)}
        >Характеристики
        </button>
        <button className={`tabs__control ${currentTab === tabName.Description ? 'is-active' : ''}`} type="button"
          onClick={(e) => renderActiveTab(e.currentTarget.textContent as tabName)}
        >Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className={`tabs__element ${currentTab === tabName.Characteristic ? 'is-active' : ''}`}>
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
        <div className={`tabs__element ${currentTab === tabName.Description ? 'is-active' : ''}`}>
          <div className="product__tabs-text">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}


export default ProductTabs;
