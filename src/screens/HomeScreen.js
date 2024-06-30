import React, { useEffect } from 'react'


import Product from '../components/Product'

import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductList } from '../actions/productActions'
import Loader from '../components/Loader'
import AlertMessage from '../components/AlertMessage'

function HomeScreen() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductList())
  }, [dispatch])

  const {loading, products, error} = useSelector(state=>state.productList)

  return (
    <>
        <h3>Latest Products</h3>
        {loading ? <Loader /> : error ? <AlertMessage variant='danger' >{error}</AlertMessage> : 
          <Row >
              
            {products.map(product=><Col key={product.id} xs={12} md={6} lg={4} xl={3}><Product key={`p-${product.id}`} product={product}/></Col>)}
            
          </Row>
        }
        
    </>
  )
}

export default HomeScreen