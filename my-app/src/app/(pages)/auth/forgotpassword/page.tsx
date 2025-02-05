"use client";
import { useState } from "react";
import Link from 'next/link';

export default function ForgotPassword() {
  const [empId, setEmpId] = useState('');

  // Validation for numbers only
  const handleEmpIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setEmpId(value);
    }
  };

  return (
  <div className="home-component">
    <div className="home-component-in">
      <div className="home-component-in-one">
        <div className="home-component-in-one-in">
          <div className="home-component-in-one-in-heading">
            <h1>Forgot Password</h1>
            <p className="auth-subtitle">Enter your EMP/ERP ID to reset password</p>
          </div>
          <form action="">
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
              <button type="submit">Send Reset Link</button>
            </div>
            <div className="form-group">
              <Link href="/" className="back-to-login">
                Back to Login
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