import React from 'react'
import './App.css'
import Certificate from './Certificate'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";import Verify from './Verify'


export default function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Verify />} />
          <Route path="/cert" element={<Certificate />} />
        </Routes>
      </Router>
  )
}
