import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../../assets/css/components/MyCurrentTopTracks.css';
  
export default function MyCurrentTopTracks(props) {
    return (
      <div className="section">
        <p className="section-heading">Your Current Top Tracks</p>
        <div>
            {props.tracks.map((item, index) => (
                <p key={index} className="section-body">{item.ranking}. {item.title}</p>
                ))
            }
        </div>
      </div>
    );
  };