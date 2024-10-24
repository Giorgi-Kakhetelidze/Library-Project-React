import React, { useState } from 'react';
import NameIcon from "../icons/name-icon.png";
import MailIcon from "../icons/mail.png";
import Password from "../icons/lock.png";
import EyeIcon from "../icons/eye.png";
import bookLogo from "../icons/open-book.png";

function Registration() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to manage confirm password visibility
  const [error, setError] = useState('');

  // validation for password 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    // You can add further form submission logic here
  };

  return (
    <div className='signup-container container'>
      <section className='left-section signup'>
        <div className='registration-container'>
          <h2>რეგისტრაცია</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <div className='inputs'>
                <img src={NameIcon} alt="Name Icon" />
                <input type="text" className='input3' name='name' placeholder='სახელი' required />
              </div>
            </div>

            <div>
              <div className='inputs'>
                <img src={MailIcon} alt="Mail Icon" />
                <input type="email" className='input3' name='email' placeholder='Email' required />
              </div>
            </div>

            <div>
              <div className='inputs'>
                <img src={Password} alt="Password Icon" />
                <input
                  type={showPassword ? "text" : "password"} // Toggle password visibility
                  name='password'
                  placeholder='პაროლი'
                  className='input3'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <img
                  src={EyeIcon} // Use only the eye icon
                  alt="Toggle Password Visibility"
                  onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                  style={{ cursor: 'pointer' }} // Change cursor to pointer
                />
              </div>
            </div>

            <div>
              <div className='inputs'>
                <img src={Password} alt="Password Icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                  name='confirmPassword'
                  placeholder='დაადასტურე პაროლი'
                  className='input3'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <img
                  src={EyeIcon} // Use only the eye icon
                  alt="Toggle Confirm Password Visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle visibility
                  style={{ cursor: 'pointer' }} // Change cursor to pointer
                />
              </div>
            </div>

            <div className='btns'>
              <button type='submit' className='signup-btn'>რეგისტრაცია</button>
            </div>
          </form>
        </div>
      </section>
      
      <section className='right-side'>
        <img src={bookLogo} alt="book" />
      </section>
    </div>
  );
}

export default Registration;
