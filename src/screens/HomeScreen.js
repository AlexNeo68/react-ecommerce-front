import React, { useEffect, useState } from 'react'

import Product from '../components/Product'

import { Col, Row } from 'react-bootstrap'
import axios from 'axios'

function HomeScreen() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getProducts(){
      const {data} = await axios.get('/api/products')
      setProducts(data)
    }
    getProducts()
  }, [])

  return (
    <>
        <h3>Latest Products</h3>
        <Row >
            
            {products.map(product=><Col xs={12} md={6} lg={4} xl={3}><Product product={product}/></Col>)}
            
        </Row>
    </>
  )
}

export default HomeScreen