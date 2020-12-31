<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>pwdForgot reset</title>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/resources/css/pwdForgotResetStyle.css">
	
</head>
<body>
	<!-- Top -->
	<jsp:include page="/WEB-INF/views/common/main_top.jsp"></jsp:include>
	
	<!-- login-register left navbar -->
	<jsp:include page="common/loginRegisterLeftNavbar.jsp"></jsp:include>
	
	<!-- Register emailRequest Page -->
	<div class="pwdForgot-reset-wrapper">
		<div class="pwdForgot-reset-contents">
			<!-- pwdForgot reset message1 -->
			<div class="pwdForgot-reset-message1">
				비밀번호 재설정
			</div>
			
			<!-- pwdForgot reset message2 -->
			<div class="pwdForgot-reset-message2">
				새로 등록할 비밀번호를 입력해주세요.
			</div>
			
			
			<!-- pwdForgot reset pwd -->
			<div class="pwdForgot-reset-pwd-form">
				<form action="">
					<!-- 비밀번호 입력 -->
					<div class="pwdForgot-reset-pwd-wrapper">
						<div class="pwdForgot-reset-pwd-letter">
							비밀번호
						</div>
						<input type="text" class="pwdForgot-reset-pwd" id="pwd" name="pwd">
						<div class="pwdForgot-reset-pwd-check">
							영문, 숫자, 특수문자 포함 8~16글자
						</div>
					</div>
					
					<!-- 비밀번호 재입력 -->
					<div class="pwdForgot-reset-pwd-wrapper">
						<div class="pwdForgot-reset-pwd-letter">
							비밀번호 재입력
						</div>
						<input type="text" class="pwdForgot-reset-pwd" id="pwdCheck" name="pwdCheck">
						<div class="pwdForgot-reset-pwd-check">
							비밀번호가 일치하지 않습니다.
						</div>
					</div>
				</form>
			</div>
			
			
			<!-- pwdForgot reset button -->
			<div class="pwdForgot-reset-btn-wrapper">
				<button class="pwdForgot-reset-btn">확인</button>
			</div>
		</div>
	</div>
	
</body>
</html>