import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import SearchButton from '../..//assets/images/search-button.svg';
import countries from '../../assets/searchCountries.json';
import '../../assets/css/components/SearchBar.css';
  
export default function ReactSearchBar(props) {
    const [selectedOption, setSelectedOption] = useState("earth");

    return (
      <div>
        <div className="search-bar-button-map">
          <div className="search-bar-button">
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
            <img onClick={() => {props.handleSearch(selectedOption)}} src={SearchButton} className="search-button" alt="search button"></img>
          </div>
           <iframe key={selectedOption["label"]} width="600" height="450" style={{border:0}} loading="lazy" src={`https://www.google.com/maps/embed/v1/search?q=${selectedOption["label"]}&key=AIzaSyDNCKEDlCwHE_cO1wcham3rjCM9Ootz_zg&zoom=5`}></iframe>
        </div>
      </div>
    );
  };