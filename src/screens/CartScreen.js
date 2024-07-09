import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import queryString from "query-string"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../actions/cartActions'

export default function CartScreen() {
    const {id} = useParams()
    const {qty} = queryString.parse(window.location.search)
    const dispatch = useDispatch()
    const {items} = useSelector(state=>state.cart)

    useEffect(()=>{
        dispatch(addToCart(id, Number(qty)))
    },
    [dispatch, id, qty])

    console.log(items)
  return (
    <div>CartScreen</div>
  )
}
