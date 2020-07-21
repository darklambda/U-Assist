import React, { useState, useRef, useEffect } from 'react'

export const MeetingScreen = () => {

	const [stream, setstream] = useState();
	const userVideo = useRef();

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
	  	</div>
	  	</>
	  )
}

