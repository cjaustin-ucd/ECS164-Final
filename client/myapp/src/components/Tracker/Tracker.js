import * as React from 'react';
import Slider from '@mui/material/Slider';
import "./Tracker.css"
import happy from "../../images/tracker/happy.png";
import sad from "../../images/tracker/sad.webp";
import neutral from "../../images/tracker/neutral.png";
import angry from "../../images/tracker/angry.png"
import excited from "../../images/tracker/excited.png"
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export default function Tracker() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(50);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let mood
  if(value <= 20) {
    mood = angry
  }
  else if(value <= 40 && value > 20) {
    mood = sad
  }
  else if(value <= 60 && value > 40) {
    mood = neutral
  }
  else if(value <=80 && value > 60) {
    mood = happy
  }
  else {
    mood = excited
  }

  return (
    <div>
        <div style={{width:'1200px',display:'flex'}}>
          <ArrowBackIosIcon className="arrow" sx={{alignSelf:'flex-start',cursor:'pointer'}} onClick={()=>{navigate("/")}}/>
        </div>
        <h1>How are you feeling today?</h1>
        <img src={mood} alt="happy"></img>
        <div className="input">
            <h4>Negative</h4>
            <Slider id="slider" value={value} onChange={handleChange} />
            <h4>Positive</h4>
        </div>
        <button onClick={()=>{navigate("/")}}>Submit</button>
        <div id="info">
        <p>Your reponse will be submitted anonymously to:</p>
            <ul>
                <li>Lara Simons(General Manager, Publix, Williamsburg)</li>
                <li>Dan Smith(Academic Advisor, William and Mary)</li>
            </ul>
        </div>
    </div>
  );
}