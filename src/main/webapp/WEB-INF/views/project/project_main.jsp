<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>project main</title>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/resources/css/projectMainStyle.css">
	<link rel="stylesheet" href="/resources/css/projectChatCreateStyle.css">
	<script src="/resources/js/projectMainTop.js"></script>
	<script src="/resources/js/projectSidebar.js"></script>
	<script src="/resources/js/projectMainChat.js"></script>
	<script src="/resources/js/logonWebSocket.js"></script>
</head>
<body>
	<!-- projectNum(Sequence) -->
	<input type = "hidden" id = "projectNum" value = "${sessionScope.projectNum}">
	<input type = "hidden" id = "nick" value = "${sessionScope.nick}">
	<input type = "hidden" id = "email" value = "${sessionScope.loginuser}">

	<!-- Top -->
	<jsp:include page="/WEB-INF/views/common/project_main_top.jsp"></jsp:include>
	
	<div class="project-main-wrapper">
		<!-- right sidebar -->
		<jsp:include page="/WEB-INF/views/common/project_main_sidebar.jsp"></jsp:include>
		
		<!-- right sidebar contents -->
		<div id="right-sidebar-contents-wrapper" class="right-sidebar-contents-wrapper-hidden">
			<!-- bookmark -->
			<jsp:include page="/WEB-INF/views/main-sidebar-options/project_main_bookmark.jsp"></jsp:include>
			
			<!-- alarm -->
			<jsp:include page="/WEB-INF/views/main-sidebar-options/project_main_alarm.jsp"></jsp:include>
			
			<!-- file -->
			<jsp:include page="/WEB-INF/views/main-sidebar-options/project_main_file.jsp"></jsp:include>
			
			<!-- chat -->
			<jsp:include page="/WEB-INF/views/main-sidebar-options/project_main_chat.jsp"></jsp:include>
			
			<!-- users -->
			<jsp:include page="/WEB-INF/views/main-sidebar-options/project_main_users.jsp"></jsp:include>
		</div>
		<!-- main body -->
		<div class="project-main-body-wrapper" id="kanban" style="display: block">
			<jsp:include page="/WEB-INF/views/kanban/kanban-board.jsp"></jsp:include>		
		</div>
		
	</div>
		
</body>
</html>