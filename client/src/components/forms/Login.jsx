import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import {
  Form,
  Button
} from 'react-bootstrap';

export const LoginForm = ({setUser}) => {
  const [rerender, setRerender] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validator = useRef(new SimpleReactValidator());

  const submitForm = () => {
    if (validator.current.allValid()) {
      validator.current.hideMessages();
      alert('You submitted the form and stuff!');
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
        {validator.current.messageWhenPresent(email)}
      </Form.Floating>

      <Form.Floating className="mb-4">
        <Form.Control type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" spellCheck="false" autoCorrect="off" autoCapitalize="off" name="current-password" autoComplete="current-password"/>
        <Form.Label htmlFor="password">Password</Form.Label>
        {validator.current.message('password', password, 'required')}
        {validator.current.messageWhenPresent(password)}

      </Form.Floating>
      
      <Button variant="dark" className="w-100 mb-3 mt-1" onClick={submitForm}>Login</Button>
    </Form>
  )
}