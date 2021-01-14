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
		
	};
	logon_ws.onmessage = (event) => {
		let data = event.data;
		logonUser(JSON.parse(data));
		
	};
	logon_ws.onclose = (event) => {
		
	};
	logon_ws.onerror = (event) => {
		console.log("logon_WS Error");
	};
}
