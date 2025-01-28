import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components/Header.scss';
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineGlobeAsiaAustralia } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
}

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleLanguage = () => setIsLanguageOpen(!isLanguageOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMypageClick = () => {
    if (isAuthenticated()) {
      navigate('/mypage');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('로그아웃되었습니다.')
    navigate('/login');
  }

  return (
    <header className="header">
      {/* header-inner */}
      <div className="header-inner">
        {/* nav */}
        <nav className="nav-category">
          <ul className="main-menu">
            <li
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)} 
            >
              <Link>PRODUCT</Link>
              <ul className="sub-menu">
                <li><Link to="/products/eyes">Eyes</Link></li>
                <li><Link to="/products/lip">Lip</Link></li>
                <li><Link to="/products/face">Face</Link></li>
              </ul>
            </li>
            <li><Link to="/lookbook">LOOKBOOK</Link></li>
            <li
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)} 
            >
              <Link>COMMUNITY</Link>
              <ul className="sub-menu">
                <li><Link to="/community/NOTICE">NOTICE</Link></li>
                <li><Link to="/category/REVIEW">REVIEW</Link></li>
                <li><Link to="/category/Q&A">Q&A</Link></li>
                <li><Link to="/category/자유게시판">자유게시판</Link></li>
              </ul>
            </li>
            <li
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)} 
            >
              <span onClick={handleMypageClick} >MYPAGE</span>
              <ul className="sub-menu">
                <li><Link to="/category/주문내역조회">주문내역조회</Link></li>
                <li><Link to="/category/관심상품">관심상품</Link></li>
                <li><Link to="/category/게시물관리">게시물관리</Link></li>
                <li><Link to="/category/자유게시판">최근본상품</Link></li>
              </ul>
            </li>
          </ul>
        </nav>

        {/* left-nav */}
        <div className="left-nav">
          <div className="header-logo">
            <Link to="/">
              <img src="/assets/images/Blissé-Logo.png" alt="로고" />
            </Link>
          </div>
        </div>

        {/* right-nav */}
        <div className="right-nav">
          <div className="text-icon">
            {isAuthenticated() ? (
                <span onClick={handleLogout} style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#222',
                  cursor:'pointer'}}>
                  LOGOUT
                </span>
              ) : (
                <Link to="/login">LOGIN</Link>
              )}
            <Link to="/join">JOIN</Link>
            <span className="point">
              <em>+1000P</em>
            </span>
            <Link to="/order">ORDER</Link>
            <Link to="/cart">CART</Link>
          </div>

          {/* nav-icons */}
          <div className="nav-icons">
            <button onClick={toggleSearch} className="icon"><IoSearch /></button>
            <button onClick={toggleLanguage} className="icon"><HiOutlineGlobeAsiaAustralia /></button>
            <button onClick={toggleMenu} className="icon"><RxHamburgerMenu /></button>
          </div>
        </div>

        {/* search */}
        {isSearchOpen && (
          <div className="search-modal">
            {/* 닫기 버튼 */}
            <button onClick={toggleSearch} className="close-btn"><IoMdClose /></button>
            <h2>SEARCH</h2>
            <div className="search-input-container">
              <input
                type="text"
                placeholder="찾으시는 상품을 검색하세요!"
                className="search-input"
              />
              <IoSearch className="input-icon" />
            </div>
            <div className="popular-search">
              인기검색어
              <span>#스킨케어</span>
              <span>#립스틱</span>
              <span>#틴트</span>
              <span>#쿠션</span>
              <span>#향수</span>
            </div>
          </div>
        )}

        {/* language */}
        {isLanguageOpen && (
          <div className="search-modal">
            {/* 닫기 버튼 */}
            <button onClick={toggleLanguage} className="close-btn"><IoMdClose /></button>
            <div className="language">
              <h2>한국어</h2>
              <h2>English</h2>
              <h2>中国人</h2>
              <h2>日本語</h2>
              <h2>Français</h2>
            </div>
          </div>
        )}

        {/* hamburger */}
        {isMenuOpen && (
          <div className="search-modal">
            <button onClick={toggleMenu} className="close-btn"><IoMdClose /></button>
            <nav className="modal-nav">
              <ul className="modal-menu">
                <li><Link>PRODUCT</Link>
                  <ul className="modal-sub-menu">
                    <li><Link to="/products/Eyes">Eyes</Link></li>
                    <li><Link to="/products/Lip">Lip</Link></li>
                    <li><Link to="/products/Face">Face</Link></li>
                  </ul>
                </li>
                <li><Link to="/lookbook">LOOKBOOK</Link></li>
                <li><Link>COMMUNITY</Link>
                  <ul className="modal-sub-menu">
                    <li><Link to="/community/notice">NOTICE</Link></li>
                    <li><Link to="/category/REVIEW">REVIEW</Link></li>
                    <li><Link to="/category/Q&A">Q&A</Link></li>
                    <li><Link to="/category/자유게시판">자유게시판</Link></li>
                  </ul>
                </li>
                <li><Link>MYPAGE</Link>
                  <ul className="modal-sub-menu">
                    <li><Link to="/category/주문내역조회">주문내역조회</Link></li>
                    <li><Link to="/category/관심상품">관심상품</Link></li>
                    <li><Link to="/category/게시물관리">게시물관리</Link></li>
                    <li><Link to="/category/자유게시판">최근본상품</Link></li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* hover-background */}
        <div
          className="hover-background"
          style={{
            position: 'absolute',
            top: '72.2px',
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(3px)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            zIndex: -1,
          }}
        ></div>
      </div>
    </header>
  );
};

export default Header;