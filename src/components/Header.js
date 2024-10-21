import React, { useState } from "react";
import MainLogo from "../icons/open-book.png";
import { Link } from "react-router-dom";

function Header() {
  const [isActive, setIsActive] = useState(false);


  const toggleClass = () => {
    setIsActive(!isActive);
  };

  return (
    <nav>
      <div className='navbar container'>
        <div className='main-img'>
          <Link to='/'>
            <img src={MainLogo} alt='logo' className='book-logo' />
          </Link>
        </div>

        {/* off-screen-menu */}

        <div className={`off-screen-menu ${isActive ? "active" : ""}`}>
          <ul className='nav-list-off'>
            <li>
              <Link to='/' onClick={toggleClass}>მთავარი</Link>
            </li>
            
            <li>
              <Link to='/authors' onClick={toggleClass}>ავტორები</Link>
            </li>
            <li>
              <Link to='/books' onClick={toggleClass}>წიგნები</Link>
            </li>
            
            <li>
              <Link to="/statistics" onClick={toggleClass}>სტატისტიკა</Link>
            </li>

            <li>
              <Link to='/login' onClick={toggleClass}>შესვლა</Link>
            </li>
            <li>
              <Link to="/registration" onClick={toggleClass}>რეგისტრაცია</Link>
            </li>
          </ul>
        </div>

        <ul className='nav-middle'>
          <li>
            <Link to='/authors'>ავტორები</Link>
            <Link to='/books'>წიგნები</Link>
            <Link to='/statistics'>სტატისტიკა</Link>
          </li>
        </ul>
        <div className='registration'>
          <Link to='/login'>შესვლა</Link>
          <Link to='/registration'>რეგისტრაცია</Link>
        </div>

        <div
          className={`burger-menu ${isActive ? "active" : ""}`}
          onClick={toggleClass}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

export default Header;


