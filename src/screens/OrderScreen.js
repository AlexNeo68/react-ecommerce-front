import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, ListGroup, Row, Image, Button, Card, CardBody } from 'react-bootstrap'
import AlertMessage from '../components/AlertMessage'
import { getOrder, payOrder } from '../actions/orderActions'
import Loader from '../components/Loader'

export default function OrderScreen() {
    
    const dispatch = useDispatch()
    const [fullAddress, setFulladdress] = useState('')

    const { order, loading, error } = useSelector(state=>state.getOrder)
    const { userInfo } = useSelector(state=>state.userLogin)
    const { loading: loadingPay, success: successPay, error: errorPay } = useSelector(state=>state.orderPay)

    const {id} = useParams()

    const navigate = useNavigate()

    const handlerPay = () => {
        dispatch(payOrder(id, true))
        dispatch(getOrder(id))
    }

    useEffect(()=>{
        
            if(!userInfo){
                navigate('/login')
            }
            if(!order || Number(id)!==order._id) {
                dispatch(getOrder(id))
            }
            if(order && order.shippingAddress){
                const addressAr = []
                if (order.shippingAddress.address) {
                    addressAr.push(order.shippingAddress.address)
                }
                if (order.shippingAddress.city) {
                    addressAr.push(order.shippingAddress.city)
                }
                if (order.shippingAddress.postalCode) {
                    addressAr.push(order.shippingAddress.postalCode)
                }
                if (order.shippingAddress.country) {
                    addressAr.push(order.shippingAddress.country)
                }
                setFulladdress(addressAr.join(', '))
            }
            
        },
        [dispatch, userInfo, order, id]
    )

    
    return loading ? (<Loader />) : error ? (<AlertMessage>{error}</AlertMessage>) : (
        <>
            <h1>Order details #{order._id}</h1>
            <Row>
                <Col md={8}>

                    <Row className='mb-4'>
                        <Col md={12}>
                            <h2 className='mb-4'>Shipping Address</h2>
                            {order.shippingAddress&&(
                                <ListGroup>
                                    
                                    <ListGroup.Item>
                                        {fullAddress}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        User: {order.user.first_name} {order.user.email}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                    {
                                            order.isDelivered ? (
                                                <AlertMessage variant='success'>Order delivered at {order.deliveredAt}</AlertMessage>
                                            ) : (
                                                <AlertMessage variant='warning'>Order not delivered</AlertMessage>
                                            )
                                        }
                                    </ListGroup.Item>
                                </ListGroup>
                            )}
                        </Col>
                    </Row>

                    <Row className='mb-4'>
                        <Col md={12}>
                            <h2>Payment Method</h2>
                            {order.paymentMethod&&(
                                <ListGroup>
                                    
                                    <ListGroup.Item>
                                        <p>
                                            {order.paymentMethod}
                                        </p>

                                        {
                                            order.isPaid ? (
                                                <AlertMessage variant='success'>Order paid at {order.paidAt}</AlertMessage>
                                            ) : (
                                                <AlertMessage variant='warning'>Order not paid</AlertMessage>
                                            )
                                        }
                                        
                                    </ListGroup.Item>
                                </ListGroup>
                            )}
                        </Col>
                    </Row>


                    <Row>
                        <Col md={12}>
                            <h2>Cart Items</h2>
                            { order.orderItems.length 
                            ? (
                                <ListGroup>
                                    {order.orderItems.map(item=>(
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
                            <div><strong>Total Items:</strong> ${order.orderItems.reduce(
                                (acc, item) => {
                                    return Number(acc)+Number(item.price)
                                }, 0)}</div>
                            <div><strong>Shipping price:</strong> ${ order.shippingPrice } </div>
                            <div><strong>Tax:</strong> ${ order.taxPrice } </div>
                            <div className='mb-4'><strong>Total price:</strong> ${ order.totalPrice } </div>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    <Button onClick={handlerPay}>Pay Order</Button>
                                </ListGroup.Item>
                            )}
                            
                        </CardBody>
                    </Card>

                </Col>
            </Row>
        </>
    ) 
        
            
        
    
}