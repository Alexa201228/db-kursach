import React, {Fragment, useState} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {register} from "../../actions/auth";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


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


    return(
        <Fragment>
            <form onSubmit={onSubmit}>
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
                <Button type='submit'>Register</Button>
            </form>
        </Fragment>
    )
}

Registration.propTypes = {
  register: PropTypes.func.isRequired
}

export default connect(null, {register})(Registration);