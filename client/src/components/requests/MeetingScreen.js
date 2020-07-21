import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signalingSV } from '../../actions/request'

const configuration = {
  iceServers: [{ url: "stun:stun.1.google.com:19302" }]
};

export const MeetingScreen = () => {


	const [stream, setstream] = useState();
	const {uid, isClient} = useSelector(state => state.auth) || [];
	const userVideo = useRef();
	const dispatch = useDispatch();

	const handleClick2 = () => {
        dispatch(signalingSV(uid, isClient, userVideo));
    }

	useEffect(() => {
		navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(stream => {
			setstream(stream);
			if (userVideo.current) {
				userVideo.current.srcObject = stream;
			}
		})
	}, [])

	let UserVideo;
  	if (stream) {
    	UserVideo = (
      		<video playsInline muted ref={userVideo} autoPlay style={{
				width:'100%',
				height:'75vh'
			}}/>
    	);
  	}
	  
	  return (
	  	<>
	  	<div className="m-4 ">
	  		<h1>Reunión</h1>
	  		<div className="m-4 d-flex align-items-center">
				  {UserVideo }
	  		</div>

	  		<div className="d-flex justify-content-between align-items-center">
                <h3> WebSocket </h3>
                <button className="btn btn-sm btn-outline-primary h-50" onClick={handleLogin}> 
                    <i className="fas fa-plus width-100"></i> CrearSocket 
                </button>
                <button className="btn btn-sm btn-outline-primary h-50" onClick={toggleConnection()}> 
                    <i className="fas fa-plus width-100"></i> Iniciar Conexión  
                </button>
            </div>	
	  	</div>
	  	</>
	  )
}

