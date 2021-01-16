import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Register (props) {
    const [showpass,setPass] = useState(false)
    const [unComplete,setUnCom] = useState(false)
    const [name,setName] = useState('')
    const [error,setError] = useState(false)
    const [surName,setSurName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [rol, setrol] = useState('');
    const classes = useStyles();
    
    const handleChange = (event) => {
        setrol(event.target.value);
      };

    const saveUser = () => {
            if(name !== '' && surName !== '' && email !== '' && password !== '' && rol !== ''){
                db.put({
                    _id:email,
                    name:name,
                    surName:surName,
                    rol:rol,
                    password: passwordHash.generate(password)
                }).then(function (){
                    props.showLogin(true)
                }).catch(function (err) {
                    setError(true)
                  });          
            }
        else{
            setUnCom(true)
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
                        error={error}
                        helperText={error && "E-mail invalido"}
                        required
                        fullWidth
                        id="email"
                        label="Email"
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
                        label="Contraseña"
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
                    <FormControl variant="outlined" className={classes.form}>
                        <InputLabel id="demo-simple-select-outlined-label">Rol</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={rol}
                            onChange={handleChange}
                            label="Rol"
                        >
                            <MenuItem value={0}>Bioquimico</MenuItem>
                            <MenuItem value={1}>Secretaria/o</MenuItem>
                            <MenuItem value={2}>Jefe?</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        onClick={()=>saveUser()}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
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
                <Grid>
                {((name === '' || surName === '' || email === '' || password === '' || rol === '') && unComplete) &&
                <Typography style={{color:'red'}}>
                    Completa todos los datos * 
                </Typography>
                }
                </Grid>
            </div>
        </Container>
    );
}

