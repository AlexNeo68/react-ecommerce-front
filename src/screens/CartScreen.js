import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import queryString from "query-string"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Form, Col, ListGroup, Row, Image, Button, Card } from 'react-bootstrap'
import AlertMessage from '../components/AlertMessage'

export default function CartScreen() {
    const {id} = useParams()
    const {qty} = queryString.parse(window.location.search)
    const dispatch = useDispatch()
    const {items} = useSelector(state=>state.cart)
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(addToCart(id, Number(qty)))
    },
    [dispatch, id, qty])


    function handlerDeleteFromCart(id){
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/shipping')
    }


  return (
    
    <Row>
        <Col md={8}>
            <h1 className='md-2'>Shopping Cart</h1>
        { items.length 
            ? (
                <ListGroup>
                    {items.map(item=>(
                        <ListGroup.Item as={'div'} key={item._id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={3}>
                                    <Form.Select aria-label="Default select example" value={item.qty} onChange={e=>dispatch(addToCart(item._id, e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map(i=>(
                                                <option value={i+1}>{i+1}</option>
                                            ))}
                                    </Form.Select>
                                </Col>
                                <Col md={1}>
                                    <Button variant='button' onClick={e=>handlerDeleteFromCart(item._id)}>  <i className='fas fa-trash'></i></Button>
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

        <Col md={4}>
            <Card>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Your cart contain ({items.reduce((acc, item)=>acc+Number(item.qty), 0)}) items</h2>
                        <strong>Total:</strong> ${items.reduce((acc, item)=>acc+Number(item.qty)*Number(item.price), 0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' onClick={checkoutHandler} disabled={!items.length} className='btn-block'>Proceed to checkout</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    
    </Row>
    
  )
}
