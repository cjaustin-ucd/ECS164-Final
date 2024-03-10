import * as React from 'react';
import "./Submitted.css"
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export default function Feedback() {
  const navigate = useNavigate();
  
  return (
    <div>
        <div style={{width:'1200px',display:'flex'}}>
          <ArrowBackIosIcon className="arrow" sx={{alignSelf:'flex-start',cursor:'pointer'}} onClick={()=>{navigate("/")}}/>
        </div>
        <h1>How are you feeling today?</h1>

        <div style={{textAlign: 'center', marginTop: '200px'}}>
            <p style={{fontSize: '2em', 'fontWeight': 'bold'}}>Submitted</p>
        </div>
        
        <div id="info">
        <p>Your reponse was submitted anonymously to:</p>
            <ul>
                <li>Lara Simons(General Manager, Publix, Williamsburg)</li>
                <li>Dan Smith(Academic Advisor, William and Mary)</li>
            </ul>
        </div>
    </div>
  );

}