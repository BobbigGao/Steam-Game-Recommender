import React from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Index from './pages/Index';
import Tendency from './pages/Tendency';
import MyList from './pages/MyList';
import Game from './pages/Game';
import Discover from './pages/Discover';
import Account from './pages/Account';
import './App.css';

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/index" element={<Index />} />
      <Route path="/discover" element={isAuthenticated ? <Discover /> : <Navigate to="/index" />} />

            <Route path="/" element={isAuthenticated ? <Discover /> : <Navigate to="/index" />}/>
            <Route path="/recommended" element={isAuthenticated ? <Tendency /> : <Navigate to="/index" />} /> 
          <Route path="/mylist" element={isAuthenticated ? <MyList /> : <Navigate to="/index" />} />
          <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/index" />} />
          <Route path="/Game/:game_id" element={isAuthenticated ? <Game /> : <Navigate to="/index" />} /> 
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <ProtectedRoute />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

