import React, {Fragment, useState, useEffect} from 'react'
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate, Link} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-pro-sidebar/dist/css/styles.css';


//components
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DentistLogin from "./pages/DentistLogin";
import DentistDashboard from "./pages/DentistDashboard";
import Profile from "./pages/Profile";
import Homepage from './pages/Homepage';
import ReceptionDashboard from './pages/ReceptionDashboard';
import ReviewPage from './pages/ReviewPage';
import ReviewsPopup from './components/ReviewPopup';

toast.configure();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  async function isAuth(){
    try {
      const response = await fetch("http://localhost:3001/auth/is-verify", {
        method: "GET",
        headers: {token : localStorage.token}
      });
      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth();
  })

  return (
    <Fragment>
      <Router>
        <div className="outerContainer">
          <Routes>
            <Route exact path="/login/:id" element={!isAuthenticated ? (<Login setAuth={setAuth}/>) : ( <Navigate to="/dashboard" />)}/>
            <Route exact path="/login" element={!isAuthenticated ? (<Login setAuth={setAuth}/>) : ( <Navigate to="/dashboard" />)}/>
            <Route exact path="/register/:id" element={!isAuthenticated  ? (<Register setAuth={setAuth}/>) : (<Navigate to="/login/:id"/>)} />
            <Route exact path="/dashboard" element={isAuthenticated ?  (<Dashboard setAuth={setAuth}/>) : (<Navigate to="/"/>)} />
						<Route exact path="/profile/" element={isAuthenticated ?  (<Profile setAuth={setAuth}/>) : (<Navigate to="/"/>)} />
						<Route exact path="/" element={!isAuthenticated ? (<Homepage setAuth={setAuth}/>) : (<Navigate to='/dashboard'/>)} />
            <Route exact path="/reviews" element={isAuthenticated ? (<ReviewPage setAuth={setAuth}/>) : (<Navigate to='/view-reviews'/>)} />
            <Route exact path="/view-reviews/:id" element={!isAuthenticated ? (<ReviewsPopup setAuth={setAuth}/>) : (<Navigate to='/'/>)} />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;


//            <Route exact path="/dentistlogin" element={!isAuthenticated ? (<DentistLogin setAuth={setAuth}/>) : ( <Navigate to="/dentist-dashboard" />)}/>
//            <Route exact path="/dentist-dashboard" element={isAuthenticated ?  (<DentistDashboard setAuth={setAuth}/>) : (<Navigate to="/dentistlogin"/>)} />
//<Route exact path="/reception-dashboard" element={isAuthenticated ?  (<ReceptionDashboard setAuth={setAuth}/>) : (<Navigate to="/reception-dashboard"/>)} />
