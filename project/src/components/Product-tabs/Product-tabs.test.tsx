import { render, screen } from '@testing-library/react';
import ProductTabs from './Product-tabs';
import { CategoryProduct, Mastery, TypeProduct } from '../../consts';
import { CardProductInfo } from '../../types/types';
import { MemoryRouter } from 'react-router-dom';

const productArray: CardProductInfo [] = [
  {
    category: CategoryProduct.Camcorder,
    description: 'Немецкий концерн BRW' ,
    id: 1,
    level: Mastery.Amateur,
    name: 'Ретрокамера Dus Auge lV',
    previewImg: 'img/content/das-auge.jpg',
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp',
    price: 73450,
    reviewCount: 5,
    type: TypeProduct.Collectible,
    vendorCode: 'DA4IU67AD5',
  }
];

const productTabsData = {
  description: productArray[0]['description'],
  level: productArray[0]['level'],
  type: productArray[0]['type'],
  category: productArray[0]['category'],
  vendorCode: productArray[0]['vendorCode']
};

describe('ProductTabs', () => {
  it('should render tabs and active link - Описание', () => {
    render(
      <MemoryRouter initialEntries={[{
        pathname: '/catalog/product/2',
        hash: '#description'
      }]}
      >
        <ProductTabs characteristics={productTabsData}/>
      </MemoryRouter>
    );

    expect(screen.getByRole('link', {name: 'Описание'})).toHaveClass('is-active');

  });

  it('should render tabs and active link - Характеристики', () => {
    render(
      <MemoryRouter initialEntries={[{
        pathname: '/catalog/product/2',
        hash: '#characteristic'
      }]}
      >
        <ProductTabs characteristics={productTabsData}/>
      </MemoryRouter>
    );

    expect(screen.getByRole('link', {name: 'Характеристики'})).toHaveClass('is-active');

  });
});
