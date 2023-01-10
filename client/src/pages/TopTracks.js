import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Header from './components/Header';
import TrackCard from './components/TrackCard';
import '../assets/css/TopTracks.css';

export default function TopTracks() {
    const [userTracks, setUserTracks] = useState([])

    useEffect(() => {
        async function fetchUserTracks() {
            try {
                const response = await axios.get('/user-top-tracks');
                setUserTracks(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserTracks();
    }, [])

    return (
        <div>
            <Header/>
            <div className="top-tracks-page-body">
                <div className="top-tracks-headings">
                    <p className="top-tracks-heading">Top Tracks</p>
                    <p className="top-tracks-subheading">Take a look at your current top tracks.</p>
                </div>
                <div className="user-tracks">
                    {userTracks.map((item, index) => (
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
        </div>
    )
}