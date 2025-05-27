import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
  useTheme
} from '@mui/material';

import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import axios from 'axios';

export default function AuthLogin() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin'); // cambiar por info@hotmail.com si el backend lo exige
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        username: email,
        password: password
      });

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard/default'); // Redirige al dashboard
    } catch (error) {
      alert('Credenciales inválidas');
    }
  };

  return (
    <>
      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-email-login">Usuario</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-login"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          label="Usuario"
        />
      </FormControl>

      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-password-login">Contraseña</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-login"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          label="Contraseña"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((show) => !show)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button color="secondary" fullWidth size="large" variant="contained" onClick={handleLogin}>
            Ingresar
          </Button>
        </AnimateButton>
      </Box>
    </>
  );
}
