import { useState } from 'react'
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material'
import { keyframes } from '@emotion/react'
import LandingPage from './LandingPage'
import ProfileForm from './ProfileForm'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ff4d8d' },
    secondary: { main: '#a855f7' },
    background: { default: '#07071c', paper: '#1a0e35' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a0e35',
          backgroundImage: 'none',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        },
        option: {
          '&[aria-selected="true"]': {
            backgroundColor: 'rgba(255,77,141,0.2) !important',
          },
          '&.Mui-focused': {
            backgroundColor: 'rgba(255,255,255,0.07) !important',
          },
        },
      },
    },
  },
})

const float1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(80px, -60px) scale(1.1); }
  66%       { transform: translate(-40px, 40px) scale(0.95); }
`
const float2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(-70px, 50px) scale(0.95); }
  66%       { transform: translate(50px, -80px) scale(1.05); }
`
const float3 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(60px, 70px) scale(1.1); }
`

const FLAG_KEY = 'not_female_flag'

const orbBase = {
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(90px)',
  opacity: 0.38,
}

export default function App() {
  const [view, setView] = useState(() =>
    localStorage.getItem(FLAG_KEY) ? 'sorry' : 'landing'
  )

  const handleSelect = (gender) => {
    if (gender === 'female') {
      setView('form')
    } else {
      localStorage.setItem(FLAG_KEY, '1')
      setView('sorry')
    }
  }

  const handleTryAgain = () => {
    localStorage.removeItem(FLAG_KEY)
    setView('landing')
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #07071c 0%, #130b2b 55%, #0d1a2e 100%)',
      }}>
        {/* Animated background orbs */}
        <Box sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <Box sx={{ ...orbBase, width: 700, height: 700, background: '#ff4d8d', top: '-250px', left: '-150px', animation: `${float1} 20s ease-in-out infinite` }} />
          <Box sx={{ ...orbBase, width: 600, height: 600, background: '#a855f7', bottom: '-200px', right: '-150px', animation: `${float2} 25s ease-in-out infinite` }} />
          <Box sx={{ ...orbBase, width: 500, height: 500, background: '#3b82f6', top: '30%', left: '45%', animation: `${float3} 18s ease-in-out infinite` }} />
        </Box>

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {view === 'form' ? (
            <ProfileForm />
          ) : (
            <LandingPage onSelect={handleSelect} isSorry={view === 'sorry'} onTryAgain={handleTryAgain} />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
