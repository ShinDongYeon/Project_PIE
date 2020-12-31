<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Login</title>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/resources/css/registerCompletedStyle.css">
	
</head>
<body>
	<!-- Top -->
	<jsp:include page="/WEB-INF/views/common/main_top.jsp"></jsp:include>
	
	<!-- login-register left navbar -->
	<jsp:include page="common/loginRegisterLeftNavbar.jsp"></jsp:include>
	
	<!-- Register Completed Page -->
	<div class="register-completed-wrapper">
		<div class="register-completed-contents">
			<!-- logo image -->
			<div class="register-completed-image">
				<img src="/resources/img/registerCompleted.png">			
			</div>
			
			<!-- completed message1 -->
			<div class="register-completed-message1">
				WELCOME<br>
				<span>파이</span>의 원이 되신걸 환영합니다.
			</div>

			<!-- completed message2 -->
			<div class="register-completed-message2">
				000 회원님 회원가입을 축하합니다.<br>
				가입하신 아이디는 <span>ooo@gmail.com</span>입니다.
				
			</div>
			
			<!-- Register button -->
			<div class="register-completed-btn-wrapper">
				<button class="register-completed-btn">시작하기</button>
			</div>
		</div>
	</div>
	
</body>
</html>