import React, {Fragment, useState} from "react";
import PropTypes from "prop-types";
import {connect, useSelector} from "react-redux";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {login} from "../../actions/auth";
import {Link, Redirect} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import {MuiThemeProvider, TextField} from "material-ui";
import {makeStyles} from "@mui/styles";

const loginStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function Login(props){

    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
  })

    const {isAuthenticated} = useSelector(state => state.auth)

  const onSubmit = (e) => {
    e.preventDefault();
    props.login({
        'email':userCredentials.email,
        'password': userCredentials.password
    });
  };

  const onChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value })
  };

  const loginClasses = loginStyles()


  if(isAuthenticated){
      return <Redirect to={'/'}/>
  }
  return (
      <MuiThemeProvider>
      <Container p={2}>
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
          <form onSubmit={onSubmit}>
            <Box my={2}>
              <TextField
                autoComplete="email"
                type="email"
                name="email"
                label="Email"
                onChange={onChange}
                value={userCredentials.email}
                variant="filled"
                autoFocus
              />
            </Box>
            <Box my={2}>
              <TextField
                autoComplete="current-password"
                type="password"
                name="password"
                label="Password"
                onChange={onChange}
                value={userCredentials.password}
                variant="filled"
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={loginClasses.submit}
              size="large"
            >
              Login
            </Button>
            <Typography paragraph={true}>
              Don't have an account? <Link to="/register">Register</Link>
            </Typography>
          </form>
        </div>
      </div>
      </Container>
</MuiThemeProvider>
    );
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}

export default connect(null, {login})(Login);