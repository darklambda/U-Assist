import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

const Video = styled.video`
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
        setReceivingCall(true);
        setCaller(data.from);
        setCallerSignal(data.signal);   
    })
  	}, [uid]); //TODO: agregué el uid como dependencia del useEffect por el warning de la consola. Si no funca la llamada, se revierte

		function callPeer(id) {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			config: {

				iceServers: [
						{
								urls: "stun:numb.viagenie.ca",
								username: "sultan1640@gmail.com",
								credential: "98376683"
						},
						{
								urls: "turn:numb.viagenie.ca",
								username: "sultan1640@gmail.com",
								credential: "98376683"
						}
				]
		},
		offerOptions: { 
      offerToReceiveAudio: true, 
      offerToReceiveVideo: true 
    }
	});

		peer.on("signal", data => {
			socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID, bo: "no" })
		})

		peer.on("stream", stream => {
			partnerVideo.current.srcObject = stream;
		});

		socket.current.on("callAccepted", signal => {
			setCallAccepted(true);
			peer.signal(signal);
		})
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


  	let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <Video playsInline ref={partnerVideo} autoPlay style={{
				width:'100%',
				height:'75vh'
			}}/>
    );
  }

  	let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <p>El cliente te está llamando </p>
        <button className="btn btn-success" onClick={acceptCall}>Aceptar llamada</button>
      </div>
    )
  }

  const handleClickVolver = () => {
    window.location.replace('/executive-dashboard')
  }

  const variables_no_usadas = {stream, setStream, users, callPeer, callAccepted}
  console.log(variables_no_usadas && '')

	  
	  return (
	  	<>
      <div>
        <div className="d-flex justify-content-between m-4 align-items-center">
        <h1 className="m-2">Reunión </h1>
        <button className="btn btn-info" onClick={handleClickVolver}>
          <i className="fas fa-arrow-left"></i> Volver
        </button>
        </div>
			
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
          if (users[key].type === "client" && !callAccepted) {
            return (
            <button key={users[key].id} className="btn btn-primary col-12" onClick={() => callPeer(key)}>Llamar a cliente {request.client.nombre} {request.client.apellido}
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

