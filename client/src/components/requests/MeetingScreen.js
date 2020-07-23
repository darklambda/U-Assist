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

export const MeetingScreen = () => {

		const request = useLocation().state;

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
				<h4>{caller} is calling you</h4>
				<button onClick={acceptCall}>Accept</button>
			</div>
		)
	}
		
		return (
			<>
			<div>
			<h1 className="m-2">Reunión {callAccepted} </h1>
			<div className="row m-2">
			<div className="bg-danger col-md-8 border" style={{height: "75vh"}}>
			{UserVideo}
			</div>
			<div className="col-sm-4" style={{height: "75vh"}}>
				<h3> Información de la solicitud </h3>
				<p> <strong> ID: </strong> {request.id} </p>
				<p> <strong> Nivel de urgencia: </strong> {request.categoria} </p>
				<p> <strong> Estado: </strong> {request.estado} </p>
				<p> <strong> Fecha de ingreso: </strong> {Date(request.fechaIngreso)} </p>
				<p> <strong> Descripción del problema: </strong> {request.descripcionProblema} </p> 
				<hr/>
				<h3> Información del ejecutivo </h3>
				<p> <strong> Nombre: </strong> {request.executive.nombre} {request.executive.apellido} </p>
				<p> <strong> Sucursal: </strong> {request.executive.sucursal} </p>
				<p> <strong> Correo: </strong> {request.executive.email} </p>
				<p> <strong> Teléfono: </strong> {request.executive.telefono} </p> 
				<hr/>
			{Object.keys(users).map(key => {
				if (users[key].type === "executive") {
					return (
					<button className="btn btn-primary col-10" key={users[key].id} onClick={() => callPeer(key)}>Llamar a ejecutivo {users[key].id}</button>
				);
				}
				return null
			})}
			</div>
			</div>
			</div>
{/* <div className="m-4 ">
			
				<Container>
					<Row>
						
					</Row>
					<Row>
						{Object.keys(users).map(key => {
							if (users[key].type === "executive") {
								return (
								<button onClick={() => callPeer(key)}>Llamar ejecutivo {users[key].id}</button>
							);
							}
							return null
						})}
					</Row>
					<Row>
						{incomingCall}
					</Row>
				</Container>
			</div> */}
			</>
		)
}

