import React from "react";
import MainLogo from "../icons/open-book.png";
import { Link } from "react-router-dom";
import LocationIcon from "../icons/location.png";
import Mail from "../icons/mail2.png";
import Phone from "../icons/phone.png";
import Clock from "../icons/clock.png";

function Footer() {
  return (
    <footer>
      <div className="footer container">

        <div className='main-img'>
          
          <img src={MainLogo} alt='logo' className='book-logo' />
        </div>

        <div className='library'>
          <h3>ბიბლიოთეკა</h3>
          <ul>
            <li>
              <a href='#'>ჩვენს შესახებ</a>
            </li>
            <li>
              <a href='#'>სტრუქტურა და დეპარტამენტი</a>
            </li>
            <li>
              <a href='#'>ვაკანსია</a>
            </li>
          </ul>
        </div>

        <div className='catalogs'>
          <h3>კატალოგები</h3>
          <ul>
            <li>
              <Link to='/authors'>ავტორები</Link>
            </li>
            <li>
              <Link to='/books'>წიგნები</Link>
            </li>
            <li>
              <Link to='/statistics'>სტატისტიკა</Link>
            </li>
          </ul>
        </div>

        <div className="contact">
            <div className="top-part">
              <h3>კონტაქტი</h3>
              <div className="middle-part">
                <img src={LocationIcon} className="location-icon" />
                <p>მისამართი: მისამართი: თბილისი, მ. კოსტავას ქუჩა.</p>
              </div>
            </div>
            <div className="details">
              <div className="mail">
                <img src={Mail} alt="mail" />
                <h4>ელ.ფოსტა</h4>
                <p>biblioteka@gmail.com</p>
              </div>
              <div className="phone">
                <img src={Phone} alt="phone" />
                <h4>ტელეფონი</h4>
                <p>+995 599 777 777</p>
              </div>

              <div className="work-schedule">
                <img src={Clock} alt="clock" />
                <h4>სამუშაო საათები</h4>
                <p>ორშ-პარ(10:00-19:00)</p>
              </div>
            </div>

          
          
          
        </div>



      </div>
    </footer>
  );
}

export default Footer;
