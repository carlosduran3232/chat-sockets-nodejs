 var express = require('express'); // aqui cargamos el modulo de express
 var app = express();// llamamos a express
 var server = require('http').Server(app); // esta variable server debemos pasarsela a socketio para que entineda que va a estar excuchando
 var io = require('socket.io')(server);// aqui le pasamos la variable server


//haremos una vista estatica

app.use(express.static('client')); // client me indica que va a cargar los html de ahi.




// asi lo probamos http://localhost:6677/hola
 app.get('/hola', function(req,res){
 	res.status(200).send('desde una ruta');
 });

// enviar un mensaje por defecto desde el socket hacia nuesro cliente
 var messages= [{
 	id:1,
 	text:'Bienvenido al chat privado',
 	nickname: 'bot'
 }];

 // aqui abrimos una conexion al socket, el metodo connection se va a encargar de las coneciones de los clientes y detectara cada vez que un cliente se conecte

	io.on('connection', function(socket){ // recibimos un parametro socket que va a llevar toda la informacion del socket mas metodos, // aqui recogeremos al ip de la persona que se conecta
		console.log("el cliente con Ip:"+socket.handshake.address+ "se ha conectado...") 
	
	// aqui emito el mensaje al cliente

	socket.emit('messages', messages);

	socket.on('add-message', function(data){
			messages.push(data);

			io.sockets.emit('messages',messages);
	});

	});


 
 // aqui creamos un servidor con express, como primer parametro le pasamos el puerto 6677 y una funcion de callback
 	server.listen(6677, function(){
 	console.log('servidor esta funcionando en http://localhost:6677');
 });
