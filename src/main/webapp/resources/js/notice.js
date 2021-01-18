$(document).ready(function() {
		$('#wirte').click(function(){
		document.getElementById('noticeInsert_modal_contents').style.display='block'
       //document.getElementById('notice_modal_background').style.display = 'block';
	$('#summernote').summernote({
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
				let noticeInsert = JSON.stringify(noticeInsertOb);
				$.ajax({
					type: "POST",
					url: "noticeInsert.pie",
					contentType: "application/json; charset=UTF-8",
					dataType: "json",
					async: false,
					data: noticeInsert,
					success: function(data) {
					}
				})
		})

});