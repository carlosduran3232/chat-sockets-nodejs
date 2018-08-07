// aqui haremos que el cliente se pueda conectar a nuestro socket y 
//nos llega a la consola indicando que alguien se ha conectado a nuestro servidor


var socket = io.connect('http://10.40.197.148:6677',{'forceNew':true}); // frocenew hace que la conexion se fuerce


socket.on('messages', function(data){
	console.log(data);
	render(data);
});


// me creare una funcion render para poder pintarlo en el html

function render(data){
	// me consigo el metodo map que me permite recorrer lo que tengo en data
	var html = data.map(function(message, index){
		return(`
			<div class="message">
			<strong>${message.nickname}</strong> dice:
			<p>${message.text}</p>
			</div>
			`);
	}).join(' '); // el join es para meter espacio entre elementos y elementos


	// para meter este html dentro de la etiqueta message que esta en indexhtml
	var div_msgs = document.getElementById('messages');
	div_msgs.innerHTML =html;
	div_msgs.scrollTop = div_msgs.scrollHeight;


	document.getElementById('messages').innerHTML = html;
}


function addMessage(e){
	var message = {
	nickname:document.getElementById('nickname').value,
	text: document.getElementById('text').value
	};

	document.getElementById('nickname').style.display = 'none';
	// aqui el socket va a recoger el evento 

	socket.emit('add-message', message);

	return false;
}

