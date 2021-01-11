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
			console.log("알람갯수"+data.length)
			createAlram(data);
			createCount(data)
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
			<input type="hidden" id="memberEmail" name="memberEmail" value='+$("#email").val()+' />\
			</div>\
			</div>';
	});
	$('#alram').append(html)
	
	$(document).on('click','.alram-list-cancel',function(){
			let alramseq = $(this).children().next().val()
			alramseq = Number(alramseq);
			console.log("no"+alramseq+"--"+typeof alramseq);
			$.ajax({  
				type : "POST",
				url  : "alramDelete.pie",
				data:{ 
					alramseq:alramseq,
					email:$("#email").val()
					},
				success : function(data){
				}
			});
			console.log($(this).parent().remove())
			var alram = {
			  	deleteNum:"0",
			  	email:$("#email").val(),
			  	project_seq:$("#projectNum").val(),
					}
					socket.send(JSON.stringify(alram))
		})
	
}
function createCount(data){
	var alramCount = $('#alramCount');
	alramCount.empty();
	console.log("카운트:"+data.length)
	if(data.length !== 0){
		$(".right-sidebar-alarm").attr('id','far fa-bell bell')
		$("#sidebar-bell").addClass('bell')
		document.getElementById('alramCount').style.display='block'
		document.getElementById('alramCount').innerText=data.length;	
	}
}
</script>
<body>
	<div id="far fa-bell" class="right-sidebar-alarm">
		<!-- samples -->
		<div  id="alram">
	</div>
	</div>
</body>
</html>