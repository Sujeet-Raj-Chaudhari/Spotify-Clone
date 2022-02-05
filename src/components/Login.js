import React from 'react';
import { loginUrl } from '../spotify';
import './Login.css';

function Login() {
  return (
    <div className = "login">
        <h1>I am the Login page</h1>
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt="" />
        {/* Spotify Logo */}
        {/* Login With Spotify button */}

        <a href = {loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
    );
}

export default Login;
