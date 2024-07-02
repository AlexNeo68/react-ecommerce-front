import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Button, Image, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetail } from '../actions/productActions'
import Loader from '../components/Loader'
import AlertMessage from '../components/AlertMessage'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'



function ProductScreen() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const {loading, product, error} = useSelector(state => state.productDetail)
  const [qty, setQty] = useState(1)
  const navigate = useNavigate()

  function handleAdd2Cart(){
    
    navigate(`/cart/${id}?qty=${qty}`)
  }

  
  useEffect(() => {
    dispatch(getProductDetail(id))
    
  }, [dispatch, id])

  return (
    <>
    {loading ? <Loader /> 
        : error ? <AlertMessage variant='danger'>{error}</AlertMessage> 
        : (<Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>


            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>


            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        {
                            product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty:</Col>
                                        <Col>
                                        <Form.Select aria-label="Default select example" onChange={e=>setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map(i=>(
                                                <option value={i+1}>{i+1}</option>
                                            ))}
                                        </Form.Select>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        }
                        



                        


                        <ListGroup.Item>
                            <Button
                                className='btn-block'
                                disabled={product.countInStock === 0}
                                type='button'
                                onClick={handleAdd2Cart}>
                                Add to Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>)
    }
    </>
  )
}

export default ProductScreen