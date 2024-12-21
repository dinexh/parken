'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import './page.css';

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
      setErrorMessage("Incorrect Captcha. Try again.");
      toast.error("Incorrect Captcha. Please try again.");
      setNum1(Math.floor(Math.random() * 10) + 1);
      setNum2(Math.floor(Math.random() * 10) + 1);
      setCaptchaInput("");
    }
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__header">
            <h1 className="auth__title">Koneru Lakshmaiah Education Foundation</h1>
            <h2 className="auth__subtitle">(Deemed to be University)</h2>
            <h2 className="auth__subtitle">Department of EL&GE</h2>
            <p className="auth__description">Parking System Admin portal</p>
          </div>
          <div className="auth__form-content">
            <div className="form__group">
              <input 
                type="text" 
                id="username" 
                className="form__input"
                placeholder=" "
                required 
              />
              <label htmlFor="username" className="form__label">Username</label>
            </div>
            <div className="form__group">
              <input 
                type="password" 
                id="password" 
                className="form__input"
                placeholder=" "
                required 
              />
              <label htmlFor="password" className="form__label">Password</label>
            </div>
            <div className="form__captcha">
              <p className="form__captcha-text">Solve this: {num1} + {num2} = </p>
              <input
                type="number"
                className="form__captcha-input"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Enter the sum"
                required
              />
            </div>
            <button type="submit" className="form__submit">Login</button>
            <div className="form__forgot">
              <p className="form__forgot-text">Forgot Password?</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}