import { useState, useEffect, useRef } from 'react'
import './DwellingTimer.css'

const DwellingTimer = () => {
  const [phase, setPhase] = useState('ready') // ready, loading, shooting, preparing
  const [timeLeft, setTimeLeft] = useState(0)
  const [currentShoot, setCurrentShoot] = useState(0)
  const [currentSet, setCurrentSet] = useState(0)
  const [totalSets, setTotalSets] = useState(3)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  const SHOTS_PER_SET = 5
  const PHASES = {
    loading: { duration: 60, name: 'Loading', color: 'blue' },
    shooting: { duration: 3, name: 'Shoot!', color: 'green' },
    preparing: { duration: 7, name: 'Prepare', color: 'red' }
  }

  // Create beep sound
  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    const createBeep = (frequency = 800, duration = 0.3) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = frequency
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)
    }
    
    audioRef.current = createBeep
  }, [])

  // Handle timer countdown
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, timeLeft])

  // Handle phase transitions when timeLeft reaches 0
  useEffect(() => {
    if (isRunning && timeLeft === 0) {
      handlePhaseComplete()
    }
  }, [timeLeft, isRunning])

  const handlePhaseComplete = () => {
    // Play beep sound
    if (audioRef.current) {
      if (phase === 'shooting') {
        audioRef.current(1000, 0.2) // Higher pitch for shooting end
      } else {
        audioRef.current(600, 0.4) // Lower pitch for other phases
      }
    }

    if (phase === 'loading') {
      // After loading, start first shoot of current set
      setPhase('shooting')
      setTimeLeft(PHASES.shooting.duration)
      setCurrentShoot(1)
    } else if (phase === 'shooting') {
      // After shooting, either prepare for next shot or move to next set/finish
      if (currentShoot < SHOTS_PER_SET) {
        // More shots in current set - go to preparing
        setPhase('preparing')
        setTimeLeft(PHASES.preparing.duration)
        // Don't increment currentShoot here - wait until after preparing
      } else {
        // Current set completed
        if (currentSet < totalSets) {
          // Move to next set - start loading again
          setCurrentSet(prev => prev + 1)
          setCurrentShoot(0)
          setPhase('loading')
          setTimeLeft(PHASES.loading.duration)
        } else {
          // All sets completed
          setIsRunning(false)
          setPhase('ready')
          setCurrentShoot(0)
          setCurrentSet(0)
          setTimeLeft(0)
        }
      }
    } else if (phase === 'preparing') {
      // After preparing, start next shoot
      setPhase('shooting')
      setTimeLeft(PHASES.shooting.duration)
      setCurrentShoot(prev => prev + 1) // Increment here for next shot
    }
  }

  const startSequence = () => {
    setPhase('loading')
    setTimeLeft(PHASES.loading.duration)
    setCurrentShoot(0)
    setCurrentSet(1)
    setIsRunning(true)
  }

  const stopSequence = () => {
    setIsRunning(false)
    setPhase('ready')
    setCurrentShoot(0)
    setCurrentSet(0)
    setTimeLeft(0)
    clearInterval(intervalRef.current)
  }

  const getPhaseDisplay = () => {
    if (phase === 'ready') return 'Ready to Start'
    if (phase === 'loading') return `Loading Set ${currentSet}...`
    if (phase === 'shooting') return `Shoot! (${currentShoot}/${SHOTS_PER_SET})`
    if (phase === 'preparing') return `Prepare for Shot ${currentShoot + 1}`
    return ''
  }

  const getBackgroundColor = () => {
    if (phase === 'shooting') return '#00ff00' // Green
    if (phase === 'preparing') return '#ff0000' // Red
    if (phase === 'loading') return '#0066ff' // Blue
    return '#f0f0f0' // Default
  }

  const handleSetsChange = (value) => {
    const numValue = value;
    setTotalSets(numValue)
  }

  return (
    <div className="dwelling-timer">
      <h2>Dwelling Timer</h2>
      <p className="sequence-info">2s Loading → 3s Shoot (Green) → 7s Prepare (Red) × 5 shots per set</p>
      
      <div className="sets-setting">
        <label htmlFor="totalSets">Number of Sets (5 shots each):</label>
        <input
          id="totalSets"
          type="number"
          min="1"
          max="10"
          value={totalSets}
          onChange={(e) => handleSetsChange(e.target.value)}
          disabled={isRunning}
          className="sets-input"
        />
      </div>
      
      <div 
        className="dwelling-display"
        style={{ backgroundColor: isRunning ? getBackgroundColor() : '#f0f0f0' }}
      >
        <div className="phase-indicator">
          <div className={`light ${phase === 'shooting' ? 'green active' : 'green'}`}></div>
          <div className={`light ${phase === 'preparing' ? 'red active' : 'red'}`}></div>
        </div>
        
        <div className="phase-text">
          {getPhaseDisplay()}
        </div>
        
        {timeLeft > 0 && (
          <div className="time-display">
            {timeLeft}s
          </div>
        )}
        
        {currentSet > 0 && (
          <div className="set-counter">
            Set {currentSet} of {totalSets}
          </div>
        )}
        
        {currentShoot > 0 && (
          <div className="shoot-counter">
            Shot {currentShoot} of {SHOTS_PER_SET}
          </div>
        )}
      </div>

      <div className="progress-container">
        <div className="sets-progress">
          {Array.from({ length: totalSets }, (_, i) => i + 1).map(setNum => (
            <div 
              key={setNum}
              className={`set-progress ${currentSet > setNum ? 'completed' : ''} ${currentSet === setNum && isRunning ? 'current' : ''}`}
            >
              Set {setNum}
            </div>
          ))}
        </div>
        
        <div className="shots-progress">
  {Array.from({ length: SHOTS_PER_SET }, (_, i) => i + 1).map(shotNum => {
    const isCompleted = phase === 'preparing' ? currentShoot >= shotNum : currentShoot > shotNum;
    const isCurrent = phase === 'preparing' ? currentShoot + 1 === shotNum : currentShoot === shotNum && isRunning;
    
    return (
      <div 
        key={shotNum}
        className={`shoot-progress ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
      >
        {shotNum}
      </div>
    );
  })}
</div>

      </div>

      <div className="dwelling-controls">
        {!isRunning ? (
          <button className="btn btn-start-dwelling" onClick={startSequence}>
            Start {totalSets} Set{totalSets > 1 ? 's' : ''} ({totalSets * SHOTS_PER_SET} total shots)
          </button>
        ) : (
          <button className="btn btn-stop" onClick={stopSequence}>
            Stop
          </button>
        )}
      </div>

      <div className="dwelling-instructions">
        <h3>Instructions:</h3>
        <ul>
          <li><strong>Loading (2s):</strong> Prepare your equipment and position</li>
          <li><strong>Shooting (3s, Green):</strong> Take your shot</li>
          <li><strong>Preparing (7s, Red):</strong> Prepare for next shot</li>
          <li><strong>Sets:</strong> Each set contains 5 shots with loading phase</li>
          <li><strong>Audio:</strong> Beep sounds mark phase transitions</li>
        </ul>
      </div>
    </div>
  )
}

export default DwellingTimer
