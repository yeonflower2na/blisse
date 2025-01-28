import React from 'react';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard';
import '../styles/components/MDpickItem.scss';

const MDpickItem = () => {
  const mdPickProducts = products.filter(
    (product) => product.id >= 1 && product.id <= 9
  );

  return (
    <div className="MDpickItem">
      <div className="MDpickItem-inner">
        <div className="MDpickItem-title">
          <h2>MD’PICK ITEM</h2>
          <p>브랜드샵 MD가 직접 선정한 아이템</p>
        </div>
        <div className="product-list">
          {mdPickProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MDpickItem;