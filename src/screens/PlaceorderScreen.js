import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, ListGroup, Row, Image, Button, Card, CardBody } from 'react-bootstrap'
import AlertMessage from '../components/AlertMessage'
import OrderSteps from '../components/OrderSteps'
import { createOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import { CREATE_ORDER_CLEAR } from '../constants/orderConstants'

export default function PlaceorderScreen() {
    
    const dispatch = useDispatch()
    const [fullAddress, setFulladdress] = useState('')

    const { items, shippingAddress, paymentMethod } = useSelector(state=>state.cart)
    const { order, loading, success, error } = useSelector(state=>state.createOrder)

    const cartItemsPrice = items.reduce((acc, item)=>acc+Number(item.qty)*Number(item.price), 0).toFixed(2)
    const shippingPrice = cartItemsPrice > 100 ? 0 : 10
    const taxPrice = (.082 * cartItemsPrice).toFixed(2)
    const totalPrice = (Number(cartItemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

    const navigate = useNavigate()

    useEffect(()=>{

        if(shippingAddress){
            const addressAr = []
            if (shippingAddress.address) {
                addressAr.push(shippingAddress.address)
            }
            if (shippingAddress.city) {
                addressAr.push(shippingAddress.city)
            }
            if (shippingAddress.postalCode) {
                addressAr.push(shippingAddress.postalCode)
            }
            if (shippingAddress.country) {
                addressAr.push(shippingAddress.country)
            }
            setFulladdress(addressAr.join(', '))
        }

        if(!paymentMethod) navigate('/payment')
    },
    [items, shippingAddress, paymentMethod])

    function handlerPlaceOrder(id){
        dispatch(createOrder({
            'orderItems': items,
            'paymentMethod': paymentMethod,
            'taxPrice': taxPrice,
            'shippingPrice': shippingPrice,
            'totalPrice': totalPrice,
            'shippingAddress': shippingAddress,
        }))
    }
    useEffect(()=>{
        if(success) {navigate(`/orders/${order._id}`) }
        dispatch({
            type: CREATE_ORDER_CLEAR,
        })
    }, [success])

    return (
        <>
        
        <OrderSteps step1 step2 step3 step4></OrderSteps>

        {error&&<AlertMessage variant='danger'>{error}</AlertMessage>}
        {loading&&<Loader />}

        <Row>
            <Col md={8}>

                <Row className='mb-4'>
                    <Col md={12}>
                        <h2 className='mb-4'>Shipping Address</h2>
                        {shippingAddress&&(
                            <ListGroup>
                                
                                <ListGroup.Item>
                                    {fullAddress}
                                </ListGroup.Item>
                            </ListGroup>
                        )}
                    </Col>
                </Row>

                <Row className='mb-4'>
                    <Col md={12}>
                        <h2>Payment Method</h2>
                        {paymentMethod&&(
                            <ListGroup>
                                
                                <ListGroup.Item>
                                    {paymentMethod}
                                </ListGroup.Item>
                            </ListGroup>
                        )}
                    </Col>
                </Row>


                <Row>
                    <Col md={12}>
                        <h2>Cart Items</h2>
                        { items.length 
                        ? (
                            <ListGroup>
                                {items.map(item=>(
                                    <ListGroup.Item as={'div'} key={item._id}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} fluid rounded />
                                            </Col>
                                            <Col md={5}>
                                                <Link to={`/products/${item._id}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={5}>
                                                ${item.price} x {item.qty} = ${(item.price*item.qty).toFixed(2)}
                                            </Col>
                                            
                                            
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )
                        : (
                            <AlertMessage variant='info'>
                                Your cart is empty. Go to the <Link to="/">main page</Link>
                            </AlertMessage>
                        ) 
                        }
                    </Col>
                </Row>

            </Col>

            <Col md={4}>
                <h2>Cart summary</h2>
                <Card>
                    <CardBody>
                        <div><strong>Total Items:</strong> ${cartItemsPrice}</div>
                        <div><strong>Shipping price:</strong> ${ shippingPrice } </div>
                        <div><strong>Tax:</strong> ${ taxPrice } </div>
                        <div className='mb-4'><strong>Total price:</strong> ${ totalPrice } </div>
                        <div>
                            <Button variant='primary' type='button' onClick={handlerPlaceOrder}>Place Order</Button>
                        </div>
                    </CardBody>
                </Card>

            </Col>
        </Row>
        </>
    )
}