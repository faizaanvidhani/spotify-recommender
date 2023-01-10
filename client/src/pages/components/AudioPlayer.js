// https://stackoverflow.com/questions/47686345/playing-sound-in-react-js

import React, { useEffect, useState } from 'react';
import '../../assets/css/components/AudioPlayer.css';
import PlayImage from "../../assets/images/play-button.svg";
import PauseImage from "../../assets/images/pause-button.svg";


const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
  
    const toggle = () => setPlaying(!playing);
  
    useEffect(() => {
        playing ? audio.play() : audio.pause();
      },
      [playing]
    );
  
    useEffect(() => {
      audio.addEventListener('ended', () => setPlaying(false));
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
      };
    }, []);
  
    return [playing, toggle];
  };
  
  export default function Player (props) {
    const [playing, toggle] = useAudio(props.url);
  
    return (
      <div>
        {playing ? 
        <img className="audio-button" onClick={toggle} src={PauseImage} alt="spotify logo"></img> :
        <img className="audio-button" onClick={toggle} src={PlayImage} alt="spotify logo"></img>
        } 
      </div>
    );
  };