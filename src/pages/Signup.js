import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';

const cities = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta'
];

const Signup = ({ onClose, onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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

  const handleNext = async (e) => {
    e.preventDefault();
    setError('');

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setLoading(true);
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
      onClose();
      navigate('/');
    } catch (error) {
      setError('Error creating account. Please try again.');
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
    } catch (error) {
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
    } catch (error) {
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign Up for AAA</h2>
          <p className="text-gray-600">Connect with great local businesses</p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleNext} className="space-y-4 mb-6">
          {step === 1 && (
            <>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                  disabled={loading}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
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
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                  disabled={loading}
                />
                {password && (
                  <div className="mt-2">
                    <div className={`text-sm font-medium ${
                      passwordStrength === 'Strong' ? 'text-green-600' :
                      passwordStrength === 'Moderate' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {passwordStrength} password
                    </div>
                    <div className="flex space-x-1 mt-1">
                      <div className={`h-1 w-1/3 rounded ${passwordStrength !== 'Weak' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className={`h-1 w-1/3 rounded ${passwordStrength === 'Strong' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className={`h-1 w-1/3 rounded ${passwordStrength === 'Strong' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Use at least 8 characters with a number, symbol and uppercase letter for a strong password.
                </p>
              </div>
            </>
          )}

          {step === 3 && (
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                list="city-list"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter your city"
                required
                disabled={loading}
              />
              <datalist id="city-list">
                {cities.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Processing...' : step < 3 ? 'Continue' : 'Sign Up'}
          </button>
        </form>

        {step === 1 && (
          <>
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
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
          </>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already on AAA?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-red-600 hover:text-red-500 font-medium"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;