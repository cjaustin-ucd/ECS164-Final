import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Linegraph from './Linegraph'

export default function Statistics() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(50);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
        <div style={{width:'1200px',display:'flex'}}>
          <ArrowBackIosIcon className="arrow" sx={{alignSelf:'flex-start',cursor:'pointer'}} onClick={()=>{navigate("/")}}/>
        </div>
        <h1>Your Data Over Time</h1>
        <Linegraph />
    </div>
  );
}