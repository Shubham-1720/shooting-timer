import { useState } from 'react'
import './App.css'
import GeneralTimer from './components/GeneralTimer'
import RapidFireTimer from './components/RapidFireTimer'

function App() {
  const [activeTimer, setActiveTimer] = useState('general')

  return (
    <div className="app">
      <header className="app-header">
        <h1>Shooting Timer</h1>
        <p>Rajveer Singh - National Shooting Player</p>
      </header>

      <nav className="timer-nav">
        <button 
          className={`nav-btn ${activeTimer === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTimer('general')}
        >
          General Timer
        </button>
        <button 
          className={`nav-btn ${activeTimer === 'rapidfire' ? 'active' : ''}`}
          onClick={() => setActiveTimer('rapidfire')}
        >
          Rapid Fire Timer
        </button>
      </nav>

      <main className="timer-content">
        {activeTimer === 'general' ? <GeneralTimer /> : <RapidFireTimer />}
      </main>
    </div>
  )
}

export default App
