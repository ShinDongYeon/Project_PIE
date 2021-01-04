/*right sidebar contents wrapper*/

$(document).ready(function(){
	var modal = document.getElementById('crtChat-modal')
	var crtChatBtn = document.getElementById('crtChatBtn');
	var crtChatCancelBtn = document.getElementById('crtChat-btn-cancel');
	var crtChatCreatedBtn = document.getElementById('crtChat-btn-created');
	var crtChatBackground = document.getElementById('crtChat-modal-background');
	
	
	crtChatBtn.onclick = function() {
		modal.style.display = 'block';
		crtChatBackground.style.display = 'block';
		
		$.ajax(
			{
				type : "GET",
				url  : "ChatMembers",
				success : function(data){
					//console.log(data);
					userList(data);
				}
			}
		);
		
	}
	
	crtChatCancelBtn.onclick = function(){
		modal.style.display = 'none';
		crtChatBackground.style.display = 'none';
		
		$('#Selected-List').empty();
	}
	
	crtChatCreatedBtn.onclick = function(){
		
		if($('#Selected-List').is(':empty')){
			console.log("check");
		}
		
		modal.style.display = 'none';
		crtChatBackground.style.display = 'none';
		
		let div_length = $('#Selected-List').find('div').length;
		console.log("div_length");
		console.log(div_length);
		console.log($('#Selected-List').find('div'));
		
		let user_array = [];
		for(let i=1; i <= div_length / 6; i++){
			let j = i * 6 - 2;
			let div = $('#Selected-List').find('div:eq('+j+')').text();
			user_array.push(div);
		}
		
		$('#Selected-List').empty();
		
		$.ajax(
				{
					type 		: "POST",
					url  		: "ChatMembers",
					traditional : true,
					data 		: {
						'user_array' : user_array
					},
					success 	: function(data){
						console.log(data);
						completeChattingRoom(data);
					},
					error		: function(request,status,error){
						alert(error);
					}
				}
			);
		
	}
	
	window.onclick = function(event) {
		if(event.target == crtChatBackground) {
			modal.style.display = 'none';
			crtChatBackground.style.display = 'none';
			$('#Selected-List').empty();
		}
	}
	
	
});

/*
파일명: projectSidebar.js 에서 ajax 성공 시 실행되는 함수
설명: 채팅방리스트를 비동기로 띄움
작성일: 2020-12-31
작성자: 도재구
*/
function chattingRoomList(data){
	$('#chat-list').empty();
	let opr = "";
	$.each(data,function(index,elem){
		//프로젝트 제목
		let chat_title = elem.chatting_ROOM_NAME;
		let chat_title_substr = "";
		if(chat_title.length > 17){
			chat_title_substr = chat_title.substr(0,17) + "...";
		}else{
			chat_title_substr = chat_title;
		}
		
		//프로젝트 참여자
		let chat_members = chat_title.split(",");
		let chat_member_tag = "";
		$.each(chat_members,function(index,elem){
			chat_member_tag += "#"+elem;
		});
		if(chat_member_tag.length > 27){
			chat_member_tag = chat_member_tag.substr(0,27) + "...";
		}
		
		opr += "<div id='chat-list-wrapper-"+elem.chatting_ROOM_SEQ+"' class='chat-list-wrapper'>"+
					"<div class='chat-list-img'>"+
						"<i class='fas fa-th-large'></i>"+
					"</div>"+
					"<div class='chat-list-letter-wrapper'>"+
						"<div id='chat-list-letter-title-"+elem.chatting_ROOM_SEQ+"' class='chat-list-letter-title'>"+chat_title_substr+"</div>"+
						"<div id='chat-list-letter-members-"+elem.chatting_ROOM_SEQ+"' class='chat-list-letter-members'>"+chat_member_tag+"</div>"+
					"</div>"+
					"<div id='chat-list-update-"+elem.chatting_ROOM_SEQ+"' class='chat-list-update'>"+
						"<i onclick='updateChatRoomName(this)' class='fas fa-pencil-alt'></i>"+
					"</div>"+
					"<div id='chat-list-cancel-"+elem.chatting_ROOM_SEQ+"' class='chat-list-cancel'>"+
						"<i onclick='deleteChatRoom(this)' class='fas fa-times'></i>"+
					"</div>"+
				"</div>";
	});
	$('#chat-list').append(opr);
}

