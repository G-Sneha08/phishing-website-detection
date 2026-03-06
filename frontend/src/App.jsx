import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Analytics from './pages/Analytics'
import Upload from './pages/Upload'
import History from './pages/History'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </Router>
    )
}

export default App
