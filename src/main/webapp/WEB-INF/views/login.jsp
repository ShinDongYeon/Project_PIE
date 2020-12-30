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
	
	<!-- login left navbar -->
	<jsp:include page="loginRegisterLeftNavbar.jsp"></jsp:include>
	
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
							이메일(아이디)
						</div>
						<input type="text" class="login-email" id="email" name="email" placeholder="pie@pie.com">
						<div class="login-email-check">
							등록되지 않은 이메일입니다.
						</div>
					</div>
					<div class="login-password-wrapper">
						<div class="login-password-letter">
							비밀번호
						</div>
						<input type="text" class="login-password" id="pwd" name="pwd" placeholder="">	
						<div class="login-password-check">
							비밀번호가 일치하지 않습니다.
						</div>					
					</div>
					
					<!-- Login button -->
					<div class="login-btn-wrapper">
						<button class="login-btn">로그인</button>
						<div class="login-btn-check">
							이메일 또는 비밀번호가 일치하지 않습니다.
						</div>
					</div>
				</form>
			</div>
			

			<div class="login-page-register-wrapper">
				<div class="login-page-register-letter-wrapper">
					<div class="login-page-register-letters">
						<span>회원가입</span> | <span>비밀번호 찾기</span>
					</div>
					<div class="login-page-register-letter-social">
						소셜 로그인
					</div>
				</div>
				<div class="login-page-register-btn">
					<img src="/resources/img/naver_logo.png">
					<img src="/resources/img/google_logo.png">
				</div>
			</div>
		</div>
	</div>
	
</body>
</html>