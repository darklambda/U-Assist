import React from 'react';
import logo from './logo_u-assist.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

// import NavDropdown from 'react-bootstrap/NavDropdown' si no se usará, borrar esta importacion


export const Navebar = () => {

   
    const {nombre} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch( startLogout() );
    }

    return (
        <>
  <Navbar bg="dark" className="justify-content-center" variant="dark">
  
  <Navbar.Text >
            Hola {nombre.toUpperCase()} !
            </Navbar.Text>
    
  </Navbar>

  <Navbar bg="danger" variant="dark">
  <img
        src={logo}
        width="50"
        height="50"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    <Navbar.Brand href="/client-dashboard">U-ASSIST</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/client-dashboard">Inicio</Nav.Link>
      {/*<Nav.Link href="#features">Mis Solicitudes</Nav.Link>*/}
    </Nav>
    <Navbar.Collapse className="justify-content-end">

            <Button variant="light" onClick = {handleLogOut} >  <i className="fas fa-sign-out-alt"></i> Cerrar Sesión</Button>
     
            </Navbar.Collapse>
  </Navbar>
  


{/*
  
        <div className="navbar navbar-dark bg-dark mb-4">
            
            <span className="navbar-brand"> U-Assist </span>
            <div className="justify-content-end">
                <span className="table-dark mr-4">
                <i className="fas fa-user mr-auto"></i> {nombre} {apellido}
                </span>
                <button 
                    className="btn btn-outline-danger"
                    onClick={ handleLogOut }
                >
                    <i className="fas fa-sign-out-alt"></i>
                    <span> Cerrar sesión </span>
                </button>
            </div>

        </div> 
*/}
            
        </>
    )
}

