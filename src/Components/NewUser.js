import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
const NewUser = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    age: 0,
  });
  const [wrong, setWrong] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Form
      className="gap-4 d-flex flex-column registerForm "
      onSubmit={(e) => {
        e.preventDefault();
        axios
          .post('https://api-nodejs-todolist.herokuapp.com/user/register', user)
          .then((user) => {
            navigate('/login');
          })
          .catch((error) => {
            if (error.response.data.startsWith('E11000')) {
              setWrong('used');
            } else if (
              error.response.data.includes(
                'is shorter than the minimum allowed length'
              )
            ) {
              setWrong('short');
            } else if (error.response.data.includes('Email is invalid')) {
              setWrong('invalid');
            }
          });
      }}
    >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>

        <Form.Control
          className="input-width"
          type="text"
          placeholder="Enter name"
          onChange={handleChange}
          name="name"
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>

        <Form.Control
          className="input-width"
          type="email"
          placeholder="Enter email"
          onChange={handleChange}
          name="email"
          required
        />

        {wrong === 'used' ? (
          <Form.Text style={{ color: 'red' }}>
            This Email Is Already Used
          </Form.Text>
        ) : wrong === 'invalid' ? (
          <Form.Text className="text-muted">Email Is Invalid</Form.Text>
        ) : (
          <Form.Text>We'll never share your email with anyone else.</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>

        <Form.Control
          className="input-width"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          name="password"
        />
        {wrong === 'short' ? (
          <Form.Text style={{ color: 'red' }}>
            Password Should Be 8 Digits
          </Form.Text>
        ) : (
          ''
        )}
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Age</Form.Label>

        <Form.Control
          className="input-width"
          type="number"
          placeholder="Enter Age"
          onChange={handleChange}
          name="age"
          required
        />
      </Form.Group>

      <Form.Group className="d-flex gap-3 align-items-center">
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <div>
          Or Already have an account <Link to="/login">Login</Link>
        </div>
      </Form.Group>
    </Form>
  );
};

export default NewUser;
