
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Main</title>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/resources/css/mainStyle.css">
	<link rel="stylesheet" href="/resources/css/userEdit.css">
	<link rel="stylesheet" href="/resources/css/userEditPwdCheck.css">
	<link rel="stylesheet" href="/resources/css/userEditWithdrawal.css">
	
	<script src="/resources/js/main.js"></script>
</head>
<body>
	<!-- Top -->
	<jsp:include page="/WEB-INF/views/common/main_top.jsp"></jsp:include>
	
	<!-- userEdit modal background -->
	<div id="userEdit_modal_background"></div>
	<!-- userEdit modal -->
	<jsp:include page="/WEB-INF/views/userEdit.jsp"></jsp:include>
	<!-- userEdit_pwdCheck modal -->
	<jsp:include page="/WEB-INF/views/userEdit_pwdCheck.jsp"></jsp:include>
	<!-- userEdit_withdrawal_complete modal -->
	<jsp:include page="/WEB-INF/views/userEdit_withdrawal.jsp"></jsp:include>
	
	
	<!-- Main Page -->
	<div class="main-wrapper">
		<!-- left main profile -->
		<div class="main-profile-wrapper">
		
			<!-- profile pic -->
			<div class="main-profile-pic-wrapper">
				<i class="fas fa-user main-profile-pic"></i>
			</div>
			
			<!-- info-wrapper -->
			<div class="main-profile-inner-wrapper">
				<div class="main-profile-edit">
					<i id="user_edit" class="fas fa-edit"></i><span class="main-profile-edit-letter">회원정보 수정</span>
				</div>
				<div class="main-profile-info">
					<span class="main-profile-name">신동연</span><i class="far fa-envelope"></i><br>
					<span class="main-profile-email">dysadfasdf@gmail.com</span>
				</div>
				
				<!-- logout btn -->
				<div>
					<button class="main-profile-logout-btn">로그아웃</button>
				</div>
			</div>
		</div>
		
		<!-- Right main list -->
		<div class="main-list-wrapper">
			<!-- Project List -->
			<div class="main-list-top">
				<div class="main-list-letter">
					PIE 리스트
				</div>
				<div class="main-list-create-btn-wrapper">
					<button class="main-list-create-btn">+ 파이 생성하기</button>
				</div>
			</div>
			<div class="main-list-body">
				<!-- Project example1 -->
				<div class="main-list-project-wrapper">
					<div class="main-list-project-left-info">
						<div class="main-list-project-logo-wrapper">
							<img src="/resources/img/pie_logo.png" class="project-logo">
						</div>
						<div class="main-list-project-letter">
							<div class="main-list-project-letter1">
								3차 2조
							</div>
							<div class="main-list-project-letter2">
								bit2team.jandi.com
							</div>
							<div class="main-list-project-letter3">
								adhiofhodf@gmail.com
							</div>
						</div>
					</div>
					<div class="main-list-project-right-btn-wrapper">
						<button class="main-list-project-right-btn1">설정</button>
						<button class="main-list-project-right-btn2">PIE로 가기</button>
					</div>
				</div>
				
				<!-- Project example2 -->
				<div class="main-list-project-wrapper">
					<div class="main-list-project-left-info">
						<div class="main-list-project-logo-wrapper">
							<img src="/resources/img/pie_logo.png" class="project-logo">
						</div>
						<div class="main-list-project-letter">
							<div class="main-list-project-letter1">
								3차 2조
							</div>
							<div class="main-list-project-letter2">
								bit2team.jandi.com
							</div>
							<div class="main-list-project-letter3">
								adhiofhodf@gmail.com
							</div>
						</div>
					</div>
					<div class="main-list-project-right-btn-wrapper">
						<button class="main-list-project-right-btn1">설정</button>
						<button class="main-list-project-right-btn2">PIE로 가기</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>