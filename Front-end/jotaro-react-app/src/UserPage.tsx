import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import './UserPage.css';
import { toast } from 'react-toastify';

interface UserPageProps {
  setUser: (user: any) => void;
}

const UserPage: React.FC<UserPageProps> = ({ setUser }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [termsText, setTermsText] = useState('');

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nid, setNid] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string; nid?: string }>({});

  useEffect(() => {
    if (showTerms) {
      fetch('/terms.txt')
        .then(res => res.text())
        .then(text => setTermsText(text))
        .catch(() => setTermsText('Failed to load terms.'));
    }
  }, [showTerms]);

  const validateSignup = () => {
    const newErrors: typeof errors = {};

    if (username.replace(/\s/g, '').length < 5) {
      newErrors.username = 'Username must be at least 5 characters (excluding spaces).';
      toast.error(newErrors.username);
    }

    if (!/^(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(password)) {
      newErrors.password = 'Password must be 8+ characters with numbers and symbols.';
      toast.error(newErrors.password);
    }

    if (!/^\d{10}$/.test(nid)) {
      newErrors.nid = 'NID must be exactly 10 digits.';
      toast.error(newErrors.nid);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
  const loadingToastId = toast.loading('Logging you in...');

  try {
    // Simulate server delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (loginUsername === 'sameer' && loginPassword === 'rickroll') {
      const user = {
        id: 1,
        name: 'sameer',
        userType: 'user',
      };

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

      setLoginError('Invalid username or password.');
    }
  } catch (err) {
    console.error('Login error:', err);

    toast.update(loadingToastId, {
      render: 'Something went wrong. Try again.',
      type: 'error',
      isLoading: false,
      autoClose: 3000,
    });

    setLoginError('Something went wrong. Try again.');
  }
};

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // ✅ prevent form reload
    if (isLogin) {
      handleLogin();
    } else {
      if (validateSignup()) {
        const toastId = toast.loading('Signing you up...');

setTimeout(() => {
  toast.update(toastId, {
    render: 'Signup successful!',
    type: 'success',
    isLoading: false,
    autoClose: 2500,
    closeOnClick: true,
  });

  // Optional: return to login screen
  setIsLogin(true);

  // Clear form
  setUsername('');
  setPassword('');
  setNid('');
  setAgreed(false);
  setErrors({});
}, 1500);
      }
    }
  };

  return (
    <div className="user-container">
      <div className="user-background">
        <video autoPlay loop muted className="background-video">
          <source src="/grass6.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/10 z-0"></div>
      </div>

      <div className="login-box-user">
        <div className="login-toggle-container">
          <button
            className="login-btn-user"
            onClick={() => {
              setIsLogin(true);
              setAgreed(false);
              setShowTerms(false);
              setErrors({});
              setLoginError('');
              setLoginUsername('');
              setLoginPassword('');
            }}
            style={{ width: '45%', backgroundColor: isLogin ? 'crimson' : '#333' }}
          >
            Login
          </button>
          <button
            className="login-btn-user"
            onClick={() => {
              setIsLogin(false);
              setAgreed(false);
              setShowTerms(false);
              setErrors({});
              setUsername('');
              setPassword('');
              setNid('');
            }}
            style={{ width: '50%', backgroundColor: !isLogin ? 'orange' : '#333' }}
          >
            Sign Up
          </button>
        </div>

        <h2 className="user-title">{isLogin ? 'User Login' : 'User Sign Up'}</h2>

        {/* ✅ Added form wrapper for Enter key */}
        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <input
                type="text"
                placeholder="Enter Username"
                className="login-input-user"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
              />
              <div className="password-wrapper-user">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Enter Password"
                  className="login-input-user"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <span
                  className="password-icon-user"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </span>
              </div>
              {loginError && <div className="error-text-user">{loginError}</div>}
              <div className="forgot-password-user">
                <a href="#">Forgot Password?</a>
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter Username"
                className="login-input-user"
                disabled={!agreed}
                style={{ backgroundColor: agreed ? 'transparent' : '#555' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <div className="error-text-user">{errors.username}</div>}

              <div className="password-wrapper-user">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Create Password"
                  className="login-input-user"
                  disabled={!agreed}
                  style={{ backgroundColor: agreed ? 'transparent' : '#555' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="password-icon-user"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </span>
              </div>
              {errors.password && <div className="error-text-user">{errors.password}</div>}

              <input
                type="text"
                placeholder="Enter NID"
                className="login-input-user"
                disabled={!agreed}
                style={{ backgroundColor: agreed ? 'transparent' : '#555' }}
                value={nid}
                onChange={(e) => {
                  const input = e.target.value.replace(/\D/g, '');
                  if (input.length <= 10) setNid(input);
                }}
              />
              {errors.nid && <div className="error-text-user">{errors.nid}</div>}

              <div className="terms-checkbox-user">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                />
                <span className="terms-text-user">
                  I agree to the{' '}
                  <span className="terms-link-user" onClick={() => setShowTerms(true)}>
                    Terms & Conditions
                  </span>
                </span>
              </div>
            </>
          )}

          <div className="login-buttons-user">
            <button type="button" className="back-btn-user" onClick={() => navigate('/')}>
              Back
            </button>
            <button
              type="submit"
              className="login-btn-user"
              disabled={!isLogin && !agreed}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>

      {showTerms && (
        <div className="terms-popup-user">
          <div className="terms-content-user">
            <h3>Terms & Conditions</h3>
            <pre>{termsText}</pre>
            <button onClick={() => setShowTerms(false)} className="close-terms-btn-user">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
