import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../assets/css/components/PreferenceSelection.css';
  
export default function PreferenceSelection(props) {
    const [buttonXActive, setButtonXActive] = useState(false);
    const [buttonYActive, setButtonYActive] = useState(false);
    const [preferenceMessage, setPreferenceMessage] = useState(null);

    const handleButtonX = () => {
        if (!buttonXActive) {
            setPreferenceMessage("Nice! You have indicated that you want to use your current top tracks.")
            setButtonYActive(false);
            props.setSelectedPreference("CURRENT_TOP");
        }
        setButtonXActive(!buttonXActive);
    }

    const handleButtonY = () => {
        if (!buttonYActive) {
            setPreferenceMessage("Awesome! You have indicated that you want to manually input audio features.")
            setButtonXActive(false);
            props.setSelectedPreference("MANUALLY_INPUT");
        }
        setButtonYActive(!buttonYActive);
    }


    useEffect(() => {
        if (!buttonXActive && !buttonYActive) {
            setPreferenceMessage(null);
            props.setSelectedPreference(null);
        }
      }, [buttonXActive, buttonYActive]);

    return (
      <div className="preference-blue-box">
        <p className="preference-box-heading">Music Preferences Selection</p>
        <div className="preference-row">
            <p className="preference-box-body">
                Choose between your current top tracks or 
                manually inputting audio features. 
            </p>
            <div className="preference-buttons">
                    <p onClick={handleButtonX} className={buttonXActive ? 'preference-button button-active' : "preference-button"}>My current top tracks</p>
                    <p onClick={handleButtonY} className={buttonYActive ? 'preference-button button-active' : "preference-button"}>Manually input audio features</p>
            </div>
        </div>

        <div>

        <div className="preference-row">
            <div>
                {
                preferenceMessage != null ?
                <p className="preference-box-body">
                    {preferenceMessage}
                </p> : null
                }
            </div>  

        </div>


            
            

        </div>


    
      </div>
    );
  };