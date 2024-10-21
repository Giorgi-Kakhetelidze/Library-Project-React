import React from "react";
import MailIcon from "../icons/mail.png";
import Password from "../icons/lock.png";

function RecoverPassword() {
  return (
    <div>
      <div className='signup'>
        <div className='signup-container'>
          <h2>შესვლა</h2>
          <form>
            <div className='inputs'>
              <img src={MailIcon} />
              <input type='email' name='email' placeholder='მეილი' required />
              <a className="code">კოდის <br/> მიღება</a>
            </div>

            <div className='inputs'>
              <img src={Password} />
              <input
                type='password'
                name='password'
                placeholder='კოდი'
                required
              />
            </div>
            <div className='btns'>
              <button type='submit' className='signup-btn'>
                შესვლა
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecoverPassword;




