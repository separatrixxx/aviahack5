import React from 'react';
import Home from './pages/Home'
import Accept from './pages/Accept'
import Start from './pages/Start'
import End from './pages/End'
import NotFound from './pages/NotFound'


import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {

    let token: any = localStorage.getItem('token_enter');

    if (token === 'ok') {
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
    } else {
        return (
            <div className="scroll-smooth bg-neutral-900">
                <Router>
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='*' element={<NotFound/>} />
                    </Routes>
                </Router>
            </div>
        );
    }

}

export default App;
