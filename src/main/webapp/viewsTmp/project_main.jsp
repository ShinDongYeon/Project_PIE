<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>test page</title>
	<jsp:include page="/common/head.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="/resources/css/projectMainStyle.css">
	<script src="/resources/js/projectMainTop.js"></script>
	<script src="/resources/js/projectSidebar.js"></script>
</head>
<body>
	<jsp:include page="/common/project_main_top.jsp"></jsp:include>
	<div class="project-main-wrapper">
		<!-- right sidebar -->
		<jsp:include page="/common/project_main_sidebar.jsp"></jsp:include>
		
		<!-- right sidebar contents -->
		<div id="right-sidebar-contents-wrapper" class="right-sidebar-contents-wrapper-hidden">
			<div id="fas fa-star" class="right-sidebar-star">
				즐겨찾기창
			</div>
			<div id="far fa-bell" class="right-sidebar-bell">
				bell창
			</div>
			<div id="far fa-folder-open" class="right-sidebar-file">
				file창
			</div>
			<div id="far fa-comment-dots" class="right-sidebar-chat">
				채팅창
			</div>
			<div id="fas fa-calendar-alt" class="right-sidebar-calendar">
				캘린더창
			</div>
			<div id="fas fa-users" class="right-sidebar-users">
				사용자창
			</div>
		</div>
		<!-- main body -->
		<div class="project-main-body-wrapper">
			<div style="background-color: red;">
				asdf
			</div>
		</div>
	</div>
	
</body>
</html>