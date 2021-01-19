<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<script src="/resources/js/notice.js"></script>
<link rel="stylesheet" href="/resources/css/notice.css"/>
<script src='resources/summernote-0.8.18-dist/summernote-lite.js'></script>
<script src='resources/summernote-0.8.18-dist/lang/summernote-ko-KR.js'></script>
<link href='resources/summernote-0.8.18-dist/summernote-lite.css' rel='stylesheet' />
</head>

<body>
	<div id="fas fa-clipboard-list" class="right-sidebar-bookmark">
	<jsp:include page="/WEB-INF/views/notice/notice_modal.jsp"></jsp:include>
		<!-- samples -->
		<div><input type="button" id="wirte" value="글쓰기"/></div>
		<div id="noticeList">
		</div>
	</div>
</body>
</html>