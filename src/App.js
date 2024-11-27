// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import PartyPlanner from './PartyPlanner';
import StartPlanning from './StartPlanning'; // Import your new component
import JoinParty from './JoinParty'; // Import your new component
import Settings from './Settings'; // Import your new component
import Welcome from './Welcome'; 
import EditEvent from './EditEvent';// Ensure this is included

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/party-planner" element={<PartyPlanner />} />
                <Route path="/start-planning" element={<StartPlanning />} />
                <Route path="/join-party" element={<JoinParty />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/edit-event" element={<EditEvent />} />
                {/* Other routes can be added here */}
            </Routes>
        </Router>
    );
};

export default App;
