import React, { useEffect } from 'react';
import { googleLogin } from '../api/auth';

declare global {
  interface Window {
    gapi: any;
  }
}

const GoogleLogin: React.FC = () => {
  useEffect(() => {
    const loadGoogleSDK = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = initializeGoogleSignIn;
    };

    const initializeGoogleSignIn = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: 'YOUR_GOOGLE_CLIENT_ID',
        });
      });
    };

    loadGoogleSDK();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const googleUser = await window.gapi.auth2.getAuthInstance().signIn();
      const googleToken = googleUser.getAuthResponse().id_token;
      const response = await googleLogin(googleToken);
      console.log('Google login successful', response);
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error('Google login failed', error);
      // Handle login error
    }
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;