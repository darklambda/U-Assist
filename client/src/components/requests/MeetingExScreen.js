import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import io from "socket.io-client";
import SimplePeer from "simple-peer";
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
  /*
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
      console.log(users);
      setUsers(users);
    })

    socket.current.on("hey", (data) => {
        setReceivingCall(true);
        setCaller(data.from);
        setCallerSignal(data.signal);   
    })
  	}, [uid]); //TODO: agregué el uid como dependencia del useEffect por el warning de la consola. Si no funca la llamada, se revierte

    function callPeer(id) {
    const peer = new SimplePeer({
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
    },
      stream: stream,
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
    const peer = new SimplePeer({
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

let callbutton;   
  if (!callAccepted && !receivingCall) {
    callbutton = (
      <div>
        {Object.keys(users).map(key => {
          console.log(users[key].type, typeof request.client._id, typeof request.client._id)
          if (users[key].id === request.client._id) {
            return (
            <button onClick={() => callPeer(key)}>El cliente esta online</button>
          );
          }
        })}     
    </div>
    )
  }

   let infoAndHung;
  if (callAccepted) {
    infoAndHung = (
      <div>
        <h3>Informacion sobre la llamada</h3>
        <p>Hablando con {request.client.nombre} {request.client.apellido} de rut {request.client.rut} sobre la solicud ticket {request._id} con la siguiente descripcion: 
        {request.descripcionProblema}</p>
      </div>
    )
  }

      let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>El cliente de la solicitud quiere comenzar la llamada</h1>
        <button  onClick={acceptCall}>Aceptar llamada</button>
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
      {callbutton}
      </Row>
      <Row>
        {infoAndHung}
      </Row>
      <Row>
        {incomingCall}
      </Row>
    </Container>
	  	</div>
	  	</>
	  )
}

