import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation} from 'react-router-dom';

function SignInSide(props) {
  const [inputs, setInputs] = useState({
    name: "",
    age: "",
    class: "",
    department: ""
  });

  const navigate = useNavigate();
  const location = useLocation();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [e.target.name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("clicked");

    
    try {
      if (location.state !== null && location.state.val) {
        const response = await axios.put("http://localhost:3001/edit/" + location.state.val._id,inputs);
        alert(response.data.message);
        navigate('/i');
      } else {
        const response = await axios.post("http://localhost:3001/add",inputs);
        console.log(response);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    if (location.state !== null ) {
      setInputs({...inputs,
        name: location.state.val.name,
        age: location.state.val.age,
        class: location.state.val.class,
        department: location.state.val.department,
      });
    }
  }, [location.state]);

  const theme = createTheme();

  return (
    <div className='Container'>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://cdn-lite.ip2location.com/img/sign-up.png)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={inputs.name}
                  onChange={inputHandler}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="class"
                  label="Class"
                  type="text"
                  id="class"
                  value={inputs.class}
                  onChange={inputHandler}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="age"
                  label="Age"
                  type="text"
                  id="age"
                  value={inputs.age}
                  onChange={inputHandler}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="department"
                  label="Department"
                  type="text"
                  id="department"
                  value={inputs.department}
                  onChange={inputHandler}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default SignInSide;