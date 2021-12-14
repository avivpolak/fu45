import React from 'react';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';

import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
