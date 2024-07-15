import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod, saveShippingAddress } from '../actions/cartActions'
import OrderSteps from '../components/OrderSteps'

export default function PaymentScreen() {

    const {shippingAddress, paymentMethod} = useSelector(state=>state.cart)

    const [paymentMethodForm, setPaymentMethodForm] = useState(paymentMethod||'paypal')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!shippingAddress) navigate('/shipping')
    }, shippingAddress)

    const handlerSubmit = (e) => {
        e.preventDefault()
       
        dispatch(savePaymentMethod(paymentMethodForm))
        navigate('/placeorder')

    }

  return (
    <>
    <OrderSteps step1 step2 step3></OrderSteps>
    
    <FormContainer>
        <h1>Payment Method</h1>
        
        <Form onSubmit={handlerSubmit}>
            <Form.Group controlId='address'>
                <Form.Label as='legend'>Select your payment method</Form.Label>
                <Col>
                    <Form.Check
                     type='radio' 
                     id='paypal'
                     label='Paypal or Credit Card'
                     name='paymentMethod'
                     value='paypal'
                     checked
                     onChange={e=>setPaymentMethodForm(e.target.value)}>

                     </Form.Check>
                </Col>
                
            </Form.Group>
            
            <Button variant='primary' type='submit'>Continue</Button>
        </Form>
    </FormContainer>
    </>
    
  )
}
