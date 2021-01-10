<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"  uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>FullCalendar</title>
<!-- calendar를 위한 lib -->

<link rel="stylesheet" href="/resources/css/calendar.css">
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/redmond/jquery-ui.css">
<link href='resources/fullcalendar/packages/core/main.css' rel='stylesheet' />
<link href='resources/fullcalendar/packages/daygrid/main.css' rel='stylesheet' />
<link href='resources/fullcalendar/packages/timegrid/main.css' rel='stylesheet' />
<link href='resources/fullcalendar/packages/list/main.css' rel='stylesheet' />
<script src='resources/fullcalendar/packages/core/main.js'></script>
<script src='resources/fullcalendar/packages/core/locales/ko.js'></script>
<script src='resources/fullcalendar/packages/interaction/main.js'></script>
<script src='resources/fullcalendar/packages/daygrid/main.js'></script>
<script src='resources/fullcalendar/packages/timegrid/main.js'></script>
<script src='resources/fullcalendar/packages/list/main.js'></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.0/moment.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
	<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<script src="/resources/js/calendar.js"></script>
<!--  -->

<style>
/* 	body{
		font-size: initial;
		line-height: initial;
	} */
  #calendar {
    max-width: 900px;
    margin: 0 auto;
    margin-top: 1%;
	background-color: rgba( 255, 255, 255, 0.8 );	 
   	border-radius: 5px;
   	box-shadow: 0px 0px 20px rgba( 255, 255, 255, 0.8 );
  }
  .fc-right {
  	position: relative;
  	top: -2px;
  }
   .fc-today{
   background:rgba( 255, 255, 255, 0.5 )! important;
}
.fc-unthemed .fc-today {
  background:rgba( 255, 255, 255, 0.5 )! important;
}
.fc-unthemed td.fc-today {
  background:rgba( 255, 255, 255, 0.5 )! important;
}
</style>
</head>
<body>

<div id="calendar"> </div>
<jsp:include page="/WEB-INF/views/common/calendar_modal.jsp"></jsp:include>
</body>
</html>