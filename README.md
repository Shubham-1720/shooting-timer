# Shooting Timer - Rajveer Singh

A professional timer website designed specifically for shooting practice by Rajveer Singh, National Shooting Player.

## Features

### 🎯 General Timer
- **Variable Duration**: Set custom timers in hours, minutes, and seconds
- **Visual Countdown**: Large, clear time display with warning indicators
- **Audio Feedback**: Beep sound when timer completes
- **Easy Controls**: Start, pause, and reset functionality

### 🏹 Dwelling Timer (Competition Mode)
A specialized timer sequence designed for shooting practice:

1. **Loading Phase (45 seconds)**: Prepare equipment and position
2. **Shooting Phase (3 seconds)**: Take your shot
   - Green light indicator
   - Audio beep at completion
3. **Preparation Phase (7 seconds)**: Prepare for next shot
   - Red light indicator
   - Audio beep at completion
4. **Repeat**: Cycle continues for 5 shots per set

**Key Features:**
- **Set-Based Training**: Configure 1-10 sets of 5 shots each
- **Complete Sequences**: Each set includes loading + 5 shooting cycles
- **Accurate Progression**: Fixed shot counting (1→2→3→4→5) per set
- **Visual Progress**: Shows both current set and current shot progress

### 📱 Mobile Responsive
- Optimized for mobile devices
- Touch-friendly interface
- Works perfectly on phones and tablets
- No zoom issues on mobile inputs

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Usage
1. Open the application in your web browser
2. Choose between **General Timer** or **Dwelling Timer**
3. For General Timer: Set your desired duration and press Start
4. For Dwelling Timer: Press "Start Dwelling Sequence" and follow the visual/audio cues

## Technical Details

### Built With
- **React** - User interface framework
- **Vite** - Build tool and development server
- **CSS3** - Styling with mobile-first responsive design
- **Web Audio API** - Audio feedback system

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features for Competitive Shooting

### Audio Cues
- Distinct beep sounds for different phase transitions
- Higher pitch for shooting phase completion
- Lower pitch for preparation phase completion

### Visual Indicators
- Green light during shooting phase (3 seconds)
- Red light during preparation phase (7 seconds)
- Progress indicators showing current shot (1-5) and current set
- Clear phase labels and countdown

### Precision Timing
- Accurate to the second
- Consistent timing across all devices
- No drift in long sequences

## Development

### Project Structure
```
src/
├── components/
│   ├── GeneralTimer.jsx     # Variable duration timer
│   ├── GeneralTimer.css     # General timer styles
│   ├── DwellingTimer.jsx    # Competition dwelling timer
│   └── DwellingTimer.css    # Dwelling timer styles
├── App.jsx                  # Main application component
├── App.css                  # Main application styles
├── index.css                # Global styles
└── main.jsx                 # Application entry point
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

This project is created for personal use by Rajveer Singh for shooting practice.

---

**Created for competitive shooting practice** 🎯+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