/*
파일명: projectMainChat.js
설명: 채팅방 생성시 채팅방리스트에 생성된 것을 반영하여 리스트에 띄움
작성일: 2020-12-31
작성자: 도재구
*/
function completeChattingRoom(data){
	$('#chat-list').empty();
	let opr = "";
	$.each(data,function(index,elem){
		//프로젝트 제목
		let chat_title = elem.chatting_ROOM_NAME;
		let chat_title_substr = "";
		if(chat_title.length > 17){
			chat_title_substr = chat_title.substr(0,17) + "...";
		}else{
			chat_title_substr = chat_title;
		}
		
		//프로젝트 참여자
		let chat_members = chat_title.split(",");
		let chat_member_tag = "";
		$.each(chat_members,function(index,elem){
			chat_member_tag += "#"+elem;
		});
		if(chat_member_tag.length > 27){
			chat_member_tag = chat_member_tag.substr(0,27) + "...";
		}
		
		opr += "<div id='chat-list-wrapper-"+elem.chatting_ROOM_SEQ+"' class='chat-list-wrapper'>"+
					"<div class='chat-list-img'>"+
						"<i class='fas fa-th-large'></i>"+
					"</div>"+
					"<div class='chat-list-letter-wrapper'>"+
						"<div id='chat-list-letter-title-"+elem.chatting_ROOM_SEQ+"' class='chat-list-letter-title'>"+chat_title_substr+"</div>"+
						"<div id='chat-list-letter-members-"+elem.chatting_ROOM_SEQ+"' class='chat-list-letter-members'>"+chat_member_tag+"</div>"+
					"</div>"+
					"<div id='chat-list-update-"+elem.chatting_ROOM_SEQ+"' class='chat-list-update'>"+
						"<i onclick='updateChatRoomName(this)' class='fas fa-pencil-alt'></i>"+
					"</div>"+					
					"<div id='chat-list-cancel-"+elem.chatting_ROOM_SEQ+"' class='chat-list-cancel'>"+
						"<i onclick='deleteChatRoom(this)' class='fas fa-times'></i>"+
					"</div>"+
				"</div>";
	});
	$('#chat-list').append(opr);
}

/*
파일명: projectMainChat.js
설명: 채팅방 리스트에서 채팅방을 삭제합니다.
작성일: 2020-12-31
작성자: 도재구
*/
function deleteChatRoom(me){
	let div = $(me).closest('div');
	let div_attr = div.attr("id");
	let div_index = div_attr.lastIndexOf("-")+1;
	let div_substr = div_attr.substring(div_index);
	
	console.log("div_substr");
	console.log(div_substr);
	
	$('#chat-list-wrapper-'+div_substr).remove();
	
	$.ajax(
		{
			type 		: "DELETE",
			url  		: "ChatRoomList?CHATTING_ROOM_SEQ="+div_substr,
			success 	: function(data){
				console.log(data);
			},
			error		: function(request,status,error){
				alert(error);
			}
		}
	);
}

/*
파일명: projectMainChat.js
설명: 채팅방 이름을 수정하기 위해 input태그를 띄워줍니다.
작성일: 2020-12-31
작성자: 도재구
*/
function updateChatRoomName(me){
	let div = $(me).closest('div');
	let div_attr = div.attr("id");
	let div_index = div_attr.lastIndexOf("-")+1;
	let div_substr = div_attr.substring(div_index);
	
	let chat_room_title = $('#chat-list-letter-title-'+div_substr);
	let chat_room_update = $('#chat-list-update-'+div_substr);
	chat_room_title.empty();
	chat_room_update.empty();
	
	let opr = "<input id='chat-list-letter-title-update-"+div_substr+"' type='text' size=12>";
	let check_button = "<i onclick='updateNameOk(this)' class='fas fa-check'></i>";
	chat_room_title.append(opr);
	chat_room_update.append(check_button);
	
}

/*
파일명: projectMainChat.js
설명: 채팅방 이름 수정을 적용합니다.
작성일: 2020-12-31
작성자: 도재구
*/
function updateNameOk(me){
	let div = $(me).closest('div');
	let div_attr = div.attr("id");
	let div_index = div_attr.lastIndexOf("-")+1;
	let div_substr = div_attr.substring(div_index);

	let chat_room_title = $('#chat-list-letter-title-'+div_substr);
	let chat_room_update = $('#chat-list-letter-title-update-'+div_substr);
	
	console.log("chat_room_update.val()");
	console.log(chat_room_update.val());
	
	$.ajax(
		{
			type 		: "PUT",
			url  		: "ChatRoomList?CHATTING_ROOM_SEQ="+div_substr+"&CHATTING_ROOM_NAME="+chat_room_update.val(),
			success 	: function(data){
				//console.log(data);
				
			},
			error		: function(request,status,error){
				alert(error);
			}
		}
	);
	//input 태그 삭제
	chat_room_update.remove();
	//div title에 value값 넣기
	chat_room_title.append(chat_room_update.val());
	
	//버튼 이미지
	$('#chat-list-update-'+div_substr).empty();
	//div 태그에 버튼 이미지 넣기
	let opr = "<i onclick='updateChatRoomName(this)' class='fas fa-pencil-alt'></i>";
	$('#chat-list-update-'+div_substr).append(opr);
	
}


