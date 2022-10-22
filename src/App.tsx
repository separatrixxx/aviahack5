import React from 'react';
import Accept from './pages/Accept'
import Start from './pages/Start'
import End from './pages/End'
import NotFound from './pages/NotFound'


import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {

  return (
      <div className="scroll-smooth bg-neutral-900">
          <Router>
              <Routes>
                  <Route path='/' element={<Accept/>} />
                  <Route path='/start' element={<Start/>} />
                  <Route path='/end' element={<End/>} />
                  <Route path='*' element={<NotFound/>} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;
