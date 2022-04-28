import React, { useState } from 'react';
import {
  Form,
  Button
} from 'react-bootstrap';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <Form className="d-flex flex-column">
      <h5 className="fw-normal mb-3 pb-3">Sign into your account</h5>

      <Form.Floating className="mb-4">
        <Form.Control type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" spellCheck="false" autoCorrect="off" autoCapitalize="off"/>
        <Form.Label htmlFor="email">Email address</Form.Label>
      </Form.Floating>

      <Form.Floating className="mb-4">
        <Form.Control type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" spellCheck="false" autoCorrect="off" autoCapitalize="off" name="current-password" autocomplete="current-password"/>
        <Form.Label htmlFor="password">Password</Form.Label>
      </Form.Floating>
      
      <Button variant="dark" className="w-100 mb-3 mt-1">Login</Button>
    </Form>
  )
}