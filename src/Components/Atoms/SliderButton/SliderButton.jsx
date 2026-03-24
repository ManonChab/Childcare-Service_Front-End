import { FormControlLabel, Switch } from '@mui/material';
import React from 'react';

const SliderButton = ({ checked, onToggle }) => {
  return (
    <FormControlLabel
      labelPlacement="start"
      sx={{
        margin: 0,
        gap: '8px',

        '& .MuiFormControlLabel-label': {
          fontSize: '0.8rem',
        },
      }}
      control={
        <Switch
          checked={checked}
          onChange={onToggle}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#fff',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: 'green',
              opacity: 1,
            },
            '& .MuiSwitch-switchBase': {
              color: '#fff',
            },
            '& .MuiSwitch-track': {
              backgroundColor: 'red',
              opacity: 1,
            },
          }}
        />
      }
      label={checked ? "Shown" : "Hidden"}
    />
  );
};

export default SliderButton;