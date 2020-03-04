import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './shared/navbar'
import RouterOutlet from './router-outlet'

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <RouterOutlet />
      </div>
    </Router>
  )
}
