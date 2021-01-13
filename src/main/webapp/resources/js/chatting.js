/**
 * chat.jsp 웹소켓
 */

$(document).ready(function() {
	//웹소켓 연결
	connect();
	
	var rootRef = firebase.database().ref();
	
	//Enter 키 입력
	$('.chat-msgWrite-btn').attr('class','chat-msgWrite-btn-not');
	$('#message').keypress( (event) => {
		//Enter 키 입력 시
		if (event.which == 13) {
			send();
			event.preventDefault();
		}
	});
	//전송 버튼 CSS 조절
	$('#message').keyup( (event) => {
		// textarea에 값이 입력되어 있지 않다면, 전송버튼 비활성화
		if($('#message').val().trim() == ''){
			$('.chat-msgWrite-btn').attr('class','chat-msgWrite-btn-not');
		//입력되어 있다면 전송버튼 활성화
		}else if($('#message').val() != ''){
			$('.chat-msgWrite-btn-not').attr('class','chat-msgWrite-btn');
		}
	});
	//처음 입장시 메시지 입력창 CSS 색 입히기
	$('#message').focus();
	if($('#message').is(':focus')){
		$('.chat-msgWrite-wrapper').css("border","2px solid #f2dd68");
	}
	//입력창 클릭시 메시지 입력상태 ON
	$('.chat-msgWrite-wrapper').click( () => {
		$('#message').focus();
		$('.chat-msgWrite-wrapper').css("border","2px solid #f2dd68");
	});
	//입력창 외에 다른 곳 클릭시 입력상태 OFF
	$('#message').focusout( () => {
		$('.chat-body-wrapper, .chat-top-wrapper').click( () => {
			$('.chat-msgWrite-wrapper').css("border","2px solid #999999");
		});
	});
	
	//전송 버튼을 눌렀을 때
	$('#sendBtn').click( (event) => {
		//버튼이 활성화 되어 있는 상태이면 메시지를 보낸다
		if($('#chat-msgWrite-btn').attr('class') == 'chat-msgWrite-btn'){
			send();
			$('#message').focus(); 
			$('.chat-msgWrite-btn').attr('class','chat-msgWrite-btn-not');
			event.preventDefault();
			
		//버튼이 활성화 되어 있지 않으면 입력상태 ON
		}else{
			$('#message').focus();
		}
	});

	
	/*
	$('#exitBtn').click(function() {
		disconnect();
		window.close();
	})
	*/
});

var websocket;


function connect(){
	websocket = new WebSocket(
		"ws://localhost:8090/websocket/chat/websocket?select="+$('#select').val()+"&roomname="+$('#roomname').val());
	websocket.onopen = onOpen;
	websocket.onmessage = onMessage;
	websocket.onclose = onClose;
	console.log($('#select').val());
	console.log($('#roomname').val());
}

function disconnect(){
	websocket.close();
}

