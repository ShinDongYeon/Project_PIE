/*
파일명: kanbanComments.js
설명: 칸반 카드 모달 댓글 CRUD, AJAX
작성일: 2021-01-17 ~
작성자: 문지연
*/

$(document).ready(function(){

					
	function commentsIcon(nickName,reg_date,comments){
		let commTag = '<div class="commMemWrap"><img class="commPro" src="/resources/img/icon/none.png">'+
						'<div class="writerWrap"><p class="commWriter">'+nickName+'</p><p class="commDate">'+reg_date+'</p></div>'+
						'<div class="memCommentWrap"><div class="memComment">'+comments+
						'</div><div class="commIcons"><i class="fas fa-eraser editComm"></i><i class="far fa-trash-alt deleteComm"></i><div></div></div>';
		return commTag;
	}
	
	function commentsPro(email,profile,nickName,reg_date,comments){
		let commTag = '<div class="commMemWrap"><img class="commPro" src="resources/profile/'+email+'_'+profile+'">'+
						'<div class="writerWrap"><p class="commWriter">'+nickName+'</p><p class="commDate">'+reg_date+'</p></div>'+
						'<div class="memCommentWrap"><div class="memComment">'+comments+
						'</div><div class="commIcons"><i class="fas fa-eraser editComm"></i><i class="far fa-trash-alt deleteComm"></i><div></div></div>';
		return commTag;
	}
	
	/*Add Comments*/
	$(document).on("submit", ".commentsForm", function(e) {
		e.preventDefault();
		let commentsOb = new Object();
		let comments = $(this).children('.addComments').val();
		let card_seq = $(this).parents().children().children('.modal_card_seq').attr('value');
		let email = $('#session_email').val();
		
		console.log(commentsOb);
		commentsOb.comments=comments;
		commentsOb.card_seq=card_seq;
		commentsOb.email=email;
		
		let cardComments = JSON.stringify(commentsOb);
		
		console.log(cardComments);
			$.ajax({
				type: "post",
				url: "insertComments.pie",
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				data: cardComments,
				success: function(data) {
					console.log(data);
				}
			});
			$(this).children('.addComments').val("");
			
	});
	
	/*Get comments*/
	$(document).on('click','.cardContent',function(e){
		console.log("clicked");
		e.preventDefault();
		$('.comments').show();
		
		let cardSeq = Number($('.modal_card_seq').attr("value"));
		console.log("cardsequences:::"+cardSeq);
		$.ajax({
				type: "post",
				url: "loadComments.pie?cardSeq="+cardSeq,
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				success: function(data) {
					console.log(data);
					let commList = data.commList;
					$.each(commList, function(index, item) {
					if(item.profile==null){
						let commIcon = commentsIcon(item.nickName,item.reg_date,item.comments);
						$('.comments').append(commIcon);
					}else {
						let commPro = commentsPro(item.email,item.profile,item.nickName,item.reg_date,item.comments);
						$('.comments').append(commPro);
					}
				
				});
				}
			});
	});
	
	//close Modal
	$(document).on("click", ".closeModal", function(e) {
		e.preventDefault();
		$(".comments").empty();
	});

});