<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<div id="calendar_modal_background"></div>
 <!-- The Modal -->
 <div id="calendarInsert_modal_contents" class="calendar-contents-wrapper">
		<!-- userEdit title -->
		<div class="calendar-title">
			일정 등록
		</div>
		<!-- userEdit password -->
		<div class="calendar-outer-wrapper">
				<!-- 비밀번호 입력 -->
				<div class="calendar-inner-wrapper">
					<div class="calendar-letter">
						allDay
						<input class="" type="checkbox" id="allDay" name="allDay"/>
					</div>					
				</div>
				<div class="calendar-inner-wrapper">
					<div class="calendar-letter">
						일정명
					</div>
					<input type="text" class="calendar-input" id="title" name="title">
				</div>
				<div class="calendar-inner-wrapper">
					<div class="calendar-letter">
						시작일
					</div>
					<input type="text" class="calendar-input" id="startDate" name="start">
				</div>
				<div class="calendar-inner-wrapper">
					<div class="calendar-letter">
						종료일
					</div>
					<input type="text" class="calendar-input" id="endDate" name="end">
				</div>
				<div class="calendar-inner-wrapper">
					<div class="calendar-letter">
						내용
					</div>
					<input type="text" class="calendar-input" id="content" name="content">
				</div>
				<div class="calendar-inner-wrapper">
					<div class="calendar-letter">
						색상
					</div>
					<select class="calendar-input" name="color" id="eventColor">
             	<option value="#D25565" style="color:#D25565;" >빨간색</option>
	             <option value="#9775fa" style="color:#9775fa;" >보라색</option>
	             <option value="#ffa94d" style="color:#ffa94d;" >주황색</option>
	             <option value="#74c0fc" style="color:#74c0fc;" >파란색</option>
	             <option value="#f06595" style="color:#f06595;" >핑크색</option>
	             <option value="#63e6be" style="color:#63e6be;" >연두색</option>
	             <option value="#a9e34b" style="color:#a9e34b;" >초록색</option>
	             <option value="#4d638c" style="color:#4d638c;" >남색</option>
	             <option value="#495057" style="color:#495057;" >검정색</option>
            	</select>
				</div>
				
				  
		</div>
		
		<!-- x버튼 -->
		<div class="calendar-main-withdrawal-wrapper">
			<span id='insertCancel' class="calendar-main-withdrawal-btn"onclick="document.getElementById('calendarInsert_modal_contents').style.display='none'">&times;</span>
		</div>
		
		<!-- calendarEdit btn -->
		<div class="calendar-btn-wrapper">
			<button class="calendar-btn" id="insertCalendar" 
			onclick="document.getElementById('calendarInsert_modal_contents').style.display='none'" >등록</button>
		</div>
	</div>

<div id="calendarEdit_modal_contents" class="calendar-contents-wrapper">
		<!-- userEdit title -->
		<div class="calendar-title">
			일정 수정
		</div>
		<!-- userEdit password -->
		<div class="calendar-outer-wrapper">
				<div class="calendar-inner-wrapper">
					<div class="calendar-letter">
						allDay
						<input class="" type="checkbox" id="allDayView" name="allDayView" disabled />
					</div>					
				</div>
				<div class="calendar-inner-wrapper">
					<div class="calendar-letter">
						일정명
					</div>
					<input type="text" class="calendar-input" id="titleView" name="title" readonly/>
				</div>
				<div class="calendar-inner-wrapper">
					<div class="calendar-letter">
						시작일
					</div>
					<input type="text" class="calendar-input" id="startDateView" name="start" readonly/>
				</div>
				<div class="calendar-inner-wrapper">
					<div class="calendar-letter">
						종료일
					</div>
					<input type="text" class="calendar-input" id="endDateView" name="end" readonly/>
				</div>
				<div class="calendar-inner-wrapper">
					<div class="calendar-letter">
						내용
					</div>
					<input type="text" class="calendar-input" id="contentView" name="content" readonly/>
				</div>
				<div class="calendar-inner-wrapper">
					<div class="calendar-letter">
						색상
					</div>
					<select class="calendar-input" name="color" id="eventColorView" disabled >
             			 <option value="#D25565" style="color:#D25565;" >빨간색</option>
			             <option value="#9775fa" style="color:#9775fa;" >보라색</option>
			             <option value="#ffa94d" style="color:#ffa94d;" >주황색</option>
			             <option value="#74c0fc" style="color:#74c0fc;" >파란색</option>
			             <option value="#f06595" style="color:#f06595;" >핑크색</option>
			             <option value="#63e6be" style="color:#63e6be;" >연두색</option>
			             <option value="#a9e34b" style="color:#a9e34b;" >초록색</option>
			             <option value="#4d638c" style="color:#4d638c;" >남색</option>
			             <option value="#495057" style="color:#495057;" >검정색</option>
		            </select>
				</div>
				<input type="text" name="id" id="seqView" hidden/>
		</div>
		
		<!-- x버튼 -->
		<div class="calendar-main-withdrawal-wrapper">
<!-- 			<button id="editCancel" class="calendar-main-withdrawal-btn"
			onclick="document.getElementById('calendarEdit_modal_contents').style.display='none'">X</button> -->
			<span id='editCancel' class="calendar-main-withdrawal-btn"onclick="document.getElementById('calendarEdit_modal_contents').style.display='none'">&times;</span>
		</div>
		
		<!-- calendarEdit btn -->
		<div class="calendar-btn-wrapper">
			<button class="calendar-btn" id="editCalendar">수정</button>
		</div>
		<div class="calendar-btn-wrapper" id="okeditCalendarDiv"style="display:none;">
			<button class="calendar-btn" id="okeditCalendar"
			onclick="document.getElementById('calendarEdit_modal_contents').style.display='none'" style="display:none;">완료</button>
		</div>
	</div>

</body>
</html>