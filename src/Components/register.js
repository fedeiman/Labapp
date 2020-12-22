import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Container from '@material-ui/core/Container';
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

export default function Register (props) {
    const [showpass,setPass] = useState(false)
    const [name,setName] = useState('')
    const [surName,setSurName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const classes = useStyles();
    
    const saveUser = () => {
        if(name !== ''){
            try {
                db.put({
                    _id:email,
                    name:name,
                    surName:surName,
                    password:password
                })
                
            } catch (error) {
                console.log(error)
            }
        }
        }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Registro
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nombre"
                        name="name"
                        value={name}
                        onChange={({ target: { value }}) => {setName(value)}}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="surName"
                        label="Apellido"
                        name="surName"
                        value={surName}
                        onChange={({ target: { value }}) => {setSurName(value)}}
                    />
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
                        onClick={()=>saveUser()}
                    >
                        Crear Usuario
                    </Button>
                    <Grid item xs>
                        <Button
                            onClick={()=>props.showLogin(true)}
                            fullWidth
                        >
                            Volver
                        </Button>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

