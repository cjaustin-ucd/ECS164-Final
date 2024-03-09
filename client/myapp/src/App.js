import './App.css';
import Home from "./components/Home/Home.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import Sleep from './components/Home/Sleep/Sleep.js';
import Tracker from './components/Home/Tracker/Tracker.js';
=======
import Sleep from './components/Sleep/Sleep.js';
import Tips from './components/Tips/Tips.js';
>>>>>>> 790d6ef35ec7345def123c58cd387675eea1fc9e

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sleep-tracker" element={<Sleep />} />
<<<<<<< HEAD
          <Route exact path="/mood-tracker" element={<Tracker />} />
=======
          <Route exact path="/tips" element={<Tips />} />
>>>>>>> 790d6ef35ec7345def123c58cd387675eea1fc9e
        </Routes>
      </Router>
    </div>
  );
}

export default App;
