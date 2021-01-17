
var connectSocket = null;

$(document).ready(function(){
	connectWS_connect();
});

function connectWS_connect(){
	var connect_ws = new WebSocket("ws://localhost:8090/websocket/connect/websocket");
	connectSocket = connect_ws;
	
	connect_ws.onopen = (event) => {};
	connect_ws.onmessage = (event) => {
		let data = event.data;
		chattingConnect(data);
	};
	connect_ws.onclose = (event) => {};
	connect_ws.onerror = (event) => {
		console.log("connectSocket Error");
	};
}

function chattingConnect(roomno){
	$('#chat-list-hidden').append('socket');
	$('#chat-list-hidden').empty();
}

