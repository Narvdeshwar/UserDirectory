// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDirectory from './UserDirectory';
import UserProfile from './UserProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDirectory />} />
        <Route path="/user/:userId" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
