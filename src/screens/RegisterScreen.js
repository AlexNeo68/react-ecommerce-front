import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Col, ListGroup, Row, Button, Card } from 'react-bootstrap'
import AlertMessage from '../components/AlertMessage'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import queryString from "query-string"

export default function LoginScreen() {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {userInfo, loading, error} = useSelector(state=>state.userRegister)

    const params = queryString.parse(window.location.search)

    const redirect = params.redirect || '/'

    const handlerSubmit = (e) => {
        e.preventDefault()
        if(password!==confirmPassword){
            setMessage('Password do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])



  return (
    
    <FormContainer>
        <h1>Register</h1>
        {message&&<AlertMessage variant='danger'>{message}</AlertMessage>}
        {error&&<AlertMessage variant='danger'>{error}</AlertMessage>}
        {loading&&<Loader />}
        <Form onSubmit={handlerSubmit}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' value={name} onChange={e=>setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='name'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' value={email} onChange={e=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange={e=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit'>Register</Button>
        </Form>
        <Row>
            <Col>
               Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login/'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
    
  )
}
