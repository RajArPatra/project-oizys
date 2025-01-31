import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';

import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

import { login, logout } from '../actions/user.actions';

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingLogin, error: errorLogin, userInfo } = userLogin;

  const redirect = '/survey/03';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    } else {
      dispatch(logout());
    }
  }, [history, dispatch, userInfo, redirect]);

  const submitHandler = (event) => {
    event.preventDefault();

    console.log('LOGIN');
    // LOGIN USER
    if (email && password) {
      dispatch(login(email, password));
    } else {
      console.error('Please enter all the details!');
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {errorLogin && <Message variant='danger'>{errorLogin}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          {/* <Form.Label>Email Address</Form.Label> */}
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          {loadingLogin ? <Spinner animation='border' size='sm' /> : 'Sign In'}
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer? <Link to='/register'>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
