import React from 'react';
import logo from './logo_u-assist.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import '../../styles.css'



export const Navebar = () => {

   
    const {nombre} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch( startLogout() );
    }

    return (
        <>
            <Navbar bg="dark" className="justify-content-center" variant="dark">
                <Navbar.Text> ¡Hola, {nombre}! </Navbar.Text>  
            </Navbar>
            <Navbar bg="danger" variant="dark" style={{}}>
                <img
                    src={logo}
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
                <Navbar.Brand href="/client-dashboard"> U-Assist </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/client-dashboard">Inicio</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Button variant="light" onClick = {handleLogOut} >  <i className="fas fa-sign-out-alt"></i> Cerrar Sesión</Button>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

