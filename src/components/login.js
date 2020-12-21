import React, { useState, useEffect } from 'react';
import {
	Grid,
	TextField,
	Button,
	InputAdornment,
	FormControlLabel,
	Checkbox,
	Link
} from '@material-ui/core';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './login.scss'; 


function Login() {
    const [showpass,setShow] = useState(true)
    return (
      <div>
            <Grid
			    id="session-page"
				className="PublicRoute"
			>
                <Grid
                    className="accountArea"
                >
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <form
                                className="accountWrapper"
                            >
                                <Grid
                                    className="accountInfo"
                                >
                                    <div
                                        className="image"
                                    >
                                        <img
                                            src="/images/exp.png"
                                            alt=""
                                        />
                                    </div>
                                    <p> </p> 
                                </Grid>
                                <Grid
                                    className="accountForm"
                                >
                                    <div
                                        className="fromTitle"
                                    >
                                        <h2>Login</h2>														
                                        <p>Ingresa a tu cuenta para operar</p>		
                                    </div>

                                    <TextField
                                        label="E-mail"
                                        placeholder="E-mail"
                                        fullWidth
                                        variant="outlined"
                                        name="username_or_email"
                                        //onChange={this.changeHandler}
                                        //value={username_or_email}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        //error={error.email && true}
                                        //helperText={error.email && error.email}
                                        className="formInput"
                                    />
                                    <TextField
                                        label="Contraseña"
                                        placeholder="Contraseña"
                                        fullWidth
                                        type={showpass ? 'text' : 'password'}
                                        variant="outlined"
                                        name="password"
                                        //onChange={this.changeHandler}
                                        //value={password}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        //error={error.password && true}
                                        //helperText={error.password && error.password}
                                        className="formInput"
                                        InputProps={{
                                            endAdornment: (
                                                <Button
                                                    //onClick={this.showpassHandler}
                                                    position="end"
                                                    color="primary"
                                                >
                                                    { showpass ? <FaEyeSlash /> : <FaEye /> }
                                                </Button>
                                            )
                                        }}
                                    />
                                    <Grid
                                        className="loginAction"
                                    >
                                    {/*Link to a not code by now screen */}
                                        <Link to="/recover-password">¿Olvidaste la contraseña?</Link>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        className="btn bg-default accountBtn"
                                        //onClick={this.submitHandler}
                                    >
                                            Ingresar
                                    </Button>
                                    <p className="subText">
                                        O accede con... <br></br>
                                    </p>
                                    <p className="subText">
                                        ¿No tenés cuenta? <br></br>
                                    </p>
                                    <Button
                                            className="btn bg-default accountBtn"
                                            //onClick={()=>Router.push('/register')}
                                        >
                                            Registrate con un e-mail
                                    </Button>	
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
      </div>
    );
  }

export default Login;
