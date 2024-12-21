"use client";
import Logo from "../../Assets/kllogo.png"
import Image from "next/image"
import './page.css';
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        empNumber: "",
        email: "",
        captcha: ""
    });
    const [captchaQuestion, setCaptchaQuestion] = useState({ num1: 0, num2: 0 });
    const [isVerified, setIsVerified] = useState(false);

    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        setCaptchaQuestion({ num1, num2 });
        setFormData(prev => ({ ...prev, captcha: "" }));
        setIsVerified(false);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Verify captcha when user types
        if (name === 'captcha') {
            const sum = captchaQuestion.num1 + captchaQuestion.num2;
            setIsVerified(parseInt(value) === sum);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isVerified) {
            toast.error("Please complete the captcha correctly");
            return;
        }

        try {
            // Add your API call here
            toast.loading("Processing your request...");
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            toast.success("Password reset link sent to your email");
            setFormData({ empNumber: "", email: "", captcha: "" });
            generateCaptcha();
        } catch (err) {
            console.error('Error:', err);
            toast.error("Failed to process your request. Please try again.");
        }
    };

    return ( 
        <div className="forgotpassword-component">
            <div className="forgotpassword-component-in">
                <div className="forgotpassword-component-logo">
                    <Image src={Logo} alt="logo" width={100} height={100} />
                </div>
                <div className="forgotpassword-component-in-heading">
                    <h1>Forgot Password</h1>
                </div>
                <div className="forgotpassword-component-in-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="empNumber">EMP Number</label>
                            <input 
                                type="text" 
                                name="empNumber" 
                                id="empNumber" 
                                placeholder="Enter your employee number"
                                value={formData.empNumber}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="captcha">Recaptive</label>
                            <div className="captcha-container">
                                <div className="captcha-question">
                                    {captchaQuestion.num1} + {captchaQuestion.num2} = 
                                </div>
                                <input 
                                    type="number" 
                                    name="captcha"
                                    id="captcha"
                                    placeholder="Enter sum"
                                    value={formData.captcha}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group-button">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default ForgotPassword;