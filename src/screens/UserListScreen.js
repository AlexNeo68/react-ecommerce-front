import React, { useState, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Col, Row, Button, Table } from 'react-bootstrap'
import AlertMessage from '../components/AlertMessage'
import Loader from '../components/Loader'
import { getUserDetail, getUsers, updateUserProfile } from '../actions/userActions'
import { USER_PROFILE_RESET } from '../constants/userConstants'
import { getMyOrders } from '../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'

export default function UserListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {users, loading, error} = useSelector(state=>state.userList)

    const deleteHandler = (id) => {
        console.log('delete user')
    }

    useEffect(()=>{
        dispatch(getUsers())
    }, [dispatch])






  return (

    <>
        <h1>Users list</h1>
        {loading ? <Loader /> : error ? <AlertMessage variant='danger'>{error}</AlertMessage> : (
            <Table striped bordered responsive className='table-sm'>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th></th>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (<i className='fas fa-check' style={{color: 'green'}}></i>):(<i className='fas fa-check' style={{color: 'red'}}></i>)}</td>
                                
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                
            </Table>
        ) }
    </>
    
    
  )
}
