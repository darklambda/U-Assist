# U-Assist - *mivalenz-backend*

## To.do.list()

- [x] Implementar backend
- [x] Implementar frontend feo pero funcional
- [x] Conectar backend con frontend
- [x] Protección de rutas
- [x] Login desde front
- [x] Registro desde front
- [x] Logout desde front
- [x] Merge con lo que hizo @endline999
- [x] Mostrar las soliciutdes del cliente en front
- [x] Mostrar solicitudes en dashboard de ejecutivo
- [x] Asociar solicitudes al ejecutivo

## WebRTC
  *Front End
  
- [ ] En la vista del cliente, crear un canvas (tipo video html) con un stream del la pestaña que se escoga
- [ ] En la vista del ejecutivo, crear un objetivo video en html para poder recibir el stream.
- [ ] En controladores de ambas vistas crear un objeto RTCPeerConnection sobre el respectivo usuario.
    Usar como configuración el siguiente stunSV = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}] (gratis de google)
- [ ] Utilizando el signaling server del back end, enviar el objeto RTCPC al otro peer y agregarlo como IceServer
- [ ] Agregar al ejecutivo un metodo ontrack sobre que pasa al recibir el stream del cliente.
- [ ] Enviar desde el cliente un offer usando el RTCPC, con los datos correspondientes del ejecutivo.
- [ ] (Opcional) Enviar un answer desde el ejecutivo para afirmar que se esta recibiendo el stream.
- [ ] (Opcional) Generar un offer (y la respectiva answer) desde el ejecutivo al cliente para enviar audio.
- [ ] (Opcional) Implementar interfaz de "videollamada".

Nota: Recordar que por como funcionan websocket, hay que enviar siempre la ip de los clientes/ejecutivos en los mensajes.
  
  *Back end
- [ ] Instalar Websocket y generar las funcionalidades para cada evento en el archivo principal de express.

Nota: Se ve como poco, pero hay que pensar bien como se trabajara el traspaso de mensajes en caso de problemas en conexión o desconexión.
