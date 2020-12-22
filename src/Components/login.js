import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Container from '@material-ui/core/Container';
import Register from './register';
const PouchDB = require('pouchdb-browser');
const pouchDB = PouchDB.default.defaults();
const db = new pouchDB('Users');

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
    const [showpass,setPass] = useState(false)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [login, showLogin] = useState(true)
    const classes = useStyles();
    
    const show = () => {
     db.allDocs({include_docs: true})
     .then(function (response) {
            console.log(response);
          }).catch(function (err) {
            console.log(err);})
    }
    return (
        <Grid>
            { login ?
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form className={classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={({ target: { value }}) => {setEmail(value)}}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type={showpass ? "text" : "password"}
                            name="password"
                            label="Password"
                            id="password"
                            value={password}
                            onChange={({ target: { value }}) => {setPassword(value)}}
                            className="formInput"
                            InputProps={{
                                endAdornment: (
                                    <Button
                                        onClick={()=>setPass(!showpass)}
                                        position="end"
                                        color="primary"
                                    >
                                        { showpass ? <FaEye /> : <FaEyeSlash /> }
                                    </Button>
                                )
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Entrar
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Button>
                                    Forgot password?
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={()=>showLogin(false)}
                                >                                    
                                    Registrate
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        :
            <Register showLogin={showLogin}/>
        }
        </Grid>
    );
}

