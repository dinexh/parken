'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import './page.css';
import Logo from '../../Assets/kllogo.png';
import Image from 'next/image';

export default function AuthPage() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (parseInt(captchaInput) === num1 + num2) {
      setErrorMessage("");
      toast.success("Login Successful!");
    } else {
      setErrorMessage("Incorrect verification. Try again.");
      toast.error("Incorrect verification. Please try again.");
      setNum1(Math.floor(Math.random() * 10) + 1);
      setNum2(Math.floor(Math.random() * 10) + 1);
      setCaptchaInput("");
    }
  }

  return (
    <div className="auth">
      <div className="auth__left">
        <div className="auth__logo">
          <Image src={Logo} alt="KLEF Logo" className="logo-image" priority />
        </div>
        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="username" className="form__label">University ID:</label>
            <input 
              type="text" 
              id="username" 
              className="form__input"
              required 
            />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">Password:</label>
            <input 
              type="password" 
              id="password" 
              className="form__input"
              required 
            />
          </div>
          <div className="form__captcha">
            <label className="form__label">Captcha:</label>
            <div className="captcha-container">
              <div className="captcha-question">{num1} - {num2}</div>
              <input
                type="number"
                className="form__input captcha-input"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
              />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
          <button type="submit" className="form__submit">Proceed to Login</button>
          <div className="form__forgot">
            <a href="#" className="form__forgot-text">Forgot your password?</a>
          </div>
          <div className="form__terms">
            This site utilizes third party services to protect against spam and abuse. By continuing, you agree to the 
            <a href="#" className="terms-link">Privacy Policy</a> and 
            <a href="#" className="terms-link">Terms of Service</a> of Google reCAPTCHA.
          </div>
        </form>
      </div>
      <div className="auth__right">
        <div className="welcome-content">
          <h1>Parking Management System</h1>
          <p>Welcome to KLEF's Department of Electronics & Computer Science Engineering (EL&GE) Parking Management Portal. This system provides efficient parking space management and vehicle tracking for our campus community.</p>
        </div>
      </div>
    </div>
  );
}