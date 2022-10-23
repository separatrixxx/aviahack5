import React from 'react';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Start from './pages/Start';
import End from './pages/End';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';


import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {

    let token: any = localStorage.getItem('token');
    let tasks: any = localStorage.getItem('tasks');

    if (token !== null) {
        if (tasks !== null) {
            return (
                <div className="scroll-smooth bg-neutral-900">
                    <Router>
                        <Routes>
                            <Route path='/' element={<Tasks/>} />
                            <Route path='/start' element={<Start/>} />
                            <Route path='/end' element={<End/>} />
                            <Route path='/profile' element={<Profile/>} />
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
                            <Route path='/' element={<Tasks/>} />
                            <Route path='/profile' element={<Profile/>} />
                            <Route path='*' element={<NotFound/>} />
                        </Routes>
                    </Router>
                </div>
            );
        }
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
