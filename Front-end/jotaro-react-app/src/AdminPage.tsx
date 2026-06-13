import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import './AdminPage.css';
import { toast } from 'react-toastify';

interface AdminPageProps {
  setUser: (user: any) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
  const loadingToastId = toast.loading('Logging you in...');

  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (username === 'sameer' && password === 'rickroll') {
      const user = {
        id: 1,
        name: 'sameer',
        userType: 'admin',
      };

      console.log('Logged in as:', user);

      setUser(user);

      setTimeout(() => {
        toast.update(loadingToastId, {
          render: 'Login successful!',
          type: 'success',
          isLoading: false,
          autoClose: 2200,
          closeOnClick: true,
        });

        navigate('/home');
      }, 1500);

    } else {
      toast.update(loadingToastId, {
        render: 'Invalid username or password.',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });

      setError('Invalid username or password.');
    }
  } catch (err) {
    console.error('Login error:', err);

    toast.update(loadingToastId, {
      render: 'Something went wrong. Try again.',
      type: 'error',
      isLoading: false,
      autoClose: 3000,
    });

    setError('Something went wrong. Try again.');
  }
};


  return (
    <div className="admin-container">
      <div className="admin-background">
        <video autoPlay loop muted className="background-video">
          <source src="/grass3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/10 z-0"></div>
      </div>

      <div className="login-box">
        <h2 className="admin-title">Admin Login</h2>
      
          <form
          onSubmit={(e) => {
            e.preventDefault(); // prevent page reload
            handleLogin();
          }}
        >
          <input
            type="text"
            placeholder="Enter Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Enter Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </span>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="forgot-password-admin">
            <a href="#">Forgot Password?</a>
          </div>

          <div className="login-buttons">
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate('/')}
            >
              Back
            </button>
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
