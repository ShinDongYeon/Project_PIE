
var connectSocket = null;
$(document).ready(function(){
	connectWS_connect();
});

function connectWS_connect(){
	var connect_ws = new WebSocket("ws://localhost:8090/websocket/connect/websocket");
	connectSocket = connect_ws;
	
	connect_ws.onopen = (event) => {
		console.log("connectSocket open");
	};
	connect_ws.onmessage = (event) => {
		console.log("connectSocket onmessage");
		let data = event.data;
		chattingAlarm(data);
	};
	connect_ws.onclose = (event) => {
		console.log("connectSocket Close");
	};
	connect_ws.onerror = (event) => {
		console.log("connectSocket Error");
	};
}