import './App.css';
import Home from "./components/Home/Home.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sleep from './components/Sleep/Sleep.js';
import Tips from './components/Tips/Tips.js';
import Tracker from './components/Tracker/Tracker.js';
import Feedback from './components/Tracker/Submitted.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sleep-tracker" element={<Sleep />} />
          <Route exact path="/tips" element={<Tips />} />
          <Route exact path="/mood-tracker" element={<Tracker />} />
          <Route exact path="/submitted" element={<Feedback />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
