/*
파일명: kanbanComments.js
설명: 칸반 카드 모달 댓글 CRUD, AJAX
작성일: 2021-01-17 ~
작성자: 문지연
*/

$(document).ready(function(){

					
	function commentsIcon(comments_seq,email,nickName,reg_date,comments){
		let commTag = '<div class="commMemWrap" data-com-seq="'+comments_seq+'"value="'+email+
						'"><img class="commPro" src="/resources/img/icon/none.png">'+
						'<div class="writerWrap"><p class="commWriter">'+nickName+'</p><p class="commDate">'+reg_date+'</p></div>'+
						'<div class="memCommentWrap"><div class="memComment">'+comments;
		return commTag;
	}
	
	function commentsPro(comments_seq,email,profile,nickName,reg_date,comments){
		let commTag = '<div class="commMemWrap" data-com-seq="'+comments_seq+'"value="'+email+
						'"><img class="commPro" src="resources/profile/'+email+'_'+profile+'">'+
						'<div class="writerWrap"><p class="commWriter">'+nickName+'</p><p class="commDate">'+reg_date+'</p></div>'+
						'<div class="memCommentWrap"><div class="memComment">'+comments
		return commTag;
	}
	
	/*Add Comments*/
	$(document).on("submit", ".commentsForm", function(e) {
		e.preventDefault();
		let commentsOb = new Object();
		let comments = $(this).children('.addComments').val();
		let card_seq = $(this).parents().children().children('.modal_card_seq').attr('value');
		let email = $('#session_email').val();
		
		let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		let dateTime = date+' '+time;
		
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
					let comments=data.comments;
					if(comments.profile==null){
						let commIcon = commentsIcon(comments.comments_seq,comments.email,comments.nickName,dateTime,comments.comments);
						if(item.email==myEmail){
							commIcon += '</div><div class="commIcons"><i class="fas fa-eraser editComm"></i>'+
										'<i class="far fa-trash-alt deleteComm"></i><div></div></div>';
							$('.comments').append(commIcon);
						}else{
							commIcon += '</div></div></div>';
							$('.comments').append(commIcon);
						}
					}else {
						let commPro = commentsPro(comments.comments_seq,comments.email,comments.profile,comments.nickName,comments.reg_date,comments.comments);
						if(item.email==myEmail){
							commIcon += '</div><div class="commIcons"><i class="fas fa-eraser editComm"></i>'+
										'<i class="far fa-trash-alt deleteComm"></i><div></div></div>';
							$('.comments').append(commPro);
						}else{
							commIcon += '</div></div></div>';
							$('.comments').append(commPro);
						}
					}
				}
			});
			$(this).children('.addComments').val("");
			
	});
	
	/*Get comments*/
	$(document).on('click','.cardContent',function(e){
		e.preventDefault();
		$('.comments').show();
		let cardSeq = Number($('.modal_card_seq').attr("value"));
		let myEmail = $('#session_email').val();
		console.log(myEmail);
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
						let commIcon = commentsIcon(item.comments_seq,item.email,item.nickName,item.reg_date,item.comments);
						if(item.email==myEmail){
							commIcon += '</div><div class="commIcons"><i class="fas fa-eraser editComm"></i>'+
										'<i class="far fa-trash-alt deleteComm"></i><div></div></div>';
							$('.comments').append(commIcon);
						}else{
							commIcon += '</div></div></div>';
							$('.comments').append(commIcon);
						}
					}else {
						let commPro = commentsPro(item.comments_seq,item.email,item.profile,item.nickName,item.reg_date,item.comments);
						if(item.email==myEmail){
							commPro += '</div><div class="commIcons"><i class="fas fa-eraser editComm"></i>'+
										'<i class="far fa-trash-alt deleteComm"></i><div></div></div>';
							$('.comments').append(commPro);
						}else{
							commPro += '</div></div></div>';
							$('.comments').append(commPro);
						}
					}
				
				});
				}
			});
	});
	
	
	
	
	//delete comments
	$(document).on('click','.fa-trash-alt.deleteComm',function(){
		let commSeq = Number($(this).parents('.commMemWrap').attr('data-com-seq'));
		let deletedComm = $(this).parents('.commMemWrap');
		
		$.ajax({
			url: "deleteCardComment.pie?commSeq="+commSeq,
			contentType: "application/json; charset=UTF-8",
			type: "post",
			async: "false",
			dataType: "json",
			success: function(data){
				deletedComm.animate({
				left:"-30%",
				height: 0,
				opacity: 0
			}, 200);
			setTimeout(function() { deletedComm.remove(); }, 1000);
			}
		});
	})
	
	//close Modal
	$(document).on("click", ".closeModal", function(e) {
		e.preventDefault();
		$(".comments").empty();
	});

});