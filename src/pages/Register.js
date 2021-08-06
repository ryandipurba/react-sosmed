import { React, useState } from 'react'
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import '../styles/register.css';
import { register } from '../services/auth'

const Register = () => {

 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [username, setUsername] = useState('')
 const [rePassword, setRePassword] = useState('')
 const [err, setErr] = useState({
  password: false,
  email: false,
  username: false,
  rePassword: false
 })

 const handleRegister = async () => {
  let { valid } = await validate()

  if (valid) {
   const { status } = await register(email, password)
   if (status === 200) return window.location = '/'
  }
 }

 const validate = async () => {
  let errEmail = !email.match(/\S+@\S+\.\S+/) || email.length === 0 ? true : false
  let errPass = password.length === 0 ? true : false
  let errUname = username.length === 0 ? true : false
  let errRePass = rePassword.length === 0 ? true : false


  setErr({ email: errEmail, password: errPass, username: errUname, rePassword: errRePass })
  let valid = errEmail || errPass || errRePass || errUname ? false : true
  return ({ valid })
 }

 return (
  <Container className="regsiter">
   <h1>Sopic</h1>
   <Row>
    <Col md={{ size: 6, offset: 3 }} sm="12" className="form">
     <h3 className="text-center">Create Your Account</h3>
     <Form>
      <FormGroup className="form-group">
       <Label for="email">Email</Label>
       <Input type="text" name="email" id="email" value={email}
        onChange={(e) => setEmail(e.target.value)}
        invalid={err.email} />
       <FormFeedback> {err.email && "email harus diisi"}</FormFeedback>
      </FormGroup>
      <FormGroup className="form-group">
       <Label for="username">Username</Label>
       <Input type="text" name="username" id="username" value={username}
        onChange={(e) => setUsername(e.target.value)}
        invalid={err.username} />
       <FormFeedback> {err.username && "Username harus diisi"}</FormFeedback>
      </FormGroup>
      <FormGroup className="form-group">
       <Label for="password">Password</Label>
       <Input type="password" name="password" id="password" value={password}
        onChange={(e) => setPassword(e.target.value)}
        invalid={err.password} />
       <FormFeedback> {err.password && "password harus diisi"}</FormFeedback>
      </FormGroup>
      <FormGroup className="form-group">
       <Label for="retypePassword">Retype Password</Label>
       <Input type="password" name="password" id="retypePassword" value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        invalid={err.rePassword} />
       <FormFeedback> {err.rePassword && "password harus diisi"}</FormFeedback>
      </FormGroup>
      <Button color="primary" onClick={() => handleRegister()}>Create Account</Button>
     </Form>
    </Col>
   </Row>
  </Container >
 )
}

export default Register
