import React, {Fragment, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {login} from "../../actions/auth";


export function Login(props){

    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
  })

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


    return(
        <Fragment>
            <Container>
                <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label for='email'>Email</Label>
                    <Input id='email' name='email'
                           onChange={onChange}
                           value={userCredentials.email}/>
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input name='password'
                            onChange={onChange}
                           value={userCredentials.password}/>
                </FormGroup>
                <Button type='submit'>Login</Button>
                </Form>
            </Container>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}

export default connect(null, {login})(Login);