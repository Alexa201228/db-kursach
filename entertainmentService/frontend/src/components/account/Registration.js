import React, {Fragment, useState} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {register} from "../../actions/auth";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import {Box, Container, CssBaseline, Typography} from "@mui/material";
import {MuiThemeProvider, TextField} from "material-ui";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function Registration(props){
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
  })

  const onSubmit = (e) => {
    e.preventDefault();
    props.register({
        'email':userCredentials.email,
        'password': userCredentials.password,
        'is_manager': true
    });
  };

  const onChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value })
  };

  const classes = useStyles();

  return (
      <MuiThemeProvider>
    <Fragment>
      <Container>
      <CssBaseline />
      <div className='col-md-6 m-auto'>
        <div className='card card-body mt-5'>
          <h2 className='text-center'>Register</h2>
          <form onSubmit={onSubmit}>
            <div className="container">
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

            <Typography paragraph={true}>
              Уже зарегистрированы? <Link to="/login">Login</Link>
            </Typography>
                <Button variant="contained" type='submit' color="primary" className={classes.submit}>
                Register
              </Button>
            </div>
          </form>
        </div>
        </div>
      </Container>
    </Fragment>
</MuiThemeProvider>
    );
}

Registration.propTypes = {
  register: PropTypes.func.isRequired
}

export default connect(null, {register})(Registration);