import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from './components/Header';
import CountrySelection from './components/CountrySelection';
import PreferenceSelection from './components/PreferenceSelection';
import Results from './components/Results';
import '../assets/css/FindTracks.css';

export default function FindTracks() {
    const [countryCode, setCountryCode] = useState(null);
    const [selectedPreference, setSelectedPreference] = useState(null);
    const [audioFeaturePreferences, setAudioFeaturePreferences] = useState([50, 50, 50, 50, 50, 50, 50]);
    const [results, setResults] = useState([]);
    const [topTracksData, setTopTracksData] = useState([]);
    const [loading, setLoading] = useState(false);
    const resultsRef = useRef(null); // achieves scrolling to the results section

    // resets variables when country search bar is cleared
    useEffect(() => {
        if (countryCode == null) {
            setSelectedPreference(null);
            setAudioFeaturePreferences([50, 50, 50, 50, 50, 50, 50]);
            setResults([]);
        }
    }, [countryCode]);
    
    useEffect(() => {
        resultsRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [results]);

    // fetches current top tracks when the page is first rendered
    useEffect(() => {
        async function fetchUserTracks() {
            try {
                const response = await axios.get('/user-top-tracks');
                setTopTracksData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserTracks();
      }, []);

    // fetches recommendations based on user's current top tracks
    const fetchPersonalizedResults = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/search/user-tracks/results/${countryCode}`);
            setResults(response.data);
          } catch (error) {
              console.log(error)
          }
          setLoading(false);
        }
    
    // fetches recommendations based on manually-inputted audio features
    const fetchManualInputAudioFeaturesResults = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`/search/manual-input/results/${countryCode}`, audioFeaturePreferences);
            setResults(response.data);
            } catch (error) {
                console.log(error)
            }
        setLoading(false);
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
                <CountrySelection 
                setCountryCode={setCountryCode}
                setResults={setResults}/>
                { countryCode == null ?
                    null :
                    <PreferenceSelection 
                    audio={audioFeaturePreferences}
                    fetchPersonalizedResults={fetchPersonalizedResults} 
                    fetchManualInputAudioFeaturesResults={fetchManualInputAudioFeaturesResults}
                    loading={loading}
                    resultsRef={resultsRef} // scrolls to the bottom of the div above the results div to circumvent issue with scrolling to results div due to header
                    setAudioFeaturePreferences={setAudioFeaturePreferences}
                    setSelectedPreference={setSelectedPreference}
                    topTracksData={topTracksData} />
                }
                { (results.length === 0 || countryCode == null) ?
                    null :
                    <Results 
                    results={results}
                    selectedPreference={selectedPreference} />
                }
            </div>
        </div>
        
    )
}