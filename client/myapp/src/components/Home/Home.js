import React from 'react';
import "./style.css";
import emoji from "../../images/home/Emoji.jpeg";
import tips from "../../images/home/Tips.jpg";
import sleep from "../../images/home/Sleep.png";
import statistics from "../../images/home/Statistics.jpg";
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div className="home-card-container" onClick={()=>{navigate("/mood-tracker")}}>
        <div className="home-card-content" >
          <h1>Daily Mood Tracker</h1>
          <div className="home-card-image"
            style={{
              backgroundImage: `url(${emoji})`,
            }}
          >
          </div>
        </div>
      </div>
      <div className="home-card-container">
        <div className="home-card-content">
          <h1>Mental Health Tips</h1>
          <div className="home-card-image"
            style={{
              backgroundImage: `url(${tips})`,
            }}
          >
          </div>
        </div>
      </div>
      <div className="home-card-container">
        <div className="home-card-content" onClick={()=>{navigate("/sleep-tracker")}}>
          <h1>Sleep Tracker</h1>
          <div className="home-card-image"
            style={{
              backgroundImage: `url(${sleep})`,
            }}
          ></div>
        </div>
      </div>
      <div className="home-card-container">
        <div className="home-card-content">
          <h1>Statistics</h1>
          <div className="home-card-image"
            style={{
              backgroundImage: `url(${statistics})`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
