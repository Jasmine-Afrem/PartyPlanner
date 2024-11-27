import './Login.css'; // Add this line at the top of your Login.js file
import React, { useState, useEffect } from 'react'; // Import useEffect
import { auth } from './firebaseConfig'; // Import the auth instance
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Import Google login methods
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Check if the user is already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/party-planner'); // Redirect if user is already logged in
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/party-planner'); // Redirect to party planner page after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/party-planner'); // Redirect to party planner page after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="form-container">
      <p className="title">Welcome!</p>
      <form className="form" onSubmit={handleLogin}>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <p className="page-link">
          <span className="page-link-label">Forgot Password?</span>
        </p>
        <button type="submit" className="form-btn">Log in</button>
      </form>
      <p className="sign-up-label">
        Don't have an account?
        <span 
          className="sign-up-link" 
          onClick={() => navigate('/signup')} // Navigate to sign-up page on click
          style={{ cursor: 'pointer', textDecoration: 'underline', color: 'teal' }}
        >
          Sign up
        </span>
      </p>
      <div className="buttons-container">
        <div className="google-login-button" onClick={handleGoogleLogin}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            version="1.1"
            x="0px"
            y="0px"
            className="google-icon"
            viewBox="0 0 48 48"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <span>Log in with Google</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
