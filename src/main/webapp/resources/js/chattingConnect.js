
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

function chattingAlarm(data){
	
	$.ajax(
		{
			type 		: "GET",
			url  		: "../chat/room/list",
			async		: false,
			success 	: function(data){
				$('#chat-list').empty();
				let opr = "";
				$.each(data.chat_room_list,function(index,elem){
					
					//프로젝트 제목
					let chat_title = elem.chatting_room_name;
					let chat_title_substr = "";
					if(chat_title.length > 15){
						chat_title_substr = chat_title.substr(0,15) + "...";
					}else{
						chat_title_substr = chat_title;
					}
					
					//connectSocket.send(elem.chatting_room_seq);
					
					opr = 	"<div id='chat-list-wrapper-"+elem.chatting_room_seq+"' class='chat-list-wrapper'>"+
								"<div id='chat-list-alarm-"+elem.chatting_room_seq+"' class='chat-list-alarm'>0</div>"+
								"<div class='chat-list-img'>"+
									"<i class='fas fa-th-large'></i>"+
								"</div>"+
								"<div class='chat-list-letter-wrapper'>"+
									"<div id='chat-list-letter-title-"+elem.chatting_room_seq+"' class='chat-list-letter-title'>"+
										"<a id='chat-list-letter-a"+elem.chatting_room_seq+"' href='javascript:popupOpen("+elem.chatting_room_seq+",\""+chat_title_substr+"\");' class='chat-list-letter-a'>"+
											chat_title_substr+
										"</a>"+
									"</div>"+
									"<div id='chat-list-letter-members-"+elem.chatting_room_seq+"' class='chat-list-letter-members'>"+data.nicknames[index]+"</div>"+
								"</div>"+
								"<div id='chat-list-update-"+elem.chatting_room_seq+"' class='chat-list-update'>"+
									"<i onclick='updateChatRoomName(this)' class='fas fa-pencil-alt'></i>"+
								"</div>"+
								"<div id='chat-list-cancel-"+elem.chatting_room_seq+"' class='chat-list-cancel'>"+
									"<i onclick='deleteChatRoom(this)' class='fas fa-times'></i>"+
								"</div>"+
							"</div>";
					$('#chat-list').append(opr);
					if(elem.chatting_alarm != 0){
						$('#chat-list-alarm-'+elem.chatting_room_seq).css('display','block');
						$('#chat-list-alarm-'+elem.chatting_room_seq).html(elem.chatting_alarm);
					}
				});
			},
			error		: function(request,status,error){
				alert(error);
			}
		}
	);
}


