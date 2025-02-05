"use client";
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import '../maintenance.css';
export default function PrivacyPolicy() {
  return (
    <div className="maintenance-page">
      <div className="maintenance-container">
        <Link href="/" className="back-button">
          <FaArrowLeft /> Back to Home
        </Link>
        <h1>Privacy Policy</h1>

        <section>
          <h2>1. Information We Collect</h2>
          <ul>
            <li>ERP/EMP ID number</li>
            <li>Name and contact information</li>
            <li>Vehicle registration details</li>
            <li>Parking usage data</li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>Manage parking access and permissions</li>
            <li>Ensure system security</li>
            <li>Communicate important updates</li>
            <li>Improve our services</li>
          </ul>
        </section>

        <section>
          <h2>3. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
        </section>

        <section>
          <h2>4. Data Sharing</h2>
          <p>Your information is only shared with authorized university personnel and will not be disclosed to third parties without your consent, except as required by law.</p>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <ul>
            <li>Access your personal data</li>
            <li>Request corrections to your information</li>
            <li>Opt-out of non-essential communications</li>
            <li>Request data deletion (subject to university policies)</li>
          </ul>
        </section>

        <footer className="maintenance-footer">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          <p>KLEF Smart Parking System</p>
        </footer>
      </div>
    </div>
  );
} 