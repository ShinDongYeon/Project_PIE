<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Login</title>
	<jsp:include page="/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/resources/css/mainTopStyle.css">
	<link rel="stylesheet" href="/resources/css/loginStyle.css">
</head>
<body>
	<!-- Top -->
	<jsp:include page="/common/main_top.jsp"></jsp:include>
	
	<!-- Login Page -->
	<div class="login-wrapper">
		<div class="login-contents">
			<div class="login-title">
				또 다른 <span class="login-title-pie">파이</span>와<br>
				협업하는 공간
			</div>
			
			<!-- Login Form -->
			<div class="login-form">
				<form action="">
					<div class="login-email-wrapper">
						<div class="login-email-letter">
							이메일
						</div>
						<input type="text" class="login-email" id="email" name="email" placeholder="pie@pie.com">
					</div>
					<div class="login-password-wrapper">
						<div class="login-password-letter">
							비밀번호
						</div>
						<input type="text" class="login-password" id="pwd" name="pwd" placeholder="">						
					</div>
					
					<!-- Password Forgotten-->
					<div class="password-forgot-letter">
						비밀번호가 생각나지 않으시나요?
					</div>
					
					<!-- Login button -->
					<div class="login-btn-wrapper">
						<button class="login-btn">로그인</button>
					</div>
				</form>
			</div>
			

			<div class="login-page-register-wrapper">
				<div class="login-page-register-letter">
					파이가 처음이신가요?<br>
				</div>
				<button class="login-page-register-btn">가입하기</button>
			</div>
		</div>
	</div>
	
</body>
</html>