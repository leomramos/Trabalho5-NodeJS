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

const registerUser = async user => await Axios.post(`${process.env.REACT_APP_SERVER}/api/users/register`, { user }).then(res => {
  username = res.data.name.split(' ')[0];
}).catch(err => {
  Swal.fire({
    backdrop: false,
    timer: 2500,
    timerProgressBar: true,
    title: err.response.data.error,
    icon: 'error',
    confirmButtonColor: '#17a2b8'
  });
});

export const SignUpForm = ({setUser, closeModal}) => {
  const [rerender, setRerender] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const queryClient = useQueryClient();

  const registerUserMutation = useMutation(registerUser, {
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
          text: `You have created your account and logged in automatically!`,
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
      registerUserMutation.mutate({name, email, password});
    } else {
      validator.current.showMessages();
      setRerender(!rerender);
    }
  }

  return (
    <Form className="d-flex flex-column">
      <h5 className="fw-normal mb-3 pb-3">Create a new account</h5>
      {validator.current.messageWhenPresent(name)}

      <Form.Floating className="mb-4">
        <Form.Control type="text" id="name" onBlur={() => validator.current.showMessageFor('name')} value={name} onChange={e => setName(e.target.value)} placeholder="name@example.com" spellCheck="false" autoCorrect="off" autoCapitalize="off"/>
        <Form.Label htmlFor="name">Name</Form.Label>
        {validator.current.message('name', name, 'required|min:3|max:50|alpha_space')}
      </Form.Floating>

      <Form.Floating className="mb-4">
        <Form.Control type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" spellCheck="false" autoCorrect="off" autoCapitalize="off"/>
        <Form.Label htmlFor="email">Email address</Form.Label>
        {validator.current.message('email', email, 'required|email')}
      </Form.Floating>

      <Form.Floating className="mb-4">
        <Form.Control type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" spellCheck="false" autoCorrect="off" autoCapitalize="off" name="current-password" autoComplete="current-password"/>
        <Form.Label htmlFor="password">Password</Form.Label>
        {validator.current.message('password', password, 'required|min:4|max:16')}      
        </Form.Floating>
      
      <Button variant="dark" className="w-100 mb-3 mt-1" onClick={submitForm}>Register</Button>
    </Form>
  )
}