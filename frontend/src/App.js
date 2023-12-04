import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Index from './pages/Index';
import Tendency from './pages/Tendency';
import MyList from './pages/MyList';
import Game from './pages/Game';
import Discover from './pages/Discover';

import './App.css';
import Finder from './pages/Finder';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/finder" element={<Finder />} />
          <Route path="/Discover" element={<Discover />} />
          <Route path="/" element={<Index />} />
          <Route path="/tendency" element={<Tendency />} /> 
          <Route path="/mylist" element={<MyList />} />
          <Route path="/Game/:game_index" element={<Game />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
