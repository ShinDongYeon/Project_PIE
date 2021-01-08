<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<script type="text/javascript">
let html = "";
$(document).ready(function(){
	$.ajax({  
		type : "GET",
		url  : "alramList.pie",
		data:{
			email:"${sessionScope.loginuser}",
			project_seq:$("#projectNum").val()
			},
		success : function(data){
			console.log($("#projectNum").val())
			createAlram(data);
		}
	});
})

function createAlram(data){
	$.each(data,function(index,alram){
		console.log(alram)
		let alramTime = moment(alram.alramTime).format('YYYY-MM-DD'+" "+'HH:mm')
		html += '<div class="alram-list-wrapper">\
			<div class="alram-list-img">\
			<img src="/resources/img/pie_logo.png">\
			</div>\
			<div class="alram-list-letter-wrapper">\
			<div class="alram-list-letter-title">\
			'+alram.nickName+'님이 '+alram.title+'를 '+alram.state+' 하였습니다.\
			</div>\
			<div class="alram-list-letter-contents">\
			<span>'+alramTime+'</span>\
			</div>\
			</div>\
			<div class="alram-list-cancel">\
			<i class="fas fa-times"></i>\
			<input type="hidden" id="alramseq" name="alramseq" value='+alram.alramseq+' />\
			<input type="hidden" id="memberEmail" name="memberEmail" value='+alram.memberEmail+' />\
			</div>\
			</div>';
	});
	$('#alram').append(html)
	
	$(document).on('click','.alram-list-cancel',function(){
			let alramseq = $(this).children().next().val()
			console.log(alramseq);
			alramseq = Number(alramseq);
			console.log("no"+alramseq+"--"+typeof alramseq);
			$.ajax({  
				type : "POST",
				url  : "alramDelete.pie",
				data:{ 
					alramseq:alramseq
					},
				success : function(data){
				}
			});
			console.log($(this).parent().remove())
		})
	
}
</script>
<body>
	<div id="far fa-bell" class="right-sidebar-alarm">
		<!-- samples -->
		<div  id="alram">

		<!-- samples -->
		<!-- <div class="alarm-item-wrapper">
			<div class="alarm-top-wrapper">
				<div class="alarm-user"><i class="fas fa-user"></i></div>
				<div class="alarm-username">강성윤</div>
				<div class="alarm-cancel"><i class="fas fa-times"></i></div>
			</div>
			<div class="alarm-middle-wrapper">
				<div class="alarm-reply">
					<i class="far fa-comment-dots"></i>댓글
				</div>
				<div class="alarm-flag">
					<i class="fas fa-star"></i>즐겨찾기
				</div>
			</div>
			<div class="alarm-bottom-wrapper">
				내용입니다.
			</div>
		</div> -->
	</div>
	</div>
</body>
</html>