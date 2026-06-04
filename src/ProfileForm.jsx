import { useState } from 'react'
import {
  Box, Typography, TextField, Autocomplete, Chip,
  Button, Paper, InputAdornment,
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import CakeIcon from '@mui/icons-material/Cake'
import HeightIcon from '@mui/icons-material/Height'
import TranslateIcon from '@mui/icons-material/Translate'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import SendIcon from '@mui/icons-material/Send'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'

const LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
  'Russian', 'Japanese', 'Chinese (Mandarin)', 'Arabic', 'Swedish',
  'Norwegian', 'Danish', 'Finnish', 'Dutch', 'Polish', 'Turkish',
  'Korean', 'Hindi', 'Greek',
]

const RELATIONSHIP_OPTIONS = [
  'Serious relationship', 'Casual dating', 'Friendship first',
  'Long-term commitment', 'Open to anything', 'Eventually marriage',
  'Just vibes for now',
]

const HOBBY_SUGGESTIONS = [
  'Reading', 'Hiking', 'Cooking', 'Gaming', 'Traveling', 'Yoga',
  'Photography', 'Music', 'Dancing', 'Drawing / Painting', 'Fitness',
  'Movies & Series', 'Coding', 'Gardening', 'Swimming', 'Cycling',
  'Rock climbing', 'Meditation', 'Pottery', 'Wine tasting', 'Concerts',
]

function tagChip(color) {
  return {
    background: `${color}28`,
    border: `1px solid ${color}55`,
    color: '#fff',
    '& .MuiChip-deleteIcon': { color: `${color}90`, '&:hover': { color } },
  }
}

// Prevent spreadsheet formula injection: strings starting with =+-@ are
// interpreted as formulas by Google Sheets if not escaped.
function sanitizeStr(value) {
  if (typeof value !== 'string') return String(value)
  const s = value.trim().slice(0, 500)
  return /^[=+\-@\t\r]/.test(s) ? `'${s}` : s
}

function sanitizeForm(form) {
  return {
    location:   sanitizeStr(form.location),
    contact:    sanitizeStr(form.contact),
    age:        Number(form.age),
    height:     Number(form.height),
    languages:  form.languages.map(sanitizeStr),
    lookingFor: form.lookingFor.map(sanitizeStr),
    hobbies:    form.hobbies.map(sanitizeStr),
  }
}

