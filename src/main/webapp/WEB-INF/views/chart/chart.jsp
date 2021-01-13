<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js" 
integrity="sha512-d9xgZrVZpmmQlfonhQUvTR7lMPtO7NkZMkA0ABN3PHCbKA5nqylQ/yWlFAyY6hYgdF1Qh6nYiuADWwKB4C2WSw==" 
crossorigin="anonymous"></script>
<script src="<c:url value="/resources/js/chart.js"/>"></script>
<link rel="stylesheet" href="/resources/css/chart.css">
</head>
<body>
<%-- ${sessionScope.projectNum} --%>
<!-- whole wrapper -->
<div class = "whole-chart-wrapper">

	<!-- chart-1 -->
	<div class = "chart-1-wrapper">
		<div class = 'chart-letter-wrapper'>
			<span>hi</span>
		</div>
		<canvas id="chart-1"></canvas>
	</div>
	
	<!-- chart-2 -->
	<div class = "chart-2-wrapper">
		<div class = 'chart-letter-wrapper'>
			<span>hi</span>
		</div>
		<canvas id="chart-2"></canvas>
	</div>
	
	<!-- chart-3 -->
	<div class = "chart-3-wrapper">
		<div class = 'chart-letter-wrapper'>
			<span>hi</span>
		</div>
		<canvas id="chart-3"></canvas>
	</div>
	
	<!-- chart-4 -->
	<div class = "chart-4-wrapper">
		<div class = 'chart-letter-wrapper'>
			<span>hi</span>
		</div>
		<canvas id="chart-4"></canvas>
	</div>
	
</div>

</body>
</html>