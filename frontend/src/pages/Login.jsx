import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container
} from '@mui/material';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (email === 'admin' && password === 'admin') {
      localStorage.setItem('role', 'admin');
      navigate('/admin');
    } else if (email === 'user' && password === 'user') {
      localStorage.setItem('role', 'hospital');
      navigate('/hospital');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={2}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              Federated CVD Risk Prediction
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Sign in to access the platform
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                autoComplete="email"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                Sign In
              </Button>
            </form>

            <Box sx={{ mt: 3, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary" display="block">
                Admin: admin / admin
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Hospital: user / user
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}