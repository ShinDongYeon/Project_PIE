<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<title>PIE</title>

<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">

<!-- Font-Awesome CDN -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">

<!-- StyleSheets -->
<link rel="stylesheet" type="text/css" href="/resources/css/commonStyle.css">
<link rel="stylesheet" type="text/css" href="/resources/css/mainTopStyle.css">

<!-- sweetAlert1,2 CDN -->
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

<!-- Jquery CDN -->
<script src="https://code.jquery.com/jquery-3.5.1.min.js"
	integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
	crossorigin="anonymous"></script>
<!-- ------------------------------------------------------------------ -->

<script>

										
	var socket = null; //전역변수 선언
	$(document).ready(function(){
		connectWS();
		});
	function connectWS(){
		var ws = new WebSocket("ws://localhost:8090/websocket/echo/websocket");
		socket = ws;
		ws.open = function(message){
			console.log(message)
			}
		ws.onmessage = function(event){
			let html = '<div class="alarm-item-wrapper">\
				<div class="alarm-top-wrapper">\
				<div class="alarm-user"><i class="fas fa-user"></i></div>\
				<div class="alarm-username">강성윤</div>\
				<div class="alarm-cancel"><i class="fas fa-times"></i></div>\
				</div>\
				<div class="alarm-middle-wrapper">\
				<div class="alarm-reply">\
				<i class="far fa-comment-dots"></i>댓글\
				</div>\
				<div class="alarm-flag">\
				<i class="fas fa-star"></i>즐겨찾기\
				</div>\
				</div>\
				<div class="alarm-bottom-wrapper" id="alram">\
					'+event.data+'\
				</div>\
				</div>';
			var alram = $('#alram');
			//alram.empty();
			alram.append(html);
			console.log(html)
			//alram.append('<h3>'+event.data+'<h3>')
			//alram.append(event.data);
			alram.css('display', 'inline');
			};
		ws.onclose = function(event){
			console.log("Server Close")
			};
		ws.onerror = function(event){
			console.log("Server Error");
			}
		}
</script>	