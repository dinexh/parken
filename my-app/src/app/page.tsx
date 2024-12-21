"use client";

import React, { useState, useEffect } from "react";
import Footer from "./components/footer/footer";
import { toast } from "react-hot-toast";

export default function Home() {
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
    <div className="home-component">
      <div className="home-component-in">
        <form className="home-component-in-form" onSubmit={handleSubmit}>
          <div className="home-component-in-form-heading">
            <h1>Koneru Lakshmaiah Education Foundation</h1>
            <h2>(Deemed to be University)</h2>
            <h2>Department of EL&GE</h2>
            <p>Parking System Admin portal</p>
          </div>
          <div className="home-component-in-form-main">
            <div className="form-group">
              <input 
                type="text" 
                id="username" 
                placeholder=" "
                required 
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-group">
              <input 
                type="password" 
                id="password" 
                placeholder=" "
                required 
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-group-recaptive">
              <p>Solve this: {num1} + {num2} = </p>
              <input
                type="number"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Enter the sum"
                required
              />
            </div>
            <div className="form-group-login-button">
              <button type="submit">Login</button>
            </div>
            <div className="form-group-forgot-password">
              <p>Forgot Password?</p>
            </div>
          </div>
        </form>
      </div>
      <div className="home-component-footer">
        <Footer />
      </div>
    </div>
  );
}
