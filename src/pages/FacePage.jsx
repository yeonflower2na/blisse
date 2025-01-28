import React, { useState, useMemo } from 'react';

import products from '../data/products.json';
import ProductCard from '../components/ProductCard';
import BestNewProducts from '../components/BestNewProducts.jsx';
import Pagination from '../components/Pagination.jsx';

const FacePage = () => {
  const [sortOrder, setSortOrder] = useState('new');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [currentStoresPage, setCurrentStoresPage] = useState(1);

  const faceProducts = useMemo(() => {
    return products.filter((product) => product.category === 'face');
  }, []);

  const filteredProducts = useMemo(() => {
    return selectedSubCategory
      ? faceProducts.filter((product) => product.subCategory === selectedSubCategory)
      : faceProducts;
  }, [selectedSubCategory, faceProducts]);

  // 정렬 로직
  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts]; 
    switch (sortOrder) {
      case 'new':
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'lowPrice':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'highPrice':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return sorted;
  }, [sortOrder, filteredProducts]);

  const itemsPerPage = 12;
  const indexOfLastStores = currentStoresPage * itemsPerPage;
  const indexOfFirstStores = indexOfLastStores - itemsPerPage;
  const currentStores = sortedProducts.slice(indexOfFirstStores, indexOfLastStores);
  const totalStoresPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <div className="lips-page products-page">
      <div className="products-title">
        <h2>페이스</h2>
        <ul className="products-list">
          <li
            onClick={() => setSelectedSubCategory('쿠션')}
            className={selectedSubCategory === '쿠션' ? 'active' : ''}
          >
            쿠션
          </li>
          <li
            onClick={() => setSelectedSubCategory('크림')}
            className={selectedSubCategory === '크림' ? 'active' : ''}
          >
            크림
          </li>
          <li
            onClick={() => setSelectedSubCategory('블러셔')}
            className={selectedSubCategory === '블러셔' ? 'active' : ''}
          >
            블러셔
          </li>
          <li
            onClick={() => setSelectedSubCategory('기타')}
            className={selectedSubCategory === '기타' ? 'active' : ''}
          >
            기타
          </li>
        </ul>
      </div>
      <BestNewProducts />
      <div className="products-header">
        <div className="total-products">
          TOTAL <span>{filteredProducts.length}</span> ITEMS
        </div>
        <ul className="header-btns">
          <li onClick={() => setSortOrder('new')} className={sortOrder === 'new' ? 'active' : ''}>
            신상품
          </li>
          <li onClick={() => setSortOrder('name')} className={sortOrder === 'name' ? 'active' : ''}>
            상품명
          </li>
          <li onClick={() => setSortOrder('lowPrice')} className={sortOrder === 'lowPrice' ? 'active' : ''}>
            낮은가격
          </li>
          <li onClick={() => setSortOrder('highPrice')} className={sortOrder === 'highPrice' ? 'active' : ''}>
            높은가격
          </li>
        </ul>
      </div>
      <div className="products-items">
        {currentStores.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentStoresPage}
        totalPages={totalStoresPages}
        onPageChange={(page) => setCurrentStoresPage(page)}
      />
    </div>
  );
};

export default FacePage;