/*
파일명: projectMainChat.js
설명: 채팅방 생성시 유저리스트를 DB에서 갖고옵니다
작성일: 2020-12-30
작성자: 도재구
*/
function userList(data){
	$('#Chatting-UserList').empty();
	let opr = "";
	$.each(data,function(index,user){
		opr += "<div id='crtChat-select-users-wrapper-"+index+"' class='crtChat-select-users-wrapper'>"+
					"<div class='crtChat-select-user-wrapper'>"+
						"<div class='crtChat-select-user-subWrapper'>"+
							"<div class='crtChat-select-user-pic'>"+
								"<i class='fas fa-user'></i>"+					
							"</div>"+
							"<div class='crtChat-select-user-letters-wrapper'>"+
								"<div id='crtChat-select-user-name-"+index+"' class='crtChat-select-user-name'>"+
									user.nickName+
								"</div>"+
								"<div id='crtChat-select-user-email-"+index+"' class='crtChat-select-user-email'>"+
									user.email+
								"</div>"+
							"</div>"+
						"</div>"+
						"<div id='crtChat-select-user-btn-"+index+"' class='crtChat-select-user-btn'>"+
							"<i onclick='selectUser(this)' class='fas fa-plus'></i>"+
						"</div>"+
					"</div>"+
				"</div>";
	});
	$('#Chatting-UserList').append(opr);
};

/*
파일명: projectMainChat.js
설명: 유저리스트 중에서 + 버튼을 눌렀을 때 실행되는 함수
작성일: 2020-12-30
작성자: 도재구
*/
function selectUser(me){
	//span 태그의 전체 html 정보
	let div = $(me).closest('div');
	
	console.log("div");
	console.log(div);
	console.log("div.html():");
	console.log(div.html());
	console.log("div.text():");
	console.log(div.text());
	
	//버튼을 누른 대상 USER의 index값 추출 'span_substr'
	let div_index = div.attr("id").lastIndexOf("-")+1;
	let div_substr = div.attr("id").substring(div_index);
	console.log("div_substr:");
	console.log(div_substr);


	console.log(div);
	console.log(div.children());
	let nick_name = $('#crtChat-select-user-name-'+div_substr);
	let email = $('#crtChat-select-user-email-'+div_substr);
	
	console.log("nick_name.html():");
	console.log(nick_name.html());
	console.log("nick_name.text():");
	console.log(nick_name.text());

	//버튼을 누른 대상 USER를 선택리스트에 옮기기
	let opr = "";
	opr +=	"<div id='crtChat-selected-user-wrapper-"+div_substr+"' class='crtChat-selected-user-wrapper'>"+
				"<div class='crtChat-selected-user-pic'>"+
					"<i class='fas fa-user'></i>"+	
				"</div>"+
				"<div class='crtChat-selected-user-letter-wrapper'>"+
					"<div id='crtChat-selected-user-letter-name-"+div_substr+"' class='crtChat-selected-user-letter-name'>"+
						nick_name.html()+
					"</div>"+
					"<div id='crtChat-selected-user-letter-email-"+div_substr+"' class='crtChat-selected-user-letter-email' hidden>"+
						email.html()+
					"</div>"+
					"<div id='crtChat-selected-user-letter-x-"+div_substr+"' class='crtChat-selected-user-letter-x'>"+
						"<i onclick='selectedClose(this)' class='fas fa-times'></i>"+
					"</div>"+
				"</div>"+
			"</div>";
					
	$('#Selected-List').append(opr);
	/*$('#Selected-List').css("display","block");
	$('#Selectedlist-Subject').css("display","block");*/
	$('#crtChat-select-users-wrapper-'+div_substr).css("display","none");


	
}

/*
파일명: projectMainChat.js
설명: 선택된 리스트 중에서 취소 버튼을 눌렀을 때 실행되는 함수
작성일: 2020-12-30
작성자: 도재구
*/
function selectedClose(me){
	//span 태그의 전체 html 정보
	let div = $(me).closest('div');
	
	let close_attr_id = div.attr("id");
	let close_index = close_attr_id.lastIndexOf("-")+1;
	let close_substr = close_attr_id.substring(close_index);
	console.log("close_substr:");
	console.log(close_substr);
	
	//selected list에서 해당 유저 삭제
	$('#crtChat-selected-user-wrapper-'+close_substr).remove();

	//selected list에 유저가 아무도 없을 때 display none
	let close_attr_class = $('.crtChat-selected-user-letter-wrapper').attr("class");
	/*if(close_attr_class === undefined){
		$('#Selected-List').css("display","none");
		$('#Selectedlist-Subject').css("display","none");
	}*/

	$('#crtChat-select-users-wrapper-'+close_substr).css("display","block");


}
/*//right sidebar contents wrapper*/