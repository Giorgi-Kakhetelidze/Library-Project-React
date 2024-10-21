import React from 'react';
import MailIcon from "../icons/mail.png";
import Password from "../icons/lock.png";
import { Link } from 'react-router-dom';
import bookLogo from "../icons/open-book.png";


function Login() {




  return (
    <div className='signup-container container'>
      <section className='left-section signup'>
        <div className='signup-container'>
          <h2>შესვლა</h2>
          <form className='login-form'>
          
            <div className='inputs'>
              <img src={MailIcon}/>
              <input type="email" name='email' placeholder='მეილი' required/>
            </div>

            <div className='inputs'>
              <img src={Password}/>
              <input type="password" name='password' placeholder='პაროლი' required/>
            </div>
            <div className="forgetPasword">
              <Link to="/recover">დაგავიწყდა პაროლი?</Link>
            </div>
            <div className='btns'>
              <button type='submit' className='signup-btn'>შესვლა</button>
            </div>
          </form>
        </div>
      </section>
      <section className='right-side'>
        <img src={bookLogo} alt="book" />
      </section>
    </div>
  )
}

export default Login



