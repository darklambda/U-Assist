import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

const Video = styled.video`
  border: 1px solid black;
  width: 50%;
  height: 50%;
`;

export const MeetingExScreen = () => {

    /*Aqui está la request completa, con todos los datos del ejecutivo y del cliente 
    request = {
      categoria,
      client: { apellido, email, nombre, rut, telefono, id},
      codigo,
      descripcionProblema,
      estado,
      executive: {apellido, nombre, sucursal, id},
      fechaIngreso,
      id
    }
    */
    const request = useLocation().state;

  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

    const {uid} = useSelector(state => state.auth) || [];

  const partnerVideo = useRef();
  const socket = useRef();

    useEffect(() => {
    	socket.current = io.connect("ws://localhost:4000");
    	//navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(stream => {
    	//setStream(stream);
    //})
    socket.current.emit("signIn", { type: "executive", id: uid});
    socket.current.on("yourID", (id) => {
      setYourID(id);
    })
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    })

    socket.current.on("hey", (data) => {
      if (data.bo === "hi") {
        setReceivingCall(true);
        setCaller(data.from);
        setCallerSignal(data.signal);    
      } else {
        setReceivingCall(true);
        setCaller(data.from);
        setCallerSignal(data.signal);
      }
    })
  	}, [uid]); //TODO: agregué el uid como dependencia del useEffect por el warning de la consola. Si no funca la llamada, se revierte

  function callPeer(to) {
    socket.current.emit("askPeer", {to: to, signal: yourID});
  }

  function acceptCall() {
    setReceivingCall(false);
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false
    });
    peer.on("signal", data => {
      socket.current.emit("acceptCall", { signal: data, to: caller })
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  function hungUp() {
  	socket.current.emit("hungUp", {to: caller});
	setCallAccepted(false);
	setCaller("");
}


  	let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <Video playsInline ref={partnerVideo} autoPlay tyle={{
				width:'50%',
				height:'75vh'
			}}/>
    );
  }

  	let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    )
  }

  const variables_no_usadas = {stream, setStream, hungUp}
  console.log(variables_no_usadas && '')

	  
	  return (
	  	<>
      <div>
			<h1 className="m-2">Reunión {callAccepted} </h1>
			<div className="row m-2">
			<div className="bg-danger col-md-8 border" style={{height: "75vh"}}>
			{PartnerVideo}
			</div>
			<div className="col-sm-4" style={{height: "75vh"}}>
				<h3> Información de la solicitud </h3>
				<p> <strong> ID: </strong> {request.id} </p>
				<p> <strong> Nivel de urgencia: </strong> {request.categoria} </p>
				<p> <strong> Estado: </strong> {request.estado} </p>
				<p> <strong> Fecha de ingreso: </strong> {Date(request.fechaIngreso)} </p>
				<p> <strong> Descripción del problema: </strong> {request.descripcionProblema} </p> 
				<hr/>
				<h3> Información del cliente </h3>
				<p> <strong> Nombre: </strong> {request.client.nombre} {request.client.apellido} </p>
				<p> <strong> RUT: </strong> {request.client.rut} </p>
				<p> <strong> Correo: </strong> {request.client.email} </p>
				<p> <strong> Teléfono: </strong> {request.client.telefono} </p> 
				<hr/>
        {Object.keys(users).map(key => {
          if (users[key].type === "client") {
            return (
            <button onClick={() => callPeer(key)}>Llamar cliente 
            {(users[key].id === request.client.id) && request.client.nombre + ' ' + request.client.apellido}
            </button>
          );
          }
          return null
        })}
        <hr />
        {incomingCall}
			</div>
			</div>
			</div>

	  	{/* <div className="m-4 ">
	  		<h1>Reunión</h1>
	  		<Container>
      <Row>
        {PartnerVideo}
      </Row>
      <Row>
        
      </Row>
      <Row>
        {incomingCall}
      </Row>
    </Container>
	  	</div> */}
	  	</>
	  )
}

