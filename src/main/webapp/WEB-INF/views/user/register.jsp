<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Login</title>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/resources/css/registerStyle.css">
	
</head>
<body>
	<!-- Top -->
	<jsp:include page="/WEB-INF/views/common/main_top.jsp"></jsp:include>
	
	<!-- login-register left navbar -->
	<jsp:include page="/WEB-INF/views/common/loginRegisterLeftNavbar.jsp"></jsp:include>
	
	<!-- Register Page -->
	<div class="register-wrapper">
		<div class="register-contents">
			<div class="register-user-pic-wrapper">
				<div class="register-user-pic">
					<i class="fas fa-user"></i>		
				</div>
				<div class="register-user-pic-select-wrapper">
					<i class="fas fa-camera"></i>
				</div>
			</div>
			
			<!-- Register Form -->
			<div class="register-form">
				<form action="">
					<!-- 아이디 입력 -->
					<div class="register-email-wrapper">
						<div class="register-email-letter">
							이메일(아이디)
						</div>
						<input type="text" class="register-email" id="email" name="email" placeholder="pie@pie.com">
						<div class="register-email-check">
							등록되지 않은 이메일입니다.
						</div>
					</div>
					
					<!-- 이름 입력 -->
					<div class="register-name-wrapper">
						<div class="register-name-letter">
							이름
						</div>
						<input type="text" class="register-name" id="name" name="name">
					</div>
					
					<!-- 비밀번호 입력 -->
					<div class="register-password-wrapper">
						<div class="register-password-letter">
							비밀번호
						</div>
						<input type="text" class="register-password" id="pwd" name="pwd" placeholder="">	
						<div class="register-password-check">
							영문, 숫자, 특수문자 포함 8~16글자
						</div>					
					</div>
					
					<!-- 비밀번호 재입력 -->
					<div class="register-password-wrapper">
						<div class="register-password-letter">
							비밀번호 재입력
						</div>
						<input type="text" class="register-password" id="pwd" name="pwd" placeholder="">	
						<div class="register-password-check">
							비밀번호가 일치하지 않습니다.
						</div>					
					</div>
					
					<!-- Register button -->
					<div class="register-btn-wrapper">
						<button class="register-btn">완료</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	
</body>
</html>