export default function ProfileForm() {
  const [form, setForm] = useState({
    location: '',
    contact: '',
    age: '',
    height: '',
    languages: [],
    lookingFor: [],
    hobbies: [],
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.location.trim())                    e.location  = 'Please enter your location'
    if (!form.contact.trim())                     e.contact   = 'How can Marcus reach you?'
    if (!form.age || Number(form.age) < 18)       e.age       = 'Must be 18 or older'
    if (!form.height || Number(form.height) < 100) e.height   = 'Enter a valid height'
    if (form.languages.length === 0)              e.languages  = 'Pick at least one language'
    if (form.lookingFor.length === 0)             e.lookingFor = "Tell us what you're looking for"
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    const sheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL
    if (sheetsUrl) {
      fetch(sheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(sanitizeForm(form)),
      }).catch(() => {})
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 3,
      }}>
        <FavoriteRoundedIcon sx={{ fontSize: 88, color: '#ff4d8d', mb: 3 }} />
        <Typography
          variant="h3"
          fontWeight={900}
          sx={{
            background: 'linear-gradient(90deg, #ff4d8d, #a855f7)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          You look amazing!
        </Typography>
        <Typography variant="h6" color="text.secondary" fontWeight={400}>
          Marcus will be in touch soon 💌
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8,
      px: 3,
    }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          maxWidth: 640,
          width: '100%',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 6,
          p: { xs: 3, sm: 5 },
        }}
      >
        <Typography
          variant="h4"
          fontWeight={900}
          mb={1}
          sx={{
            background: 'linear-gradient(90deg, #ff4d8d, #a855f7)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Tell me about yourself
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ my: 3 }}>
          Let Marcus get to know you a little better 💖
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Location */}
          <TextField
            label="Where are you from?"
            value={form.location}
            onChange={updateField('location')}
            fullWidth
            error={!!errors.location}
            helperText={errors.location}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon sx={{ color: '#f472b6' }} />
                </InputAdornment>
              ),
            }}
          />
          {/* Age & Height */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Age"
              type="number"
              value={form.age}
              onChange={updateField('age')}
              error={!!errors.age}
              helperText={errors.age}
              inputProps={{ min: 18, max: 99 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CakeIcon sx={{ color: '#c084fc' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 1 }}
            />
            <TextField
              label="Height (cm)"
              type="number"
              value={form.height}
              onChange={updateField('height')}
              error={!!errors.height}
              helperText={errors.height}
              inputProps={{ min: 100, max: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HeightIcon sx={{ color: '#60a5fa' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 1 }}
            />
          </Box>

          {/* Languages */}
          <Autocomplete
            multiple
            options={LANGUAGES}
            value={form.languages}
            onChange={(_, v) => setForm(p => ({ ...p, languages: v }))}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip key={option} label={option} {...getTagProps({ index })} size="small" sx={tagChip('#22d3ee')} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Spoken Languages"
                error={!!errors.languages}
                helperText={errors.languages}
                InputProps={{
                  ...(params.InputProps ?? {}),
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <TranslateIcon sx={{ color: '#22d3ee' }} />
                      </InputAdornment>
                      {params.InputProps?.startAdornment}
                    </>
                  ),
                }}
              />
            )}
          />

          {/* Looking for */}
          <Autocomplete
            multiple
            options={RELATIONSHIP_OPTIONS}
            value={form.lookingFor}
            onChange={(_, v) => setForm(p => ({ ...p, lookingFor: v }))}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip key={option} label={option} {...getTagProps({ index })} size="small" sx={tagChip('#f472b6')} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="What are you looking for?"
                error={!!errors.lookingFor}
                helperText={errors.lookingFor}
                InputProps={{
                  ...(params.InputProps ?? {}),
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <FavoriteIcon sx={{ color: '#f472b6' }} />
                      </InputAdornment>
                      {params.InputProps?.startAdornment}
                    </>
                  ),
                }}
              />
            )}
          />

          {/* Hobbies */}
          <Autocomplete
            multiple
            freeSolo
            options={HOBBY_SUGGESTIONS}
            value={form.hobbies}
            onChange={(_, v) => setForm(p => ({ ...p, hobbies: v }))}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip key={option} label={option} {...getTagProps({ index })} size="small" sx={tagChip('#fbbf24')} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Hobbies & Interests"
                helperText="Pick from the list or type your own and press Enter"
                InputProps={{
                  ...(params.InputProps ?? {}),
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <EmojiEmotionsIcon sx={{ color: '#fbbf24' }} />
                      </InputAdornment>
                      {params.InputProps?.startAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
                    {/* Contact info */}
          <TextField
            label="How can Marcus reach you?"
            placeholder="Email, Whatsapp, Instagram, Snapchat etc..."
            value={form.contact}
            onChange={updateField('contact')}
            fullWidth
            error={!!errors.contact}
            helperText={errors.contact}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon sx={{ color: '#34d399' }} />
                </InputAdornment>
              ),
            }}
          />


          <Button
            type="submit"
            variant="contained"
            size="large"
            endIcon={<SendIcon />}
            sx={{
              mt: 1,
              py: 1.75,
              background: 'linear-gradient(90deg, #ff4d8d 0%, #a855f7 100%)',
              fontWeight: 800,
              fontSize: '1.05rem',
              borderRadius: 3,
              letterSpacing: '0.04em',
              textTransform: 'none',
              boxShadow: '0 8px 32px rgba(255,77,141,0.35)',
              '&:hover': {
                background: 'linear-gradient(90deg, #ff2070 0%, #9333ea 100%)',
                boxShadow: '0 12px 40px rgba(255,77,141,0.5)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Send to Marcus
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
