import { useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import{ getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from './components/Player';
import { useDataLayerValue } from './components/DataLayer';

const s = new SpotifyWebApi();


function App() {
  
  const[{token}, dispatch] = useDataLayerValue();
  

  //Run code based on a given condition
  useEffect(() => {
    const hash = getTokenFromUrl();

    window.location.hash = "";

    const _token = hash.access_token;

    if(_token){
      s.setAccessToken(_token);

      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });

      dispatch({
        type: "SET_SPOTIFY",
        spotify: s,
      });

      s.getMe().then((user) =>{
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });

      s.getUserPlaylists().then((playlists) =>{
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists,
        });
      });

      s.getPlaylist('37i9dQZEVXcMCctk2TqvpA').then((response) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
      })
    });

    s.getMe().then((user) => {
      dispatch({
        type: "SET_USER",
        user,
      });
    });

    s.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

    }
  }, [token, dispatch]);


  return (
    <div className="app">
      {
        token ? <Player spotify ={s}/> : <Login />
      }
    </div>
  );
}

export default App;
