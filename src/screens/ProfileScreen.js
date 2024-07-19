import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Col, Row, Button, Table } from 'react-bootstrap'
import AlertMessage from '../components/AlertMessage'
import Loader from '../components/Loader'
import { getUserDetail, updateUserProfile } from '../actions/userActions'
import { USER_PROFILE_RESET } from '../constants/userConstants'
import { getMyOrders } from '../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'

export default function ProfileScreen() {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {userInfo} = useSelector(state=>state.userLogin)

    const { user } = useSelector(state=>state.userDetails)

    const {success, loading, error} = useSelector(state=>state.userUpdateProfile)
    const {orders, loading: loadingMyOrders, error: errorMyOrders} = useSelector(state=>state.getMyOrders)



    const handlerSubmit = (e) => {
        e.preventDefault()
        if(password!==confirmPassword){
            setMessage('Password do not match')
        } else {
            dispatch(updateUserProfile({'name': name, 'email': email, 'password': password}))
        }
    }

    useEffect(()=>{
        if(!userInfo||!userInfo.token){
            navigate('/login/')
        } else {
            if(!user || !user.name || success){
                dispatch({
                    type: USER_PROFILE_RESET
                })
                dispatch(getUserDetail('profile'))
                dispatch(getMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user, navigate, success])



  return (

    <Row>
        <Col xs={12} md={3}>
            <h2>Profile Info</h2>

                {message&&<AlertMessage variant='danger'>{message}</AlertMessage>}
                {error&&<AlertMessage variant='danger'>{error}</AlertMessage>}

                {loading&&<Loader />}

                <Form onSubmit={handlerSubmit}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' value={name} onChange={e=>setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
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
                    <Button variant='primary' type='submit'>Update Profile</Button>
                </Form>

        </Col>
        <Col xs={12} md={9}>
            <h2>My Orders</h2>
            {loadingMyOrders ? (<Loader />) : errorMyOrders ? (
                <AlertMessage variant='danger'>{errorMyOrders}</AlertMessage>
            ) :(
                <Table striped responsive className='table-sm'>
                    <thead>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{(new Date(order.createdAt)).toLocaleString("ru-RU")}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt : (<i className='fas fa-times'></i>)}</td>
                                    <td>{order.isDelivered ? order.deliveredAt : (<i className='fas fa-times'></i>)}</td>
                                    <td>
                                        <LinkContainer to={`/orders/${order._id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    
                </Table>
            )  }
        </Col>

    </Row>
    
    
    
  )
}
