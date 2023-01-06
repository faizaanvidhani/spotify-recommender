import React from 'react';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import FindTracks from "./pages/FindTracks";
import TopTracks from "./pages/TopTracks";
import ScrollToTop from './ScrollToTop';
import './assets/css/Reset.css'; 

export default function App() {
    return (
        <Router>
            <ScrollToTop>
                <Routes>
                    <Route exact path='/' element={<Home/>} />
                    <Route exact path='/find-tracks' element={<FindTracks/>} />
                    <Route exact path='/top-tracks' element={<TopTracks/>} />
                </Routes>
            </ScrollToTop>
        </Router>
    );
}