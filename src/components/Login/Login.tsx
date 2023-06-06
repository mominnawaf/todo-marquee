import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography } from '@mui/material';
import classes from './Login.module.scss'
import { loginData } from "../../mock/mockdata"

const LoginPage = () => {
    const { login, user } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleLogin = (e: any) => {
        // Make a request to your authentication API to validate the user's credentials and get the JWT.
        // For now, we'll just simulate a successful login.
        e.preventDefault();
        if (loginData.email == email && loginData.password === password) {
            login({ email, token: 'fake_jwt_token' });

        }
        else {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 5000);

        }
    }

    useEffect(() => {
        user && navigate('/dashboard');
    }, [navigate, user]);

    return (
        <form onSubmit={handleLogin} autoComplete="off" className={classes.loginForm}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Login
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Password"
                        variant="outlined"
                        value={password}
                        fullWidth
                        required
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}

                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
            {
                error && <Typography variant="h6" align="center" gutterBottom sx={{color: "red", marginTop: "20px", marginBottom: "20px", display: "block"}}>
                    Invalid Credentials
                </Typography>
            
            }
        </form>
    );
};

export default LoginPage;
