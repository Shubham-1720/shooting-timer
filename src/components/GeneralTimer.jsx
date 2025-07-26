import { useState, useEffect, useRef } from 'react'
import './GeneralTimer.css'

const GeneralTimer = () => {
  const [duration, setDuration] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [inputTime, setInputTime] = useState({ hours: 0, minutes: 0, seconds: 10 })
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  // Create beep sound
  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    const createBeep = () => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
    
    audioRef.current = createBeep
  }, [])

  const totalInputSeconds = inputTime.hours * 3600 + inputTime.minutes * 60 + inputTime.seconds

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            // Play beep when timer finishes
            if (audioRef.current) {
              audioRef.current()
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, timeLeft])

  const startTimer = () => {
    if (totalInputSeconds > 0) {
      setTimeLeft(totalInputSeconds)
      setIsRunning(true)
    }
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(0)
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleInputChange = (unit, value) => {
    const numValue = Math.max(0, parseInt(value) || 0)
    setInputTime(prev => ({
      ...prev,
      [unit]: unit === 'hours' ? Math.min(23, numValue) : Math.min(59, numValue)
    }))
  }

  return (
    <div className="general-timer">
      <h2>General Timer</h2>
      
      <div className="timer-display">
        {timeLeft > 0 ? (
          <div className={`time-text ${timeLeft <= 10 ? 'warning' : ''}`}>
            {formatTime(timeLeft)}
          </div>
        ) : (
          <div className="time-text">00:00</div>
        )}
      </div>

      <div className="time-input">
        <div className="input-group">
          <label>Hours</label>
          <input
            type="number"
            min="0"
            max="23"
            value={inputTime.hours}
            onChange={(e) => handleInputChange('hours', e.target.value)}
            disabled={isRunning}
          />
        </div>
        <div className="input-group">
          <label>Minutes</label>
          <input
            type="number"
            min="0"
            max="59"
            value={inputTime.minutes}
            onChange={(e) => handleInputChange('minutes', e.target.value)}
            disabled={isRunning}
          />
        </div>
        <div className="input-group">
          <label>Seconds</label>
          <input
            type="number"
            min="0"
            max="59"
            value={inputTime.seconds}
            onChange={(e) => handleInputChange('seconds', e.target.value)}
            disabled={isRunning}
          />
        </div>
      </div>

      <div className="timer-controls">
        {!isRunning ? (
          <button 
            className="btn btn-start" 
            onClick={startTimer}
            disabled={totalInputSeconds === 0}
          >
            Start
          </button>
        ) : (
          <button className="btn btn-pause" onClick={pauseTimer}>
            Pause
          </button>
        )}
        <button className="btn btn-reset" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default GeneralTimer
