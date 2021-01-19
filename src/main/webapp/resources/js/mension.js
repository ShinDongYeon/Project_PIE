/**
 * 멘션 추가하기
 */
$(document).ready( () => {
	//SELECT mension
	firebase.database().ref().child('mension').orderByChild('mension_email').equalTo($('#session_email').val()).once('value',function(data){
		console.log(data.val());
		
		$('#bookmark-items-wrapper').empty();
		
		if(data.val() != null){
			//for(let i=1; i < data.val().length; i++){
			$.each(data.val(),function(index, elem){
				if(index != 0 || !elem typeof object){
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
								
								opr += 	'<div class="bookmark-item-wrapper">'+
											'<div class="bookmark-top-wrapper">'+
												'<div class="bookmark-user">';
													if(roomdata != null){
														opr+= "<img class='bookmark-img' src='/resources/profile/"+roomdata[0].email+"_"+roomdata[0].profile+"'>";
													}else{
														opr+= '<i class="fas fa-user"></i>';
													}
								opr+=			'</div>'+
												'<div class="bookmark-username">'+elem.nickName+'</div>'+
												
												'<div class="bookmark-cancel"><i class="fas fa-times"></i></div>'+
											'</div>'+
											'<div class="bookmark-middle-wrapper">'+
												'<div class="bookmark-roomname">'+roomdata[0].chatting_room_name+'</div>'+
												'<div class="bookmark-time">'+elem.message_date+'&nbsp;'+elem.message_time+'</div>'+
												//'<div class="bookmark-reply">'+
												//	'<i class="far fa-comment-dots"></i>댓글'+
												//'</div>'+
												//'<div class="bookmark-flag">'+
												//	'<i class="fas fa-star"></i>즐겨찾기'+
												//'</div>'+
											'</div>'+
											'<div class="bookmark-bottom-wrapper">'+
												elem.message_content+
											'</div>'+
										'</div>';
							}
					});
					$('#bookmark-items-wrapper').append(opr);
				}
				
				
			});
				
				
			//}
		}
		
		
		
	});
});