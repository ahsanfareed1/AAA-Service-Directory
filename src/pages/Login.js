import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

function Login({ onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const userData = {
        email: cred.user.email,
        uid: cred.user.uid,
        displayName: cred.user.displayName
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      const userData = {
        email: cred.user.email,
        uid: cred.user.uid,
        displayName: cred.user.displayName
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      setError('Google sign in failed');
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const cred = await signInWithPopup(auth, facebookProvider);
      const userData = {
        email: cred.user.email,
        uid: cred.user.uid,
        displayName: cred.user.displayName
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      setError('Facebook sign in failed');
    }
  };

  return (
    <div
      className="auth-modal relative bg-white p-6 rounded shadow-md w-full"
      style={{ maxWidth: '600px', width: '90%' }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p className="text-right text-sm">
          <a href="#" className="text-blue-600 underline">Forgot password?</a>
        </p>
        <button type="submit" className="auth-button">Login</button>
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
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => {
            onClose();
            onSwitchToSignup && onSwitchToSignup();
          }}
          className="text-blue-600 underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default Login;