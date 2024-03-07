import React from 'react'
import "./style.css"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { ThemeContext } from '@mui/material/styles';
import { keyframes, css } from '@mui/system';

function Sleep() {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticTimePicker orientation="landscape" />
      </LocalizationProvider>
    </div>
  )
}

export default Sleep