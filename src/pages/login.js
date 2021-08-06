import { useState, useEffect } from 'react';
import { Button, Col, Input, Row, Label, FormFeedback } from 'reactstrap';
import '../styles/login.css';
import { login } from '../services/auth'

const LoginPage = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState({
    password: false,
    email: false
  })

  const handleLogin = async () => {
    let { valid } = await validate()

    if (valid) {
      const { status } = await login(email, password)
      if (status === 200) return window.location = '/home'
    }
  }

  const validate = async () => {
    let errEmail = !email.match(/\S+@\S+\.\S+/) || email.length === 0 ? true : false
    let errPass = password.length === 0 ? true : false


    setErr({ email: errEmail, password: errPass })
    let valid = errEmail || errPass ? false : true
    return ({ valid })
  }

  useEffect(() => {
    let isAuth = localStorage.getItem('logged')
    if (isAuth) {
      props.history.push('/home')
    }
  }, [props.history])


  return (
    <div className="login">

      <Row className="navbar">
        <Col xs={7} sm={10} md={7} className="app_name_header">
          👁️‍🗨️SOSPIC
        </Col>
        <Col className="btn_redirect" xs={5} sm={2} md={5}>
          <a href="/register"> Register </a>
        </Col>
      </Row>

      <Row>
        <Col className="wording" md={6}>
          <Row className="desc_1">
            Welcome to your playground community.
          </Row>
          <Row className="desc_2">
            Explore and get so many topics that you want in single platform.
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <Label className="title"> Sign In </Label>
          </Row>
          <Col className="col_field" >
            <Label> Email </Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              invalid={err.email}
            />
            <FormFeedback> {err.email && "format email tidak sesuai"}</FormFeedback>
          </Col>
          <Col className="col_field" >
            <Label> Password </Label>
            <Input type="password" value={password} onChange={(e) => {
              setPassword(e.target.value)
              console.log({ e })
            }} invalid={err.password} />
            <FormFeedback> {err.password && "password harus diisi"}</FormFeedback>
          </Col>
          <Row>
            <Button className="btn_login" onClick={() => handleLogin()}> Sign In</Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
