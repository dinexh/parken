"use client";
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import '../maintenance.css';
export default function TermsAndConditions() {
  return (
    <div className="maintenance-page">
      <div className="maintenance-container">
        <Link href="/" className="back-button">
          <FaArrowLeft /> Back to Home
        </Link>
        <h1>Terms and Conditions</h1>
        
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using the Smart Parking System, you agree to be bound by these Terms and Conditions.</p>
        </section>

        <section>
          <h2>2. System Usage</h2>
          <ul>
            <li>Users must be current KLEF students or staff members</li>
            <li>Valid ERP/EMP ID is required for system access</li>
            <li>Users are responsible for maintaining their account security</li>
            <li>Sharing of access credentials is strictly prohibited</li>
          </ul>
        </section>

        <section>
          <h2>3. Parking Rules</h2>
          <ul>
            <li>Park only in designated areas</li>
            <li>Display valid parking permit</li>
            <li>Follow all posted signs and instructions</li>
            <li>Maintain vehicle security</li>
          </ul>
        </section>

        <section>
          <h2>4. User Responsibilities</h2>
          <ul>
            <li>Provide accurate information</li>
            <li>Update personal information as needed</li>
            <li>Report system issues promptly</li>
            <li>Follow campus parking regulations</li>
          </ul>
        </section>

        <section>
          <h2>5. Modifications</h2>
          <p>KLEF reserves the right to modify these terms at any time. Users will be notified of significant changes.</p>
        </section>

        <footer className="maintenance-footer">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          <p>KLEF Smart Parking System</p>
        </footer>
      </div>
    </div>
  );
} 