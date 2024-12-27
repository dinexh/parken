'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import './page.css';
import Logo from '../../Assets/kllogo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [letter1, setLetter1] = useState('');
  const [letter2, setLetter2] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const generateRandomLetter = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  const handleForgotPassword = () => {
    router.push('/forgotpassword');
  };

  useEffect(() => {
    setLetter1(generateRandomLetter());
    setLetter2(generateRandomLetter());
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (captchaInput.toLowerCase() === letter1 + letter2) {
      setErrorMessage('');
      toast.success('Login Successful!');
    } else {
      setErrorMessage('Incorrect verification. Try again.');
      toast.error('Incorrect verification. Please try again.');
      setLetter1(generateRandomLetter());
      setLetter2(generateRandomLetter());
      setCaptchaInput('');
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
              <div className="captcha-question">{letter1} {letter2}</div>
              <input
                type="text"
                className="form__input captcha-input"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                maxLength={2}
                required
              />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
          <button type="submit" className="form__submit">Proceed to Login</button>
          <div className="form__forgot">
            <a onClick={handleForgotPassword} className="form__forgot-text">Forgot your password?</a>
          </div>
        </form>
      </div>
      <div className="auth__right">
        <div className="welcome-content">
          <h1>Welcome to KL&apos;s Parking Management</h1>
          <p>Welcome to KLEF&apos;s Department of Experimental Learning and Global Exploration (ELGE) Parking Management Portal. This system provides efficient parking space management and vehicle tracking for our campus community.</p>
        </div>
      </div>
    </div>
  );
}