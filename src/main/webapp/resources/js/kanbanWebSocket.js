/*
파일명: kanbanWebSocket.js
설명: 칸반 보드 내 카드, 리스트 이동 실시간 구현 websocket
작성일: 2021-01-08 ~
작성자: 문지연
*/

$(document).ready(function(){
	
	connectWS();
});

	function connectWS(){
		let socket = new WebSocket("ws://localhost:8090/websocket/kanban/websocket");
		socket = ws;
		ws.open = function(msg){
			console.log(msg);
		}
		
		ws.onclose = function(){
			console.log("Sever Close");
		}
		
		ws.onerror = function(){
			console.log("Server Error");
		}
	}
	
