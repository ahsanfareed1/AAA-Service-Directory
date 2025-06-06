import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

function Login({ onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
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
      onClose();
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const cred = await signInWithPopup(auth, googleProvider);
      const userData = {
        email: cred.user.email,
        uid: cred.user.uid,
        displayName: cred.user.displayName
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      onClose();
      navigate('/');
    } catch (err) {
      setError('Google sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setLoading(true);
      const cred = await signInWithPopup(auth, facebookProvider);
      const userData = {
        email: cred.user.email,
        uid: cred.user.uid,
        displayName: cred.user.displayName
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      onClose();
      navigate('/');
    } catch (err) {
      setError('Facebook sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
      >
        ✕
      </button>
      
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Log In to AAA</h2>
          <p className="text-gray-600">Connect with great local businesses</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
              disabled={loading}
            />
          </div>

          <div className="text-right">
            <a href="/forgot-password" className="text-sm text-red-600 hover:text-red-500">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or log in with</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <i className="fab fa-google text-red-500 mr-2"></i>
            Continue with Google
          </button>
          
          <button
            onClick={handleFacebookSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <i className="fab fa-facebook text-blue-600 mr-2"></i>
            Continue with Facebook
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            New to AAA?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-red-600 hover:text-red-500 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;