<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<!-- Jquery CDN -->
<script src="https://code.jquery.com/jquery-3.5.1.min.js"
	integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
	crossorigin="anonymous"></script>
	
<script>

$(document).ready(function(){

	//파일 이벤트 
	$('#fileSubmit').click(function(){
		 
		 const formData = new FormData($('#fileForm')[0]); 

			console.log(formData);
		 
		 $.ajax({ 
			 type: "POST", 
			 enctype: 'multipart/form-data', // 필수 
			 url: 'file.pie', 
			 data: formData, // 필수 
			 processData: false, // 필수 
			 contentType: false, // 필수 
			 cache: false, 
			 success: function(result){ 
		 		
	 		 }, 
			 error: function (e){ 
			
			 }
			});
	 });
});
</script>
</head>
<body>
	<form id="fileForm" method="post" enctype="multipart/form-data">
		<input type="file">
		<button id="fileSubmit">파일전송</button>
	</form>
</body>
</html>