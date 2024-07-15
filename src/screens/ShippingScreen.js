import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

export default function ShippingScreen() {

    const {shippingAddress} = useSelector(state=>state.cart)

    const [address, setAddress] = useState(shippingAddress?.address||'')
    const [city, setCity] = useState(shippingAddress?.city||'')
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode||'')
    const [country, setCountry] = useState(shippingAddress?.country||'')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handlerSubmit = (e) => {
        e.preventDefault()
       
        dispatch(saveShippingAddress({
            address, city, postalCode, country
        }))
        navigate('/payment')

    }

  return (
    
    <FormContainer>
        <h1>Shipping Address</h1>
        
        <Form onSubmit={handlerSubmit}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' value={address} onChange={e=>setAddress(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' value={city} onChange={e=>setCity(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type='text' value={postalCode} onChange={e=>setPostalCode(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' value={country} onChange={e=>setCountry(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit'>Continue</Button>
        </Form>
    </FormContainer>
    
  )
}
