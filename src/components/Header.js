import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { logout } from '../actions/userActions';

function Header() {
  
  const {userInfo} = useSelector(state=>state.userLogin)
  const dispatch = useDispatch()

  const handlerLogout = () => {
    dispatch(logout())
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to={'/'}>
          <Navbar.Brand href="/">ProSHOP</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
              <Nav.Link>
                  <Link to="/cart">   <i className='fas fa-shopping-cart'></i>
                    Cart
                  </Link>
              </Nav.Link>
              
            
            {userInfo ? (
              <>
               <Nav.Link>
                <Link to="/profile/">
                  {userInfo.username}
                </Link>
              </Nav.Link>
              <Button variant='link' onClick={handlerLogout}><i class="fa-solid fa-right-from-bracket"></i></Button>
              </>

              ) : (
              <Nav.Link><Link to="/login">
              <i className='fas fa-user'></i> Login
              </Link></Nav.Link>
            )}
            


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



export default Header