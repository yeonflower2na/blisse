import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/components/ProductCard.scss";

/* icons */
import { GoThumbsup } from "react-icons/go";
import { AiOutlineShopping } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { useCart } from "../components/CartContext"; // CartContext 추가

const ProductCard = ({ product }) => {
  const { id, name, description, price, discountprice, imageUrl, hoverimageUrl, isBest, isNew, colors } = product;

  const [liked, setLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // CartContext에서 addToCart
  const { addToCart } = useCart();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setLiked(savedFavorites.includes(id));
  }, [id]);

  const handleLikeClick = (e) => {
    e.preventDefault();
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (liked) {
      updatedFavorites = savedFavorites.filter((productId) => productId !== id);
    } else {
      updatedFavorites = [...savedFavorites, id];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setLiked(!liked);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ ...product, quantity: 1 });
    alert('상품이 장바구니에 추가되었습니다!');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.1 }
    );

    const currentCardRef = cardRef.current;
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);

  return (
    <Link to={`/products/${id}`}>
      <div
        className={`product-card ${isVisible ? "visible" : ""}`}
        key={id}
        ref={cardRef}
      >
        <div className="product-img">
          <img src={imageUrl} alt={name} className="img" />
          <img src={hoverimageUrl} alt={`${name} hover`} className="hover-img" />
          <div className="icon-wrap">
            <div>
              <GoThumbsup />
            </div>
            <div onClick={handleAddToCart}>
              <AiOutlineShopping />
            </div>
            <div>
              <IoIosSearch />
            </div>
            <div onClick={handleLikeClick} className="heart-icon">
              {liked ? <IoIosHeart style={{ color: "red" }} /> : <IoIosHeartEmpty />}
            </div>
          </div>
        </div>
        <div className="product-desc">
          <h3>{name}</h3>
          <p>{description}</p>
          <h4>
            <span>{price.toLocaleString()}원</span>
            {discountprice.toLocaleString()}원
          </h4>
          <ul className="colors">
            {colors.map((color, index) => (
              <li key={index}>
                <span style={{ backgroundColor: color }}></span>
              </li>
            ))}
          </ul>
          <div className="product-icon">
            {isBest && <img src="/assets/images/product/ico_product_recommended.gif" alt="추천 아이콘" />}
            {isNew && <img src="/assets/images/product/ico_product_new.gif" alt="신상품 아이콘" />}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
