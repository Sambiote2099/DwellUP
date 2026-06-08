import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import './AgentPage.css';
import { toast } from 'react-toastify';

interface AgentPageProps {
  setUser: (user: any) => void;
}

const AgentPage: React.FC<AgentPageProps> = ({ setUser }) => {
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
        userType: 'agent',
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
    if (e) e.preventDefault(); // ✅ prevent page reload
    if (isLogin) {
      handleLogin();
    } else {
      const isValid = validateSignup();
      if (!isValid) return;

      const loadingToastId = toast.loading('Signing you up...');

setTimeout(() => {
  toast.update(loadingToastId, {
    render: 'Signup successful!',
    type: 'success',
    isLoading: false,
    autoClose: 2500,
    closeOnClick: true,
  });

  // Optional: switch back to login page
  setIsLogin(true);

  // Clear signup fields
  setUsername('');
  setPassword('');
  setNid('');
  setAgreed(false);
}, 1500);
    }
  };

  return (
    <div className="agent-container">
      <div className="agent-background">
        <video autoPlay loop muted className="background-video">
          <source src="/grass4.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/10 z-0"></div>
      </div>

      <div className="login-box-agent">
        <div className="login-toggle-container">
          <button
            className="login-btn-agent"
            onClick={() => {
              setIsLogin(true);
              setAgreed(false);
              setShowTerms(false);
              setErrors({});
              setLoginError('');
              setLoginUsername('');
              setLoginPassword('');
            }}
            style={{ width: '45%', backgroundColor: isLogin ? '#ff6600' : '#333' }}
          >
            Login
          </button>

          <button
            className="login-btn-agent"
            onClick={() => {
              setIsLogin(false);
              setAgreed(false);
              setShowTerms(false);
              setErrors({});
              setUsername('');
              setPassword('');
              setNid('');
            }}
            style={{ width: '50%', backgroundColor: !isLogin ? '#b40101' : '#333' }}
          >
            Sign Up
          </button>
        </div>

        <h2 className="agent-title">{isLogin ? 'Agent Login' : 'Agent Sign Up'}</h2>

        {/* ✅ Wrap in a form to enable Enter key submit */}
        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <input
                type="text"
                placeholder="Enter Username"
                className="login-input-agent"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
              />
              <div className="password-wrapper-agent">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Enter Password"
                  className="login-input-agent"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <span
                  className="password-icon-agent"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </span>
              </div>
              {loginError && <div className="error-text-agent">{loginError}</div>}
              <div className="forgot-password-agent">
                <a href="#">Forgot Password?</a>
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter Username"
                className="login-input-agent"
                disabled={!agreed}
                style={{ backgroundColor: agreed ? 'transparent' : '#555' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <div className="error-text-agent">{errors.username}</div>}

              <div className="password-wrapper-agent">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Create Password"
                  className="login-input-agent"
                  disabled={!agreed}
                  style={{ backgroundColor: agreed ? 'transparent' : '#555' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="password-icon-agent"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </span>
              </div>
              {errors.password && <div className="error-text-agent">{errors.password}</div>}

              <input
                type="text"
                placeholder="Enter NID"
                className="login-input-agent"
                disabled={!agreed}
                style={{ backgroundColor: agreed ? 'transparent' : '#555' }}
                value={nid}
                onChange={(e) => {
                  const input = e.target.value.replace(/\D/g, '');
                  if (input.length <= 10) setNid(input);
                }}
              />
              {errors.nid && <div className="error-text-agent">{errors.nid}</div>}

              <div className="terms-checkbox-agent">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                />
                <span className="terms-text-agent">
                  I agree to the{' '}
                  <span className="terms-link-agent" onClick={() => setShowTerms(true)}>
                    Terms & Conditions
                  </span>
                </span>
              </div>
            </>
          )}

          <div className="login-buttons-agent">
            <button type="button" className="back-btn-agent" onClick={() => navigate('/')}>
              Back
            </button>
            <button
              type="submit"
              className="login-btn-agent"
              disabled={!isLogin && !agreed}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>

      {showTerms && (
        <div className="terms-popup-agent">
          <div className="terms-content-agent">
            <h3>Terms & Conditions</h3>
            <pre>{termsText}</pre>
            <button
              onClick={() => setShowTerms(false)}
              className="close-terms-btn-agent"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentPage;
