import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

// import { useDispatch, useSelector } from 'react-redux'
// import { signalingSV } from '../../actions/request'

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

export const MeetingScreen = () => {

    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);

    const {uid} = useSelector(state => state.auth);

    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();

    const request = {ejecutivo: {id: "123"}, descripcion:"poggers", id:"1233"} //useLocation().state;

	// const {uid, isClient} = useSelector(state => state.auth) || [];

	// const dispatch = useDispatch();

	useEffect(() => {
    	socket.current = io.connect("ws://localhost:4000");
    	navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(stream => {
    	setStream(stream);
      	if (userVideo.current) {
        	userVideo.current.srcObject = stream;
      }
    })
    socket.current.emit("signIn", { type: "client", id: uid});
    socket.current.on("yourID", (id) => {
    	console.log("i got answer back from sv", id);
      setYourID(id);
    })
    socket.current.on("allUsers", (users) => {
      console.log("got users", users);
      setUsers(users);
    })

    socket.current.on("askPeer", (to) => {
      offerCall(to.peer);
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
      stream: stream,
    });

    peer.on("signal", data => {
    	console.log(data, "signal");
      socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID, bo: "no" })
    })

    peer.on("stream", stream => {
    });

    socket.current.on("callAccepted", signal => {
      console.log("got this nice");
      setCallAccepted(true);
      peer.signal(signal);
    })


  }

function offerCall(id){
	setReceivingCall(true);
    setCaller(id);
}

function acceptCall() {
	setReceivingCall(false);
    setCallAccepted(true);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", data => {
      console.log(data, "signal");
      socket.current.emit("callUser", { userToCall: caller, signalData: data, from: yourID, bo:"hi" })
    })

    peer.on("stream", stream => {
    });

    socket.current.on("callAccepted", signal => {
      console.log("got this nice");
      setCallAccepted(true);
      peer.signal(signal);
    })
  }

  function hungUp() {
	socket.current.emit("hungUp", {to: caller});
	setCallAccepted(false);
	setCaller("");
	
}

	let UserVideo;
  	if (stream) {
    	UserVideo = (
      		<Video playsInline muted ref={userVideo} autoPlay style={{
				width:'100%',
				height:'75vh'
			}}/>
    	);
  	}


  	let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h4>El ejecutivo esta pidiendo comenzar la llamada</h4>
        <button onClick={acceptCall}>Aceptar</button>
      </div>
    )
  }

  let callbutton;   
  if (!callAccepted && !receivingCall) {
    callbutton = (
      <div>
        {Object.keys(users).map(key => {
          if (users[key].type === "executive") { //CAMBIAR
            return (
            <button onClick={() => callPeer(key)}>Llamar</button>
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
        <p>Hablando con ejecutivo de identificador id {request.ejecutivo.id}, sobre la solicitud de id {request.id} con descripcion: {request.descripcion}</p>
      </div>
    )
  }
	  
	  return (
	  	<>
	  	<div className="m-4 ">
    <h1>Reunión {callAccepted}</h1>
	  		<Container>
      <Row>
        {UserVideo}
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

