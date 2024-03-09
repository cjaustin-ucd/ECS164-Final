import React, {useState, useRef} from 'react'
import "./style.css"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ThemeContext } from '@mui/material/styles';
import { keyframes, css } from '@mui/system';
import { Link } from 'react-router-dom';

function Sleep() {
  const [sleepTime, setSleepTime] = useState(null);
  let sleepTime_ref = useRef(sleepTime);
  const [wakeTime, setwakeTime] = useState(null);
  let wakeTime_ref = useRef(wakeTime);
  const [hoursSlept, setHoursSlept] = useState(0);
  let hoursSlept_ref = useRef(hoursSlept);
  const [minutes, setMinutes] = useState(0);
  let minutes_ref = useRef(minutes);
  const [isEnoughSleep, setisEnoughSleep] = useState(0);
  let isEnoughSleep_ref = useRef(isEnoughSleep);

  function setStateRef(setState, ref, src) {
    setState(src);
    ref.current = src;
}

  const handleSleepTimeChange = (newTime) => {
    setStateRef(setSleepTime, sleepTime_ref, newTime);
    console.log("set time", sleepTime_ref.current)
    handleSubmit()
  };
  const handleWakeTimeChange = (newTime) => {
    setStateRef(setwakeTime, wakeTime_ref, newTime);
    console.log("set time", wakeTime_ref.current)
    handleSubmit()
  };
  const handleSubmit = () => {
    let timeSlept = {hours: 0, min: 0}
    if (sleepTime_ref.current && wakeTime_ref.current) {
      timeSlept = calcTimeSlept()
      if (timeSlept.hours >= 7) {
        setStateRef(setisEnoughSleep, isEnoughSleep_ref, true)
      } else {
        setStateRef(setisEnoughSleep, isEnoughSleep_ref, false)
      }
    }
    setStateRef(setHoursSlept, hoursSlept_ref, timeSlept.hours)
    setStateRef(setMinutes, minutes_ref, timeSlept.min)
  };
  const calcTimeSlept = () => {
    let hours = wakeTime_ref.current.$H - sleepTime_ref.current.$H
    let min = wakeTime_ref.current.$m - sleepTime_ref.current.$m
    if (min < 0) {
      min = 60 + min
      if (hours !== 0) {
        hours -= 1
      } else {
        min = 0
      }
    }
    return {hours: hours, min: min}
  };


  return (
    <div>
      <Link to='/' className='home-button'>
        <button className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary css-1e6y48t-MuiButtonBase-root-MuiButton-root">HOME</button>
      </Link>
      <form onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="time-picker-container">
            <p>What time did you sleep last night?</p>
            <StaticTimePicker
              label="Sleep Time"
              value={sleepTime}
              onChange={handleSleepTimeChange}
              slotProps={{actionBar: {actions: ['cancel']}}}
            />
            <p>What time did you wake up?</p>
            <StaticTimePicker
              label="Wake Time"
              minTime={sleepTime}
              value={wakeTime}
              onChange={handleWakeTimeChange}
              slotProps={{actionBar: {actions: ['cancel']}}}
            />
          </div>
        </LocalizationProvider>
        <h1>You slept for {hoursSlept} hours and {minutes} minutes </h1>
        {isEnoughSleep && 
          <p>Great! You got at least the recommended amount of sleep!</p>
        }
        {!isEnoughSleep && 
          <p>It is recommended to sleep for at least 7 hours to feel rejuvenated!</p>
        }
      </form>
    </div>
  );
}

export default Sleep