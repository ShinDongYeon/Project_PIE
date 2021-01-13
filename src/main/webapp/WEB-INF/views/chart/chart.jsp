<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
<script src="<c:url value="/resources/js/chart.js"/>"></script>
<link rel="stylesheet" href="/resources/css/chart.css">
</head>
<body>
<%-- ${sessionScope.projectNum} --%>
<!-- whole wrapper -->
<div class = "whole-chart-wrapper">

	<!-- chart-1 -->
	<div class = "chart-1-wrapper">
		<canvas id="chart-1"></canvas>
	</div>
	
	<!-- chart-1 -->
	<div class = "chart-2-wrapper">
		<canvas id="chart-2"></canvas>
	</div>
	
</div>

</body>
</html>