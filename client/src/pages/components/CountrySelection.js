import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import countries from '../../assets/countries.json';
import '../../assets/css/components/CountrySelection.css';
  
export default function CountrySelection({ setResults, setCountryCode }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
      if (!selectedOption) {
        setSelectedCountry(null)
        setCountryCode(null)
      } else {
        // an option is a dictionary where {value: countryCode, label: country}
        setSelectedCountry(selectedOption["label"])
        setCountryCode(selectedOption["value"])
      }
      // resets search results when a different country is selected in the dropdown menu
      setResults([]);

  }, [selectedOption]);

    return (
      <div className="country-selection-container">
        <p className="country-selection-title">Country Selection</p>
        <div className="country-selection-left-container">
          <div>
            <Select
              className="dropdown-item"
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
                selectedCountry !== null ?
                <p className="country-selection-text">
                  Great choice! You have selected {selectedCountry}. Continue scrolling to select your music
                  preferences.
                </p> : 
                <p className="country-selection-text">
                Pick any country from around the world!
              </p>
              }
          </div>
           <iframe title="map" key={selectedCountry} width="500vw" height="350vh" style={{border:0}} loading="lazy" src={`https://www.google.com/maps/embed/v1/search?q=${selectedCountry == null ? "United States" : selectedCountry}&key=AIzaSyDNCKEDlCwHE_cO1wcham3rjCM9Ootz_zg&zoom=5`}></iframe>
        </div>
      </div>
    )
  }