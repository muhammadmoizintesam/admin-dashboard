'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    if (!authLoading && isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, authLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(email, password);
    if (success) {
      router.push('/');
    }
    setIsLoading(false);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
          min-height: 100vh;
          /* Static Background Image Replacement */
          background-image: url('/img/bg2.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          overflow: hidden;
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
        }

        /* Glass Card */
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 48px 40px;
          width: 100%;
          max-width: 420px;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.3),
            0 0 100px rgba(66, 165, 245, 0.1),
            inset 0 1px 1px rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 10;
          animation: card-appear 0.8s ease-out;
        }

        @keyframes card-appear {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Logo */
        .logo-container {
          text-align: center;
          margin-bottom: 32px;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .logo-icon {
          width: 50px;
          height: 50px;
          margin: 0 auto 12px;
          background: linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(30, 136, 229, 0.4);
        }

        .logo-icon svg {
          width: 28px;
          height: 28px;
          fill: white;
        }

        /* Title */
        .login-title {
          text-align: center;
          margin-bottom: 32px;
        }

        .login-title h1 {
          font-size: 28px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .login-title p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Form */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          position: relative;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-wrapper svg {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          fill: rgba(255, 255, 255, 0.4);
          transition: fill 0.3s;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          font-size: 15px;
          color: #ffffff;
          font-family: 'Poppins', sans-serif;
          transition: all 0.3s ease;
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .form-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(66, 165, 245, 0.6);
          box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.2);
        }

        .form-input:focus + svg,
        .input-wrapper:focus-within svg {
          fill: #42a5f5;
        }

        /* Forgot Password */
        .forgot-password {
          text-align: right;
          margin-top: -8px;
        }

        .forgot-password a {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.3s;
        }

        .forgot-password a:hover {
          color: #42a5f5;
        }

        /* Sign In Button */
        .sign-in-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          margin-top: 8px;
        }

        .sign-in-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
        }

        .sign-in-btn:active {
          transform: translateY(0);
        }

        .sign-in-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          margin: 28px 0;
          gap: 16px;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        }

        .divider-text {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          white-space: nowrap;
        }

        /* Social Login */
        .social-login {
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        .social-btn {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .social-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
        }

        .social-btn svg {
          width: 24px;
          height: 24px;
        }

        /* Register Link */
        .register-link {
          text-align: center;
          margin-top: 28px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
        }

        .register-link a {
          color: #42a5f5;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }

        .register-link a:hover {
          color: #64b5f6;
          text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .glass-card {
            padding: 36px 24px;
            border-radius: 20px;
          }

          .login-title h1 {
            font-size: 24px;
          }

          .social-btn {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>

      <div className="login-container">
        {/* Glass Login Card */}
        <div className="glass-card">
          {/* Title */}
          <div className="login-title">
            <h1>Login</h1>
            <p>Welcome back! Please login to your account.</p>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
              </div>
            </div>

            <button type="submit" className="sign-in-btn" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}