function onOpen(evt){
	
	let today = new Date();
	let date = today.format('yyyy년 MM월 dd일');
	
	firebase.database().ref().child('chatting_room_seq/'+$('#select').val()+'/messages/0').set({
		chatting_room_seq : $('#select').val(),
		message_seq : 0
	});
	
	//DB에서 이전 데이터를 불러옴
	firebase.database().ref().child('chatting_room_seq/'+$('#select').val()+'/messages').once('value',function(data){
		console.log('1번:',data.val().length);
		let myemail = $('#session_email').val();
		let msgbox = '';
		if(data.val().length == 1){
			msgbox += 	"<div class='chat-body-date'>"+
							"<div class='chat-body-date-line'>"+
								"――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――"+
							"</div>"+
							"<div class='chat-body-date-letter'>"+
								date+
							"</div>"+
							"<div class='chat-body-date-line'>"+
								"――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――"+
							"</div>"+
						"</div>";
		}
		for(let i=1; i < data.val().length; i++){
			let str = data.val()[i].message_date;
			let strArr = str.split('-');
			let DB_date = new Date(strArr[0], strArr[1]-1, strArr[2]);
			let DB_date_format = DB_date.format('yyyy년 MM월 dd일');
			if(data.val()[i].message_date != data.val()[i-1].message_date){
				msgbox += 	"<div class='chat-body-date'>"+
								"<div class='chat-body-date-line'>"+
									"――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――"+
								"</div>"+
								"<div class='chat-body-date-letter'>"+
									DB_date_format+
								"</div>"+
								"<div class='chat-body-date-line'>"+
									"――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――"+
								"</div>"+
							"</div>";
			}
			if((today - DB_date)/1000/60/60/24 < 1){

				if (data.val()[i].email == myemail) {
					msgbox += 	"<div class='chat-receiver-wrapper'>"+
									"<div class='chat-receiver-pic'>"+
										"<i class='fas fa-user'></i>"+
									"</div>"+
									"<div>"+
										"<div class='chat-receiver-name'>"+
											data.val()[i].nickName+
										"</div>"+
										"<div class='chat-receiver-message-wrapper'>"+
											"<div id='chatMessageArea' class='chat-receiver-message'>"+
												data.val()[i].message_content+
											"</div>"+
											"<div class='chat-receiver-time'>"+
												data.val()[i].message_time+
											"</div>"+
										"</div>"+
									"</div>"+
								"</div>";
								
				}else {
					msgbox += 	"<div class='chat-sender-wrapper'>"+
									"<div class='chat-sender-pic'>"+
										"<i class='fas fa-user'></i>"+
									"</div>"+
									"<div>"+
										"<div class='chat-sender-name'>"+
											data.val()[i].nickName+
										"</div>"+
										"<div class='chat-sender-message-wrapper'>"+
											"<div id='chatMessageArea' class='chat-sender-message'>"+
												data.val()[i].message_content+
											"</div>"+
											"<div class='chat-sender-time'>"+
												data.val()[i].message_time+
											"</div>"+
										"</div>"+
									"</div>"+
								"</div>";
									
				}//if (msginfo == myemail) end
			}//if((today - DB_date)/1000/60/60/24) < 2) end
		}//for(let i=0; i < data.val().length; i++) end
		if(data.val().length != 1){
			msgbox += 	"<div class='chat-body-unread'>"+
							"<div class='chat-body-unread-line'>"+
								"――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――"+
							"</div>"+
							"<div class='chat-body-unread-letter'>"+
								"여기까지 읽었습니다."+
							"</div>"+
							"<div class='chat-body-unread-line'>"+
								"――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――"+
							"</div>"+
						"</div>";
		}

		$("#chatMessageArea").append(msgbox);
		var chatAreaHeight = $("#chatArea").height();
		var maxScroll = $("#chatMessageArea").height() - chatAreaHeight;
		$("#chatMessageArea").scrollTop($("#chatMessageArea")[0].scrollHeight);
	});//firebase end
}

function onMessage(evt){
	var data = evt.data;
	appendMessage(data);
}

function onClose(evt){
	
}

function send(){
	let email = $('#session_email').val();
	let nickname = $('#nickname').val();
	var msg = $('#message').val();
	$('#message').val('');
	if(msg.trim() != ''){
		websocket.send(email + "|" + msg + "|" + nickname);
	}
	
}

