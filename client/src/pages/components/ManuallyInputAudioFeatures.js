import React, { useEffect, useState } from 'react';
import DiscreteSlider from './DiscreteSlider';
import '../../assets/css/components/ManuallyInputAudioFeatures.css';
  
export default function ManuallyInputAudioFeatures(props) {
    // specifies the default value for each audio feature
    const [acousticness, setAcousticness] = useState(50);
    const [danceability, setDanceability] = useState(50);
    const [energy, setEnergy] = useState(50);
    const [liveness, setLiveness] = useState(50);
    const [speechiness, setSpeechiness] = useState(50);
    const [valence, setValence] = useState(50);

    // updates audio feature values when they change
    useEffect(() => {
      props.setAudioFeaturePreferences([acousticness, danceability, energy, liveness, speechiness, valence])
    }, [acousticness, danceability, energy, liveness, speechiness, valence]);

    return (
      <div className="input-sliders">
        <DiscreteSlider updateValue={setAcousticness} category={"Acousticness"}/>
        <DiscreteSlider updateValue={setDanceability} category={"Danceability"}/>
        <DiscreteSlider updateValue={setEnergy} category={"Energy"}/>
        <DiscreteSlider updateValue={setLiveness} category={"Liveness"}/>
        <DiscreteSlider updateValue={setSpeechiness} category={"Speechiness"}/>
        <DiscreteSlider updateValue={setValence} category={"Valence"}/>
      </div>
    )
  }