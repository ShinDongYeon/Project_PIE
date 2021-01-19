/**
 * 멘션 추가하기
 */
$(document).ready( () => {
	//SELECT mension
	firebase.database().ref().child('mension').orderByChild('mension_email').equalTo($('#session_email').val()).once('value',function(data){
		console.log(data.val());
		let data_arr = [];
		for(let i in data.val()){
			data_arr.push(data.val()[i]);
		}
		console.log(data_arr);
		
		$('#mension-items-wrapper').empty();
		
		if(data.val() != null){
			$.each(data_arr,function(index, elem){
				console.log(elem);
					let opr = '';
					$.ajax({
							type : "GET",
							url  : "mension",
							async: false,
							data : { 
								'chatting_room_seq' : elem.chatting_room_seq, 
								'sender_email' : elem.email
							},
							success : function(roomdata){
								console.log(roomdata);
								
								opr += 	'<div class="mension-item-wrapper">'+
											'<div class="mension-top-wrapper">'+
												'<div class="mension-user">';
													if(roomdata != null){
														opr+= "<img class='mension-img' src='/resources/profile/"+roomdata[0].email+"_"+roomdata[0].profile+"'>";
													}else{
														opr+= '<i class="fas fa-user"></i>';
													}
								opr+=			'</div>'+
												'<div class="mension-username">'+elem.nickName+'</div>'+
												'<div class="mension-roomname">'+roomdata[0].chatting_room_name+'</div>'+
												'<div class="mension-cancel"><i class="fas fa-times"></i></div>'+
											'</div>'+
											'<div class="mension-middle-wrapper">'+
												
												'<div class="mension-time">'+elem.message_date+'&nbsp;'+elem.message_time+'</div>'+
												//'<div class="mension-reply">'+
												//	'<i class="far fa-comment-dots"></i>댓글'+
												//'</div>'+
												//'<div class="mension-flag">'+
												//	'<i class="fas fa-star"></i>즐겨찾기'+
												//'</div>'+
											'</div>'+
											'<div class="mension-bottom-wrapper">'+
												elem.message_content+
											'</div>'+
										'</div>';
							}
					});
					$('#mension-items-wrapper').append(opr);
				
				
			});
				
				
		}
		
		
		
	});
});

