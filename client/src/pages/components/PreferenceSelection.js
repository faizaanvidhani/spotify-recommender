import React, { useEffect, useState } from 'react';
import ManuallyInputAudioFeatures from './ManuallyInputAudioFeatures';
import MyCurrentTopTracks from './MyCurrentTopTracks';
import '../../assets/css/components/PreferenceSelection.css';
import BlackFindIcon from "../../assets/images/black-find-icon.svg";
import Spinner from "../../assets/images/spinner.svg";
  
export default function PreferenceSelection(props) {
    const [preference, setPreference] = useState(null);
    const [buttonXActive, setButtonXActive] = useState(false); // CURRENT TOP TRACKS button
    const [buttonYActive, setButtonYActive] = useState(false); // MANUALLY INPUT FEATURES button
    const [preferenceMessage, setPreferenceMessage] = useState(null);

    // handles toggling of CURRENT TOP TRACKS button
    const handleButtonX = () => {
        console.log(props.audio)
        if (!buttonXActive) {
            setPreference("CURRENT_TOP_TRACKS");
            setPreferenceMessage("Nice! You have indicated that you want to use your current top tracks.")
            setButtonYActive(false);
            props.setSelectedPreference("CURRENT_TOP");
        }
        setButtonXActive(!buttonXActive);
    }

    // handles toggling of MANUALLY INPUT FEATURES button
    const handleButtonY = () => {
        console.log(props.audio)
        if (!buttonYActive) {
            setPreference("MANUALLY_INPUT_AUDIO_FEATURES");
            setPreferenceMessage("Awesome! You have indicated that you want to manually input audio features.")
            props.setAudioFeaturePreferences([50, 50, 50, 50, 50, 50, 50]);
            setButtonXActive(false);
            props.setSelectedPreference("MANUALLY_INPUT");
        }
        setButtonYActive(!buttonYActive);
    }

    useEffect(() => {
        if (!buttonXActive && !buttonYActive) {
            setPreference(null);
            setPreferenceMessage(null);
            props.setSelectedPreference(null);
        }
      }, [props, buttonXActive, buttonYActive]);

    const handleSearch = () => {
        if (preference === "CURRENT_TOP_TRACKS") {
            props.fetchPersonalizedResults();
        } else if (preference === "MANUALLY_INPUT_AUDIO_FEATURES") {
            props.fetchManualInputAudioFeaturesResults();
        }
    }

    return (
      <div className="preference-blue-box">
        <p className="preference-box-heading">Music Preferences Selection</p>
        <div className="preference-row">
            <p className="preference-box-body">
                The recommender will find songs based on your personal music taste. The recommender
                can use your current top tracks. Or, you can manually input audio features. When you
                are ready, click search!
            </p>
            <div className="preference-buttons">
                <p onClick={handleButtonX} className={buttonXActive ? 'preference-button button-active' : "preference-button"}>My current top tracks</p>
                <p onClick={handleButtonY} className={buttonYActive ? 'preference-button button-active' : "preference-button"}>Manually input audio features</p>
                
                {props.loading ? 
                // show spinner if results are being fetched
                <div>
                    <img src={Spinner} className="spinner" alt="spinner"></img>
                </div> : 
                // show search button to fetch results
                <div onClick={handleSearch} className="search-button">
                    <p>Search</p>
                    <img src={BlackFindIcon} className="find-icon" alt="find icon"></img>
                </div>
                }
            </div>
        </div>

        <div>

        <div className="preference-row">
            <div ref={props.resultsRef}>
                {
                preferenceMessage != null ?
                <p className="preference-box-body">
                    {preferenceMessage}
                </p> : null
                }
                {preference != null ? (preference !== "CURRENT_TOP_TRACKS" ? <ManuallyInputAudioFeatures setAudioFeaturePreferences={props.setAudioFeaturePreferences}/> : <MyCurrentTopTracks tracks={props.topTracksData}/>) : null}
            </div>  

        </div>
        </div>
      </div>
    );
  };