function appendMessage(msg) {
	
	$.ajax(
		{
			type 		: "GET",
			url  		: "users?select="+$('#select').val(),
			error		: function(request,status,error){
				alert(error);
			},
			success 	: function(data){
				console.log(data);

				let myemail = $('#session_email').val();
				let mynickname = $('#nickname').val();
				var strarray = msg.split('|');
			
				var msginfo = strarray[0];
				console.log(">"+msginfo+"<")
				var message = strarray[1];
				var msgbox ='';
				
				//현재 시간 구하기
				let today = new Date();
				let time_index = today.toLocaleTimeString().lastIndexOf(':');
				let time = today.toLocaleTimeString().substr(0,time_index);
				let date = today.format('yyyy-MM-dd');
				
				if (msginfo == myemail) {
					msgbox = 	"<div class='chat-receiver-wrapper'>"+
									"<div class='chat-receiver-pic'>"+
										"<i class='fas fa-user'></i>"+
									"</div>"+
									"<div>"+
										"<div class='chat-receiver-name'>"+
											mynickname+
										"</div>"+
										"<div class='chat-receiver-message-wrapper'>"+
											"<div id='chatMessageArea' class='chat-receiver-message'>"+
												message+
											"</div>"+
											"<div class='chat-receiver-time'>"+
												time+
											"</div>"+
										"</div>"+
									"</div>"+
								"</div>";
								
							//SELECT chatting_room_seq
							firebase.database().ref().child('chatting_room_seq').once('value',function(data){
								//message_seq 추출
								let message_seq = Object.keys(data.val()[$('#select').val()].messages).length;
								
								//INSERT message
								firebase.database().ref().child('chatting_room_seq/'+$('#select').val()+'/messages/'+message_seq).set({
									chatting_room_seq : $('#select').val(),
									message_seq : message_seq,
									message_content : message,
									message_date : date,
									message_time : time,
									message_file : null,
									email : $('#session_email').val(),
									nickName : $('#nickname').val(),
									profile : null,
								});
							});
							
							//팀원의 숨겨진 모든 채팅방 다 오픈하기 
							$.ajax(
								{
									type 		: "POST",
									url  		: "redirect",
									data 		: {
										'select' : $('#select').val(),
									},
									async		: false,
									success 	: function(data){
										
									},
									error		: function(request,status,error){
										alert(error);
									}
								}
							);
							
							
				}else if(msginfo == "알림"){
					console.log("알림에 걸림");
					msgbox += 	"<div class='chat-body-date'>"+
									"<div class='chat-body-date-line'>"+
										"―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――"+
									"</div>"+
									"<div class='chat-body-date-letter'>"+
										message+
									"</div>"+
									"<div class='chat-body-date-line'>"+
										"――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――"+
									"</div>"+
								"</div>";
								
				}else {
					$.each(data,function(index,elem){
						if(msginfo == elem.email){
							msgbox = 	"<div class='chat-sender-wrapper'>"+
											"<div class='chat-sender-pic'>"+
												"<i class='fas fa-user'></i>"+
											"</div>"+
											"<div>"+
												"<div class='chat-sender-name'>"+
													elem.nickName+
												"</div>"+
												"<div class='chat-sender-message-wrapper'>"+
													"<div id='chatMessageArea' class='chat-sender-message'>"+
														message+
													"</div>"+
													"<div class='chat-sender-time'>"+
														time+
													"</div>"+
												"</div>"+
											"</div>"+
										"</div>";
										
						}//if
					});//each

				}
				$("#chatMessageArea").append(msgbox);
				var chatAreaHeight = $("#chatArea").height();
				var maxScroll = $("#chatMessageArea").height() - chatAreaHeight;
				$("#chatMessageArea").scrollTop($("#chatMessageArea")[0].scrollHeight);
			}
		}
	);
	
}

	Date.prototype.format = function (f) {
	    if (!this.valueOf()) return " ";
	
	    var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	    var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
	    var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	    var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	    var d = this;
	
	    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
	        switch ($1) {
	            case "yyyy": return d.getFullYear(); // 년 (4자리)
	            case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
	            case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
	            case "dd": return d.getDate().zf(2); // 일 (2자리)
	            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
	            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
	            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
	            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
	            case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
	            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
	            case "mm": return d.getMinutes().zf(2); // 분 (2자리)
	            case "ss": return d.getSeconds().zf(2); // 초 (2자리)
	            case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
	            default: return $1;
	        }
	    });
	};
	
	String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
	String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
	Number.prototype.zf = function (len) { return this.toString().zf(len); };
	