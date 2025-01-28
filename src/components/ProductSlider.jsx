import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import { FaArrowRight } from "react-icons/fa6";

import products from '../data/products.json';
import ProductCard from '../components/ProductCard'; 

import 'swiper/css';
import '../styles/components/ProductSlider.scss';


const ProductSlider = () => {
  const firstSlideProducts = products.filter(
    (product) => product.id === 1 || product.id === 7
  );

  const secondSlideProducts = products.filter(
    (product) => product.id === 8 || product.id === 5
  );

  return (
    <div className="product-slider">
      <Swiper
        direction="horizontal"
        slidesPerView={1}
        mousewheel={true}
        modules={[Mousewheel]}
        className="product-swiper"
      >

        <SwiperSlide>
          <div className="slide-content">
            <div className="imgWrap">
              <img src="/assets/images/main/Bestshop01.jpg" alt="productimg" />
            </div>
            <div className="textWrap">
              <p># Only You Product</p>
              <h2>당신만을 위한, 베스트샵</h2>
              <div className="product-list">
                {firstSlideProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <a href="#none" className="more">MORE VIEW <FaArrowRight className='productSlider-more'/></a>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-content">
            <div className="imgWrap">
              <img src="/assets/images/main/Bestshop02.jpg" alt="productimg" />
            </div>
            <div className="textWrap">
              <p># Best Collection</p>
              <h2>인생 컬러만, 모아모아</h2>
              <div className="product-list">
                {secondSlideProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <a href="#none" className="more">MORE VIEW <FaArrowRight className='productSlider-more'/></a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductSlider;