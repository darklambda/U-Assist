import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
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
  const [coming, setComing] = useState(false);

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
      console.log(coming);
      if (coming) {
        setCaller(data.from);
        setCallerSignal(data.signal)
;        acceptCall()
      } else {
        setReceivingCall(true);
        setCaller(data.from);
        setCallerSignal(data.signal);
      }
    })
  	}, [uid]); //TODO: agregué el uid como dependencia del useEffect por el warning de la consola. Si no funca la llamada, se revierte

  function callPeer(to) {
    setComing(true);
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

	  
	  return (
	  	<>
	  	<div className="m-4 ">
	  		<h1>Reunión</h1>
	  		<Container>
      <Row>
        {PartnerVideo}
      </Row>
      <Row>
        {Object.keys(users).map(key => {
          if (users[key].type === "client") {
            return (
            <button onClick={() => callPeer(key)}>Llamar cliente {users[key].id}</button>
          );
          }
          return null
        })}
      </Row>
      <Row>
        {incomingCall}
      </Row>
    </Container>
	  	</div>
	  	</>
	  )
}

