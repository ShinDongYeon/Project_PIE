<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Login</title>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/resources/css/mainTopStyle.css">
	<link rel="stylesheet" href="/resources/css/registerStyle.css">
	
</head>
<body>
	<!-- Top -->
	<jsp:include page="/WEB-INF/views/common/main_top.jsp"></jsp:include>
	
	<!-- login-register left navbar -->
	<jsp:include page="loginRegisterLeftNavbar.jsp"></jsp:include>
	
	<!-- Register Page -->
	<div class="register-wrapper">
		<div class="register-contents">
			<div class="register-user-pic">
				user pic
			</div>
			
			<!-- Register Form -->
			<div class="login-form">
				<form action="">
					<div class="register-email-wrapper">
						<div class="register-email-letter">
							이메일(아이디)
						</div>
						<input type="text" class="register-email" id="email" name="email" placeholder="pie@pie.com">
						<div class="register-email-check">
							등록되지 않은 이메일입니다.
						</div>
					</div>
					<div class="register-password-wrapper">
						<div class="register-password-letter">
							비밀번호
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