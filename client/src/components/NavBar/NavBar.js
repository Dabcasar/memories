import React, {useState, useEffect} from "react";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import memories from '../../images/memories.png';
import useStyles from './styles'
import {Link, useLocation} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import decode from 'jwt-decode';
const NavBar = () => {
    const classes = useStyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();

    console.log(user);

    useEffect(() => {
        const token = user?.token;

        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()){
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])
    

    const logout = () =>{
        dispatch({type : 'LOGOUT'});
        history.push('/')
        setUser(null);
    }
    
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
        <div className = {classes.brandContainer}>

      
        <Typography component = {Link} to = "/" className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
        </div>
        <Toolbar className = {classes.toolbar}>
            {user ? (
                <div className = {classes.profile}>
                    <Avatar className = {classes.purple} alt = {user.result.name} src = {user.result.imageUrl}>
                    {user.result.name.charAt(0)}
                    </Avatar>
                    <Typography className = {classes.userName} variant = "h6">
                    {user.result.name}
                    </Typography>
                    <Button variant = "contained" className = {classes.logout} color = "secondary" onClick = {logout}>
                    Logout
                    </Button>
                </div>
            ): (
                <Button component = {Link} to = "/auth" variant = "contained" color = "primary" >Sign in</Button>
            )}
        </Toolbar>
        
      </AppBar>
    )
}

export default NavBar;