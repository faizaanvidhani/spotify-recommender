import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/Home.css'; 
import SpotifyLogo from "../assets/images/spotify-logo.svg";

export default function Home() {
  const [authUrl, setAuthUrl] = useState(null);

  // fetches auth url that directs a user to login with Spotify
  useEffect(() => {
    async function fetchAuthUrl() {
        try {
            const response = await axios.get('/login');
            setAuthUrl(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    fetchAuthUrl();
  }, []);

  return (
    <div className="blue">
      <div className="home-elements">
        <p className="home-title">Diversify</p>
        <p className="home-body">
          Find the latest tracks from countries all over the world similar to your top tracks.
        </p>
        <a className= "home-button-link" href={authUrl}>
          <div className="home-button">
            <p className="home-button-text">Log in with Spotify</p>
            <img src={SpotifyLogo} className="spotify-logo" alt="spotify logo"></img>
          </div>
        </a>
      </div>
    </div>
    )
  }