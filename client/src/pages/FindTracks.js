import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import CountrySelection from './components/CountrySelection';
import PreferenceSelection from './components/PreferenceSelection';
import ManuallyInputAudioFeatures from './components/ManuallyInputAudioFeatures';
import MyCurrentTopTracks from './components/MyCurrentTopTracks';
import Search from './components/Search';
import '../assets/css/FindTracks.css';

export default function FindTracks() {
    const preferenceA = "CURRENT_TOP";
    const preferenceB = "MANUALLY_INPUT";
    const [countryCode, setCountryCode] = useState(null);
    const [selectedPreference, setSelectedPreference] = useState(null);
    const [audioFeaturePreferences, setAudioFeaturePreferences] = useState([50, 50, 50, 50, 50, 50, 50]);
    const [results, setResults] = useState([]);
    const [topTracksData, setTopTracksData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('getTracks');
                setTopTracksData(response.data);
                console.log("SUCCESS", response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
      }, []);

    const fetchPersonalizedResults = async () => {
        try {
            const response = await axios.get(`/search/${countryCode}`);
            console.log("SUCCESS", response);
            setResults(response.data);
            console.log(countryCode);
            console.log("setting results")
            // navigate('/')
          } catch (error) {
              console.log(error)
          }
        }
    
    const fetchManualInputAudioFeaturesResults = async () => {
        try {
            const response = await axios.post(`/search/manual-input/results/${countryCode}`, audioFeaturePreferences);
            console.log("SUCCESS", response);
            setResults(response.data);
            } catch (error) {
                console.log(error)
            }
        }


    return (
        <div>
            <Header/>
            <div className="find-tracks-body">
                <div className="find-tracks-headings">
                    <p className="find-tracks-heading">Find Tracks</p>
                    <p className="find-tracks-subheading">
                        Discover the latest tracks from any country around the world tailored to
                        your personal music taste. Begin by choosing a country and identifying your music
                        preferences.
                    </p>
                </div>
                <CountrySelection setCountryCode={setCountryCode}/>
                <PreferenceSelection setSelectedPreference={setSelectedPreference} />
                {
                    selectedPreference != null ? (selectedPreference != preferenceA ? <ManuallyInputAudioFeatures setAudioFeaturePreferences={setAudioFeaturePreferences}/> : <MyCurrentTopTracks tracks={topTracksData}/>) : null
                }
                <Search selectedPreference={selectedPreference}
                        preferenceA={preferenceA}
                        preferenceB={preferenceB}
                        fetchPersonalizedResults={fetchPersonalizedResults} 
                        fetchManualInputAudioFeaturesResults={fetchManualInputAudioFeaturesResults} 
                        results={results}/>
            </div>
        </div>
        
    )
}