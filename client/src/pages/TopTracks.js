import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Header from './components/Header';
import TrackCard from './components/TrackCard';
import '../assets/css/TopTracks.css';
export default function DiscoverTracks() {

    const [topTracksData, setTopTracksData] = useState([])

    useEffect(() => {
        axios.get('/getTracks').then(response => {
            console.log("SUCCESS", response)
            setTopTracksData(response.data)
        }).catch(error => {
            console.log(error)
        })

    }, [])


    return (
        <div>
            <Header/>
            <div className="top-tracks-body">
                <div className="top-tracks-headings">
                    <p className="top-tracks-heading">Top Tracks</p>
                    <p className="top-tracks-subheading">Take a look at your current top tracks.</p>
                </div>
                <div className="top-tracks-list">
                    {topTracksData.map((item, index) => (
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