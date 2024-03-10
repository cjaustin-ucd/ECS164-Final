import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./style.css"
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import SentimentSatisfied from '@mui/icons-material/SentimentSatisfied';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


function Tips() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate=useNavigate();

  return (
    <Box
      sx={{ 
        flexGrow: 1, 
        bgcolor: 'white', 
        display: 'flex', 
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#31363F',
        flexDirection:'column'
      }}
    > 
      <div style={{width:'1200px',display:'flex'}}>
        <ArrowBackIosIcon sx={{alignSelf:'flex-start',cursor:'pointer'}} onClick={()=>{navigate("/")}}/>
      </div>
      <br></br>
      <Box
        sx={{  bgcolor: '#76ABAE', display: 'flex', height: '720px', width: '1200px', borderRadius:'20px'}}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
        >
          <Tab sx={{height:'120px'}} 
            label={
              <div style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',height:'100%'}}>Happy <EmojiEmotionsIcon /></div>
            } 
            {...a11yProps(0)} 
          />
          <Tab sx={{height:'120px'}} 
            label={
              <div style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',height:'100%'}}>Angry <SentimentVeryDissatisfiedIcon /></div>
            }  
           {...a11yProps(1)} 
          />
          <Tab sx={{height:'120px'}} 
            label={
              <div style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',height:'100%'}}>Meh <SentimentSatisfied /></div>
            }  
            {...a11yProps(2)} 
          />
          <Tab sx={{height:'120px'}} 
            label={
              <div style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',height:'100%'}}>Sad <MoodBadIcon /></div>
            } 
            {...a11yProps(3)} 
          />
          <Tab sx={{height:'120px'}} 
            label={
              <div style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',height:'100%'}}>Stressed <SentimentDissatisfiedIcon /></div>
            } 
            {...a11yProps(4)} 
          />
          <Tab sx={{height:'120px'}} 
            label={
              <div style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',height:'100%'}}>Anxious <SentimentDissatisfiedIcon /></div>
            } 
            {...a11yProps(5)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div className="tip-text-container">
            <h1>Feeling Happy</h1>
            <h3>Great News!!!</h3>
            <ul>
              <li><p> Consider spreading those good vibes around! :)))))</p></li>
              <ul>
                <li>Call a friend you haven't chatted with in a minute ;</li>
                <li >Throw an event or party to celebrate</li>
              </ul>
              <li>Write down why today has been an amazing day to come back and check it out</li>
            </ul>
          </div>

        </TabPanel>
        <TabPanel value={value} index={1}>
        <div className="tip-text-container">
            <h1>Feeling Angry</h1>
            <h3>Sorry to hear that.</h3>
            
            <ul>
              <li>Just take a couple of breathers or go for a quick walk.</li>
              <li>Take a short break to cool off</li>
              <li >Go grab a snack to take your mind off things</li>
              <li>Meditation may be worth the try</li>
              <li>Talk with someone</li>
            </ul>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
        <div className="tip-text-container">
            <h1>Feeling Meh</h1>
            <h3>At least you're not doing bad.</h3>
            <ul>
              
              <li>Try Meditating for a bit</li>
              <li >Try to enjoy something you like</li>
                <ul>
                  <li>Favorite food</li>
                  <li>Favorite hobby</li>
                </ul>
              <li>Go for a run or take a breather</li>
              <li>Talk with someone</li>
            </ul>
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
        <div className="tip-text-container">
            <h1>Feeling Sad</h1>
            <h3>Cheer up. You got this.</h3>
            <ul>
              <li>Go talk with someone you can confide in. If not chat with one of us.</li>
              <li>Go take a couple of minutes for yourself</li>
              <li>Try taking your mind off the subject</li>
                <ul>
                  <li>Go work out</li>
                  <li>Go outside</li>
                  <li>Read</li>
                </ul>
            </ul>
          </div>
        </TabPanel>
        <TabPanel value={value} index={4}>
        <div className="tip-text-container">
            <h1>Feeling Stressed</h1>
            <h3>It's all good. Relax first.</h3>
            <ol>
              <li>Try to identify why you are stressed</li>
              <li>Think about how you can overcome this issue or maybe ask for outside perspective</li>
              <li>Take into action your plan</li>
              <li> Try meditation to calm down</li>
              <li>Analyze how you can use this solution for future stress challenges</li>
            </ol>
          </div>
        </TabPanel>
        <TabPanel value={value} index={5}>
        <div className="tip-text-container">
            <h1>Feeling Anxious</h1>
            <h3>It's okay.</h3>
            <p>Options:</p>
            <ul>
              <li>Try meditating</li>
              <li>Try Eating, as it can help distract the mind</li>
              <li>Try running</li>
            </ul>
          </div>
        </TabPanel>
      </Box>
    </Box>
    
  );
}

export default Tips