import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import countries from '../../assets/searchCountries.json';
import '../../assets/css/components/CountrySelection.css';
  
export default function CountrySelection(props) {
    const [selectedOption, setSelectedOption] = useState({value: "Earth", label: "Earth"});
    const [selectedCountry, setSelectedCountry] = useState("Earth");

    useEffect(() => {
      if (!selectedOption) {
        setSelectedCountry("Earth")
        props.setCountryCode(null)
      } else {
        setSelectedCountry(selectedOption["label"])
        props.setCountryCode(selectedOption["value"])
      }

  }, [selectedOption]);

    return (
      <div className="blue-box">
        <p className="box-heading">Country Selection</p>
        <div className="search-bar-map">
          <div>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={countries[0].name}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              name="color"
              options={countries}
              onChange={setSelectedOption}
            />
              {
                selectedCountry != "Earth" ?
                <p className="box-body">
                  Great choice! You have selected {selectedCountry}. Continue scrolling to select your music
                  preferences.
                </p> : 
                <p className="box-body">
                Pick any country from around the world!
              </p>
              }
              
          </div>
           <iframe key={selectedCountry} width="500" height="350vh" style={{border:0}} loading="lazy" src={`https://www.google.com/maps/embed/v1/search?q=${selectedCountry}&key=AIzaSyDNCKEDlCwHE_cO1wcham3rjCM9Ootz_zg&zoom=5`}></iframe>
        </div>
      </div>
    );
  };