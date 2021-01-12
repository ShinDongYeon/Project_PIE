/*
파일명: projectMainChat.js
설명: 채팅생성창에서 회원 ON/OFF 상태 확인
작성일: 2021-01-12
작성자: 도재구
*/
var logonSocket = null;
$(document).ready(function(){
	connectWS_logon();
});


function connectWS_logon(){
	var logon_ws = new WebSocket("ws://localhost:8090/websocket/logon/websocket");
	logonSocket = logon_ws;
	
	logon_ws.onopen = (event) => {
		console.log("logon_WS open");
		
	};
	logon_ws.onmessage = (event) => {
		console.log("logon_WS onmessage");
		let data = event.data;
		console.log("data");
		console.log(JSON.parse(data));
		logonUser(JSON.parse(data));
		
	};
	logon_ws.onclose = (event) => {
		console.log("Server Close");
	};
	logon_ws.onerror = (event) => {
		console.log("Server Error");
	};
}
