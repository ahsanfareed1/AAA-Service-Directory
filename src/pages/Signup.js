import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../App';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import './Auth.css';

const Signup = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const evaluatePasswordStrength = (pwd) => {
    let strength = 'Weak';
    if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) {
      strength = 'Strong';
    } else if (pwd.length >= 6) {
      strength = 'Moderate';
    }
    return strength;
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setPasswordStrength(evaluatePasswordStrength(val));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    try {
      const displayName = `${firstName} ${lastName}`.trim();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });

      const userData = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        displayName,
        address
      };

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      setError('Error creating account. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
      setIsAuthenticated(true);
    } catch (error) {
      setError('Error with Google sign in');
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate('/');
      setIsAuthenticated(true);
    } catch (error) {
      setError('Error with Facebook sign in');
    }
  };

  return (
    <div
      className="auth-container relative bg-white p-6 rounded shadow-md w-full"
      style={{ maxWidth: '600px' }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          {step === 1 && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                {password && (
                  <p className="text-sm mt-1">{passwordStrength} password</p>
                )}
                <small className="text-gray-500">
                  Use at least 8 characters with a number, symbol and uppercase
                  letter for a strong password.
                </small>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="auth-button">
            {step < 3 ? 'Continue' : 'Sign Up'}
          </button>
        </form>
        <div className="social-auth mt-4">
          <button onClick={handleGoogleSignIn} className="social-button google-button">
            <i className="fab fa-google"></i>
            Continue with Google
          </button>
          <button onClick={handleFacebookSignIn} className="social-button facebook-button">
            <i className="fab fa-facebook"></i>
            Continue with Facebook
          </button>
        </div>
        <p className="auth-switch mt-4">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;