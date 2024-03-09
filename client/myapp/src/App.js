import './App.css';
import Home from "./components/Home/Home.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sleep from './components/Home/Sleep/Sleep.js';
import Tracker from './components/Home/Tracker/Tracker.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sleep-tracker" element={<Sleep />} />
          <Route exact path="/mood-tracker" element={<Tracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
