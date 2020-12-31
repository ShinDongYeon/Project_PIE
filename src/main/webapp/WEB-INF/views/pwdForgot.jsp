<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Login</title>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/resources/css/pwdForgotStyle.css">
	
</head>
<body>
	<!-- Top -->
	<jsp:include page="/WEB-INF/views/common/main_top.jsp"></jsp:include>
	
	<!-- login-register left navbar -->
	<jsp:include page="common/loginRegisterLeftNavbar.jsp"></jsp:include>
	
	<!-- Register emailRequest Page -->
	<div class="pwdForgot-wrapper">
		<div class="pwdForgot-contents">
			<!-- pwdForgot message1 -->
			<div class="pwdForgot-message1">
				비밀번호 찾기
			</div>
			
			<!-- pwdForgot message2 -->
			<div class="pwdForgot-message2">
				가입 시 등록한 이메일을 입력해주세요.
			</div>
			
			
			<!-- pwdForgot email -->
			<div class="pwdForgot-email-form">
				<form action="">
					<!-- 아이디 입력 -->
					<div class="pwdForgot-email-wrapper">
						<div class="pwdForgot-email-letter">
							이메일(아이디)
						</div>
						<input type="text" class="pwdForgot-email" id="email" name="email" placeholder="pie@pie.com">
						<div class="pwdForgot-email-check">
							등록되지 않은 이메일입니다.
						</div>
					</div>
				</form>
			</div>
			
			<!-- pwdForgot button -->
			<div class="pwdForgot-btn-wrapper">
				<button class="pwdForgot-btn">확인</button>
			</div>
		</div>
	</div>
	
</body>
</html>