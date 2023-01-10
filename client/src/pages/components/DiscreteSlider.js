// import * as React from 'react';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../assets/css/components/DiscreteSlider.css';

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 100,
    label: '100%',
  }
];

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#FFFFFF',
      contrastText: '#fff',
    },
  },
});


function valuetext(value) {
  return `${value}%`;
}

export default function DiscreteSlider(props) {
  const [attributeValue, setAttributeValue] = useState(50);

  useEffect(() => {
    props.updateValue(attributeValue);
  }, [props, attributeValue]);
  
  return (
    <div className="slider">
      <p className="slider-attribute">{props.category}</p>
      <Box sx={{ width: 300, padding: 2 }}>
      <ThemeProvider theme={theme}>
        <Slider
          key={props.category}
          aria-label="Always visible"
          value={attributeValue}
          getAriaValueText={valuetext}
          onChange={(_, value) => setAttributeValue(value)}
          step={1}
          marks={marks}
          color="primary"
          valueLabelDisplay="on"
          />
        </ThemeProvider>
      </Box>
    </div>
  );
}