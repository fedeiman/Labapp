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
import "./Login.scss"
import PatientForm from '../../Components/Forms/patientForm'
const PouchDB = require('pouchdb-browser');
const pouchDB = PouchDB.default.defaults();
const db = new pouchDB('Users');
var passwordHash = require('password-hash');


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
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
    const [badLogin,setBadLogin] = useState(false)
    const classes = useStyles();
    
    const show = () => {
        db.allDocs({include_docs: true})
            .then(function (response) {
                    console.log(response);
                }).catch(function (err) {
                    console.log(err);
                })
    }
    const auth = () => {
        db.get(email)
            .then(function (doc) {
                if(passwordHash.verify(password,doc.password)){
                    console.log('te logueaste');
                    setBadLogin(false)
                }
                else{
                    console.log('no te logueaste')
                    setBadLogin(true)
                    setEmail('')
                    setPassword('')
                }
            }).catch(function (err) {
                setEmail('')
                setPassword('')
                setBadLogin(true)
            })
    }
    return (
        <Grid>
            <Button
                onClick={show}
            >
                mostrar
            </Button>
            <PatientForm></PatientForm>
            { login ?
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    {badLogin ?
                        <Typography component="h1" variant="h5" id="errorLogin">
                            Email o contraseña incorrecta
                        </Typography>
                    :
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                    } 
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
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={auth}
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

