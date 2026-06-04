import { Box, Typography, Card, CardActionArea, CardContent, Button } from '@mui/material'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import TransgenderIcon from '@mui/icons-material/Transgender'
import ReplayIcon from '@mui/icons-material/Replay'

const GENDERS = [
  { label: 'Male',   value: 'male',   Icon: MaleIcon,        color: '#60a5fa' },
  { label: 'Female', value: 'female', Icon: FemaleIcon,      color: '#f472b6' },
  { label: 'Other',  value: 'other',  Icon: TransgenderIcon, color: '#c084fc' },
]

export default function LandingPage({ onSelect, isSorry, onTryAgain }) {
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      px: 3,
      py: 8,
    }}>
      <Typography
        component="h1"
        align="center"
        fontWeight={900}
        sx={{
          mb: isSorry ? 8 : 2,
          background: isSorry
            ? 'linear-gradient(135deg, #fb923c 0%, #f87171 100%)'
            : 'linear-gradient(135deg, #ff4d8d 0%, #a855f7 50%, #60a5fa 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          maxWidth: 820,
          lineHeight: 1.15,
          fontSize: { xs: '2.2rem', sm: '3rem', md: '3.75rem' },
          letterSpacing: '-0.02em',
        }}
      >
        {isSorry
          ? 'Oh sorry, only females allowed :('
          : "Hey, I'm Marcus, a software developer, who are you?"}
      </Typography>

      {!isSorry && (
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mb: 6, maxWidth: 460, opacity: 0.65, fontWeight: 400 }}
        >
          Choose your gender below to get started
        </Typography>
      )}

      {isSorry ? (
        <Button
          onClick={onTryAgain}
          variant="outlined"
          size="large"
          startIcon={<ReplayIcon />}
          sx={{
            mt: 2,
            px: 4,
            py: 1.5,
            borderColor: 'rgba(255,255,255,0.25)',
            color: 'rgba(255,255,255,0.8)',
            borderRadius: 3,
            fontWeight: 700,
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': {
              borderColor: '#f472b6',
              color: '#f472b6',
              background: 'rgba(244,114,182,0.08)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          Try again
        </Button>
      ) : (
        <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, flexWrap: 'wrap', justifyContent: 'center' }}>
          {GENDERS.map(({ label, value, Icon, color }) => (
            <Card
              key={value}
              onClick={() => onSelect(value)}
              elevation={0}
              sx={{
                width: { xs: 140, sm: 180 },
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 4,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: `0 24px 64px ${color}50`,
                  borderColor: color,
                  background: `${color}18`,
                },
              }}
            >
              <CardActionArea sx={{ borderRadius: 4 }}>
                <CardContent sx={{ textAlign: 'center', py: { xs: 3, sm: 4 } }}>
                  <Icon sx={{ fontSize: 60, color, mb: 1, display: 'block', mx: 'auto' }} />
                  <Typography variant="h6" fontWeight={700} sx={{ color: 'rgba(255,255,255,0.9)' }}>
                    {label}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}
