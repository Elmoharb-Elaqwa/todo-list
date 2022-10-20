import Button from 'react-bootstrap/Button';

import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  console.log(login);
  return (
    <div>
      <Form
        className="loginForm "
        onSubmit={(e) => {
          e.preventDefault();
          axios
            .post('https://api-nodejs-todolist.herokuapp.com/user/login', login)
            .then((success) => {
              console.log(success.data.user);
              setSuccess('true');
              sessionStorage.setItem('token', success.data.token);
              navigate('/allTodos');
            })
            .catch((error) => {
              if (error.response.data.includes('Unable to login')) {
                setSuccess('false');
              }
            });
        }}
      >
        <Form.Group>
          <Form.Label>Email</Form.Label>

          <Form.Control
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Enter Your Email"
            required
          />
        </Form.Group>
        <Form.Group className="mt-5">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            placeholder="Enter Your Password"
            required
            name="password"
            onChange={handleChange}
          />
          {success === 'false' ? (
            <Form.Text style={{ color: 'red' }} className="mt-3">
              Username Or Password Incorrect
            </Form.Text>
          ) : (
            ''
          )}
        </Form.Group>
        <div className="d-flex align-items-center text-center mt-2">
          <Button className="mt-3" variant="primary" type="submit">
            Login
          </Button>
          <div className="text-center pt-3 mx-2">
            Or Create new account <Link to="/register">Create</Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
