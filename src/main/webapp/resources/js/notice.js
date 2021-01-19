$(document).ready(function() {
	let today = new Date();
	let hours = today.getHours();
	let minutes = today.getMinutes();
		$('#wirte').click(function(){
		document.getElementById('noticeInsert_modal_contents').style.display='block'
       //document.getElementById('notice_modal_background').style.display = 'block';
	$('#summernote').summernote({
		  toolbar: [
    ['style', ['bold', 'italic', 'underline', 'clear']],
    ['font', ['strikethrough', 'superscript', 'subscript']],
    ['fontsize', ['fontsize']],
    ['color', ['color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['height', ['height']]
  ],			 
		  height: 300,                 // 에디터 높이
		  minHeight: null,             // 최소 높이
		  maxHeight: null,             // 최대 높이
		  focus: true,                  // 에디터 로딩후 포커스를 맞출지 여부
		  lang: "ko-KR",					// 한글 설정
		  placeholder: '최대 2048자까지 쓸 수 있습니다'	//placeholder 설정
          
	});
 });
		$("#insertnotice").click(function(){
		document.getElementById('notice_modal_background').style.display = 'none';
				let noticeInsertOb = new Object();
				noticeInsertOb.title = $('#title').val()
				noticeInsertOb.content = $('#summernote').val()
				noticeInsertOb.project_seq = $("#projectNum").val()
				noticeInsertOb.nickName = $("#nick").val()
				noticeInsertOb.email = $("#email").val()
				noticeInsertOb.writeDate = moment(today).format('YYYY-MM-DD' + " " + 'HH:mm')
				let noticeInsert = JSON.stringify(noticeInsertOb);
				$.ajax({
					type: "POST",
					url: "noticeInsert.pie",
					contentType: "application/json; charset=UTF-8",
					dataType: "json",
					async: false,
					data: noticeInsert,
					success: function(data) {
						$.ajax({
						type: "GET",
						url: "lastNotice_seq.pie",
						contentType: "application/json; charset=UTF-8",
						async: false,
						success: function(result) {
						let writeDate = moment(noticeInsertOb.writeDate).format('YYYY-MM-DD' + " " + 'HH:mm')
						let html = 	'<div class="bookmark-item-wrapper">\
								 <div class="bookmark-top-wrapper">\
								 <div class="bookmark-username">'+noticeInsertOb.title+'</div>\
								 </div>\
								 <div class="bookmark-middle-wrapper">\
								 <div class="bookmark-reply">\
							   	 <i class="fas fa-pencil-alt"></i>'+noticeInsertOb.nickName+'\
								 </div>\
								 <div class="bookmark-flag">\
								 <i class="far fa-calendar"></i>'+writeDate+'\
								 </div>\
								 </div>\
								<input type="hidden" value='+Number(result)+'>\
								 </div>'
								$('#noticeList').append(html)
											}
						})
					}
				})
		})
		$.ajax({
			type: "GET",
			url:"noticeList.pie",
			contentType: "application/json; charset=UTF-8",
			async: false,
			data:{project_seq:$("#projectNum").val()},
			success: function(data) {
				createNotice(data)
					}
		})
					
	
function createNotice(data) {
	let html = "";
	$.each(data, function(index, notice) {
		let writeDate = moment(notice.writeDate).format('YYYY-MM-DD' + " " + 'HH:mm')
		//let alramTime = moment(alram.alramTime).format('YYYY-MM-DD' + " " + 'HH:mm')
		html += 	'<div class="bookmark-item-wrapper">\
					 <div class="bookmark-top-wrapper">\
					 <div class="bookmark-username">'+notice.title+'</div>\
					 </div>\
					 <div class="bookmark-middle-wrapper">\
					 <div class="bookmark-reply">\
				   	 <i class="fas fa-pencil-alt"></i>'+notice.nickName+'\
					 </div>\
					 <div class="bookmark-flag">\
					 <i class="far fa-calendar"></i>'+writeDate+'\
					 </div>\
					 </div>\
					<input type="hidden" value='+notice.notice_seq+'>\
					 </div>'
	});
	$('#noticeList').append(html)
}
	$(document).on("click",".bookmark-item-wrapper",function(){
			$.ajax({
			type: "GET",
			url:"noticeDetail.pie",
			contentType: "application/json; charset=UTF-8",
			async: false,
			data:{notice_seq:$(this).children('input').val()},
			success: function(data) {
				document.getElementById('noticeEdit_modal_contents').style.display='block'
				$("#titleView").val(data.title)
				document.getElementById('noticeContentView').innerHTML= data.content
				document.getElementById('summernoteEdit').innerHTML= data.content
					}
		})
	$("#editnotice").click(function(){
		document.getElementById('noticeContentView').style.display='none'
		document.getElementById('noticeContentEdit').style.display='block'
		$('#summernoteEdit').summernote({
		  toolbar: [
   			 ['style', ['bold', 'italic', 'underline', 'clear']],
   			 ['font', ['strikethrough', 'superscript', 'subscript']],
   			 ['fontsize', ['fontsize']],
    		 ['color', ['color']],
   			 ['para', ['ul', 'ol', 'paragraph']],
   			 ['height', ['height']]
 			 ],			 
		  height: 300,               
		  minHeight: null,             
		  maxHeight: null,           
		  focus: true,                  
		  lang: "ko-KR",					
		  placeholder: '최대 2048자까지 쓸 수 있습니다'	
          
	});
	})
	})
});