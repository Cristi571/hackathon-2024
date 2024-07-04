import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        // Client-side validation
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        // Prepare the request body
        const requestBody = {
            email,
            password,
        };

        try {
            // Send POST request to authenticate endpoint
            const response = await fetch('http://localhost:5001/api/authenticate', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            console.log("response : ", response);

            // Parse JSON response
            const data = await response.json();
            console.log("data : ", data);
            if (!response.ok) {
                
            }
            if (data.success && data.token) {
                // Store the token in localStorage
                localStorage.setItem('token', data.token);
                // Optionally store user information if needed
                localStorage.setItem('user', JSON.stringify(data.user));
                // Redirect to a different page (e.g., dashboard)
                navigate('/dashboard');
            } else {
                setError('Authentication failed');
            }

            } catch (error) {
                console.error('Error logging in:', error);
                setError('Invalid credentials. Please try again.'); // Handle authentication errors
            }
        };

return (
    <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
            Login
        </Typography>
        {error && (
            <Typography variant="body2" color="error" align="center" paragraph>
            {error}
            </Typography>
        )}
        <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
            >
            Login
            </Button>
            <Grid container justifyContent="center">
            <Grid item>
                <Button
                variant="text"
                color="primary"
                // onClick={() => history.push('/forgot-password')}
                >
                Forgot password?
                </Button>
            </Grid>
            </Grid>
        </Box>
        </Paper>
    </Container>
    );
};

export default Login;