import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import TrackCard from './components/TrackCard';
import SearchBar from './components/SearchBar';
import '../assets/css/FindTracks.css';

export default function FindTracks() {
    const [results, setResults] = useState([]);

    const handleSearch = async (country) => {
        const alpha2_code = country["value"] // retrieves the alpha2 country code for a given country
        try {
            const response = await axios.get(`/search/${alpha2_code}`);
            console.log("SUCCESS", response);
            setResults(response.data);
            // navigate('/')
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
                        Discover new tracks from countries all over the world based on your current 
                        taste in music.
                    </p>
                </div>
                <SearchBar handleSearch={handleSearch}/>
                <div className="top-tracks-list">
                    {results.map((item, index) => (
                        <TrackCard 
                            key={index} 
                            ranking={0} 
                            title={item.title} 
                            artist={item.artist}
                            features={item.features}
                            image={item.image} 
                            preview_url={item.preview_url}/>
                        ))
                    }
                </div>
            </div>
        </div>
        
    )
}