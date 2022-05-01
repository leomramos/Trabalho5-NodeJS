import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import {
  Form,
  Button
} from 'react-bootstrap';
import Swal from 'sweetalert2'

import Axios from 'axios';

import {
  useMutation,
  useQueryClient
} from 'react-query';

let username;

const loginUser = async user => {
  await Axios.post(`${process.env.REACT_APP_SERVER}/api/users/login`, { user }).then(res => {
    username = res.data.name.split(' ')[0];
  }).catch(err => {
    Swal.fire({
      backdrop: false,
      timer: 2500,
      timerProgressBar: true,
      title: err.response.data && err.response.data.error,
      icon: 'error',
      confirmButtonColor: '#17a2b8'
    });
  })
};

export const LoginForm = ({setUser, closeModal}) => {
  const [rerender, setRerender] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const queryClient = useQueryClient();

  const loginUserMutation = useMutation(loginUser, {
    onSuccess: _ => {
      if(username) {
        queryClient.invalidateQueries('user');
        setUser(username);
        closeModal();
        Swal.fire({
          backdrop: false,
          timer: 2500,
          timerProgressBar: true,
          title: `Welcome ${username}`,
          text: `You have logged in successfully!`,
          icon: 'success',
          confirmButtonColor: '#17a2b8'
        });
      }
    }
  })

  const validator = useRef(new SimpleReactValidator());

  const submitForm = () => {
    if (validator.current.allValid()) {
      validator.current.hideMessages();
      username = null;
      loginUserMutation.mutate({email, password});
    } else {
      validator.current.showMessages();
      setRerender(!rerender);
    }
  }

  return (
    <Form className="d-flex flex-column">
      <h5 className="fw-normal mb-3 pb-3">Sign into your account</h5>

      <Form.Floating className="mb-4">
        <Form.Control type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" spellCheck="false" autoCorrect="off" autoCapitalize="off"/>
        <Form.Label htmlFor="email">Email address</Form.Label>
        {validator.current.message('email', email, 'required|email')}
      </Form.Floating>

      <Form.Floating className="mb-4">
        <Form.Control type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" spellCheck="false" autoCorrect="off" autoCapitalize="off" name="current-password" autoComplete="current-password"/>
        <Form.Label htmlFor="password">Password</Form.Label>
        {validator.current.message('password', password, 'required')}

      </Form.Floating>
      
      <Button variant="dark" className="w-100 mb-3 mt-1" onClick={submitForm}>Login</Button>
    </Form>
  )
}