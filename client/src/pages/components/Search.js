import axios from 'axios';
import React, { useEffect } from 'react';
import '../../assets/css/components/Search.css';
import TrackCard from '../components/TrackCard';
import FindIcon from "../../assets/images/find-icon.svg";
  
export default function Search(props) {
    const handleSearch = () => {
        if (props.selectedPreference == props.preferenceA) {
            props.fetchPersonalizedResults();
        } else if (props.selectedPreference == props.preferenceB) {
            props.fetchManualInputAudioFeaturesResults();
        }

    }
    return (
      <div className="section">
        <div className="search-heading-button">
            <p className="search-heading">Results</p>
            <div onClick={handleSearch} className="search-button">
                <p className="search-button-text">Search</p>
                <img src={FindIcon} className="find-icon" alt="find icon"></img>
            </div>
        </div>

        <div className="search-results">
            {props.results.map((item, index) => (
                <TrackCard 
                    key={index} 
                    ranking={item.ranking}
                    title={item.title} 
                    artist={item.artist}
                    features={item.features}
                    image={item.image} 
                    preview_url={item.preview_url}/>
                ))
            }
        </div>

      </div>
    );
  };