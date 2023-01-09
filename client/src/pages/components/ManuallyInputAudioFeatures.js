import React, { useEffect, useState } from 'react';
import DiscreteSlider from './DiscreteSlider';
import '../../assets/css/components/ManuallyInputAudioFeatures.css';
  
export default function ManuallyInputAudioFeatures(props) {
    const [acousticness, setAcousticness] = useState(50);
    const [danceability, setDanceability] = useState(50);
    const [energy, setEnergy] = useState(50);
    const [instrumentalness, setInstrumentalness] = useState(50);
    const [liveness, setLiveness] = useState(50);
    const [speechiness, setSpeechiness] = useState(50);
    const [valence, setValence] = useState(50);

    useEffect(() => {
      props.setAudioFeaturePreferences([acousticness, danceability, energy, instrumentalness, liveness, speechiness, valence])
    }, [acousticness, danceability, energy, instrumentalness, liveness, speechiness, valence]);


    return (
      <div className="input-blue-box">
        <p className="input-box-heading">Manually Input Audio Features</p>
        <div className="input-sliders">
          <DiscreteSlider updateValue={setAcousticness} category={"Acousticness"}/>
          <DiscreteSlider updateValue={setDanceability} category={"Danceability"}/>
          <DiscreteSlider updateValue={setEnergy} category={"Energy"}/>
          <DiscreteSlider updateValue={setInstrumentalness} category={"Instrumentalness"}/>
          <DiscreteSlider updateValue={setLiveness} category={"Liveness"}/>
          <DiscreteSlider updateValue={setSpeechiness} category={"Speechiness"}/>
          <DiscreteSlider updateValue={setValence} category={"Valence"}/>
        </div>
      </div>
    );
  };