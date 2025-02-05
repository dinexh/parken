"use client";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaSync } from "react-icons/fa";
import Link from 'next/link';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [empId, setEmpId] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  // Generate random 6-digit number for captcha
  const generateCaptcha = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setCaptcha(randomNum.toString());
    setUserCaptcha('');
    setCaptchaError(false);
  };

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Validation for numbers only
  const handleEmpIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setEmpId(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userCaptcha !== captcha) {
      setCaptchaError(true);
      return;
    }
    // Add your login logic here
    console.log('Form submitted successfully');
  };

  return (
  <div className="home-component">
    <div className="home-component-in">
      <div className="home-component-in-one">
        <div className="home-component-in-one-in">
          <div className="home-component-in-one-in-heading">
            <h1>Welcome to the Smart Parking System</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="empId">EMP / ERP ID Number</label>
              <input 
                type="text" 
                id="empId"
                value={empId}
                onChange={handleEmpIdChange}
                placeholder="Enter your ID number"
                maxLength={10}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  id="password" 
                  placeholder="Enter your password"
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="captcha">Verification Code</label>
              <div className="captcha-container">
                <div className="captcha-display">
                  <span>{captcha}</span>
                  <button 
                    type="button" 
                    className="refresh-captcha"
                    onClick={generateCaptcha}
                    aria-label="Refresh Captcha"
                  >
                    <FaSync size={20} />
                  </button>
                </div>
                <input 
                  type="text" 
                  id="captcha"
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)}
                  placeholder="Enter the code above"
                  required
                  maxLength={6}
                />
                {captchaError && (
                  <span className="captcha-error">Invalid verification code</span>
                )}
              </div>
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
            </div>
            <div className="form-group">
              <Link href="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="home-component-in-two">
        <h1>Smart Parking System</h1>
        <h2>Department of Experimental Learning and Global Exploration</h2>
        <h4>KLEF (Deemed to be University)</h4>
      </div>
    </div>
  </div>
  );
}
