"use client";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaSync } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [empId, setEmpId] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userCaptcha !== captcha) {
      setCaptchaError(true);
      return;
    }

    try {
      const password = (document.getElementById('password') as HTMLInputElement).value;
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          empId,
          password,
        }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!data.user) {
        console.error('No user data in response:', data);
        alert('Login successful but user data is missing. Please contact support.');
        return;
      }

      if (response.ok && data.user) {
        console.log('User role:', data.user.role);
        if (data.user.role === 'admin') {
          router.replace('/dashboard/admin');
        } else if (data.user.role === 'superadmin') {
          router.replace('/dashboard/superadmin');
        } else {
          alert('Invalid user role');
        }
      } else {
        console.log('Login failed:', data);
        alert(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
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
            <div className="form-group captcha-group">
              <label htmlFor="captcha">Security Check</label>
              <div className="captcha-container">
                <div className="captcha-box">
                  <span className="captcha-text">{captcha}</span>
                  <button 
                    type="button" 
                    className="captcha-refresh"
                    onClick={generateCaptcha}
                    aria-label="Refresh Captcha"
                  >
                    <FaSync />
                  </button>
                </div>
                <div className="captcha-input-group">
                  <input 
                    type="text" 
                    id="captcha"
                    value={userCaptcha}
                    onChange={(e) => setUserCaptcha(e.target.value)}
                    placeholder="Enter code"
                    required
                    maxLength={6}
                    className={captchaError ? 'error' : ''}
                  />
                  {captchaError && (
                    <span className="error-message">Invalid code</span>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
            </div>
            <div className="form-group">
              <Link href="/auth/forgotpassword" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>
          </form>
          <div className="footer">
            <div className="footer-links">
              <Link href="/maintenance/terms">Terms & Conditions</Link>
              <span className="footer-divider">•</span>
              <Link href="/maintenance/privacy">Privacy Policy</Link>
            </div>
            <div className="footer-info">
              <p>&copy; {new Date().getFullYear()} KLEF (Deemed to be University)</p>
              <p>Developed by <a href="https://www.dineshkorukonda.in" target="_blank" rel="noopener noreferrer">2300030350 - Dinesh Korukonda</a></p>
            </div>
          </div>
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
