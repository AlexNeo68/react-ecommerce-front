import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Col, ListGroup, Row, Button, Card } from 'react-bootstrap'
import AlertMessage from '../components/AlertMessage'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import queryString from "query-string"

export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {userInfo, loading, error} = useSelector(state=>state.userLogin)

    const params = queryString.parse(window.location.search)

    const redirect = params.redirect || '/'

    const handlerSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    useEffect(()=>{
        console.log(redirect)
        if(userInfo){
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])



  return (
    
    <FormContainer>
        <h1>Login</h1>
        {error&&<AlertMessage variant='danger'>{error}</AlertMessage>}
        {loading&&<Loader />}
        <Form onSubmit={handlerSubmit}>
            <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' value={email} onChange={e=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange={e=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit'>Login</Button>
        </Form>
        <Row>
            <Col>
                New customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register/'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
    
  )
}
