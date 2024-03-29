import React , {useState} from 'react';
import {Avatar, Button, Paper, Grid, TypoGraphy, Container, Typography, TextField} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import Icon from './Icon'
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {signin, signup} from '../../actions/auth';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
const Auth = () => {

  const [isSignUp, setisSignUp] = useState(false);
  const classes = useStyles();
  const [showPassword,setShowPassword]= useState(false);
  const [formData, setFormData] = useState(initialState);
  const handleSubmit = (e) => {
      e.preventDefault();
      if(isSignUp){
        dispatch(signup(formData,history));
      }else{
        dispatch(signin(formData,history));
      }
  }
  const history = useHistory();
  const dispatch = useDispatch();
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({type : 'AUTH', data : {result,token}});
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  const googleFailure = (error) => {
    console.log(error);
    console.log('Google sign in was unsucessful, try again later')
  }
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value});
  }

  const switchMode = () => {
      setisSignUp((prevIsSignUp) => !prevIsSignUp );
      setShowPassword(false);
  }

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword );
  return (
    <Container component = "main" maxWidth = "xs">
      <Paper className = {classes.paper} elevation = {3}>
        <Avatar className = {classes.avatar}>
          <LockOutlinedIcon/> 
        </Avatar>
        <Typography variant = "h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit = {handleSubmit}>
          <Grid container spacing = {2}>
            {
              isSignUp && (
                <>

                <Input name = "firstName" label = "First Name" handleChange = {handleChange} autoFocus half></Input>
                <Input name = "lastName" label = "Last Name" handleChange = {handleChange}  half></Input>
                </>
              )
            }
            <Input name = "email" label = "Email Address" handleChange={handleChange} type = "email"/>
            <Input name = "password" label = "Password" handleChange = {handleChange} type = {showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignUp && <Input name = "confirmPassword" label = "Repeat Password" handleChange={handleChange} type = "password" />}
          </Grid>
            <GoogleLogin clientId='638352234877-je0mgvl0vsg16mrm71g5t3h1k3jgfrcf.apps.googleusercontent.com' render = {(renderProps) => (
              <Button className = {classes.googleButton} color = "primary" fullWidth onClick = {renderProps.onClick} disabled = {renderProps.disabled} startIcon = {<Icon />} variant = "contained">Google Sign In</Button>
            )} onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy = "single_host_origin"/>
          
          <Button type = "submit" variant = "contained" fullWidth color = "primary" className = {classes.submit}>{isSignUp ? 'Sign Up' : 'Sign in'}</Button>
            <Grid container justify = "flex-end">
              <Grid item>
                <Button onClick={switchMode}>{isSignUp ? 'Already have an account, sign in' : "Don't have an account, sign up"}</Button>
              </Grid>
            </Grid>
        </form>
      </Paper>
    </Container>
  )
};

export default Auth;

