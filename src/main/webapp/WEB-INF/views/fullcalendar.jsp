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

<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
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
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.0/moment.min.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<!--  -->
<script type="text/javascript">
var id;
var title;
var start;
var end;
var allDay;
var color;
var content;
var events=[];
 function editCalendar(info){
	id = info.event.id;
	start = info.event.start;
	end = info.event.end;
	if (info.event.allDay == true) {
		if(info.event.start !== info.event.end)
		endDate = moment(info.event.end).subtract(1, 'days')._d;
	
      }
	var msg;
	$.ajax({
		type:'POST',
		data:{
			id:id,
			start:start,
			end:end
			},
			datetype:'json',
			async:false,
			url:"calendarEdit.pie",
			success: function(data){
				
				}
		})
	 }
	function deleteCalendar(info){
			
		   	$.ajax({  
				type : "POST",
				url  : "calendarDelete.pie",
				data : {
						id:info.event.id
					},
				success : function(data){
					
				}   
		});	
		}
	var eventsFeed = function(info, successCallback, failureCallback){
		$.ajax({  
			type : "GET",
			url  : "calendarList.pie",
			dataType:'json',
			success : function(data){	
				console.log(data)
			/* 	$.each(data,function(index,value){
					id = value.seq
					title = value.title
					start = value.startDate
					end = value.endDate
					allDay = value.allDay
					color = value.eventColor
					content = value.content
					if (value.allDay == true) {
						if(value.startDate !== value.endDate)
						end = moment(value.endDate).add(1, 'days')._d;
					
			          }			
					events.push({
					id: id,
					title: title,
					start: start,
					end: end,
					color:color,
					allDay: allDay,
					content: value.content
					});								
						}) */
				
						successCallback(data);
			}
		 });
		
}
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
/*         	left   : 'today, prevYear, nextYear, viewWeekends',
            center : 'prev, title, next',
            right  : 'month, agendaWeek, agendaDay, listWeek' */
      },
      buttonText:{
		today: '오늘',
		month: '월',
		week: '주',
		day: '일',
		list: '주간 일정표'
          },
      selectable: true, //클릭 및 드래그 선택 기능
      selectMirror: true, //???
      navLinks: true, // can click day/week names to navigate views
      businessHours: true, // display business hours
      editable: true,
      eventLimit:true,
      forceEventDuration:true,
      minTime : '00:00:00',
      maxTime : '24:00:00',
      timeFormat : 'HH:mm',
      dayMaxEvents: true,
      locales:'ko',
	  dateClick: function(info) {
        let today = new Date();
        let hours = today.getHours();
        let minutes =today.getMinutes();
        document.getElementById('schedulerInsert').style.display='block'
          $('#startDate').val(info.dateStr +" "+ hours+":"+ "00")
          $('#insertCancel').click(function(){
					$('#endDate').val("")
					$('#title').val("")
					$('#content').val("")
					$('#eventColor').val("#D25565")					
				})
		  $('#insertCalendar').click(function(){			  
			  if($("input:checkbox[name=allDay]").is(":checked") == true) {
				  allDay=true
				}else{
					allDay=false
					}
			  $.ajax({  
					type : "POST",
					url  : "calendarInsert.pie",
					dataType:'json',
					data:{
						start:$('#startDate').val(),
						end:$('#endDate').val(),
						title:$('#title').val(),
						content:$('#content').val(),
						allDay:allDay,
						eventColor:$('#eventColor').val()
						},
					success : function(data){

						//calendar.removeAllEvents();
	                   	calendar.refetchEvents();
					}
			  })
		  })
        },
        eventDrop: function(info){
        	 swal({
       		  title: "일정을 변경하시겠습니까?",
       		  icon: "warning",
       		  buttons: true,
       		  dangerMode: true,
       		})
       		.then((willDelete) => {
       		  if (willDelete) {
       			var msg = editCalendar(info);
       		  } else {
       			  info.revert();
       		    //swal("Your imaginary file is safe!");
       		  }
       		});
            },
         eventResize:function(info){
        	 swal({
        		  title: "일정을 변경하시겠습니까?",
        		  icon: "warning",
        		  buttons: true,
        		  dangerMode: true,
        		})
        		.then((willDelete) => {
        		  if (willDelete) {
        			var msg = editCalendar(info);
        		  } else {
        			  info.revert();
        		    //swal("Your imaginary file is safe!");
        		  }
        		});

             },
             eventSources:[{
        events:eventsFeed
             }],
    eventClick: function(info){        		
				document.getElementById('schedulerView').style.display='block'
					start = info.event.start;
					end = info.event.end;
					title = info.event.title;
					content = info.event.extendedProps.content;
					if (info.event.allDay == true) {
						if(info.event.start !== info.event.end)
						end = moment(info.event.end).subtract(1, 'days')._d;
				      }
				$('#startDateView').val(moment(start).format('YYYY-MM-DD'+" "+'HH:mm'));
				$('#endDateView').val(moment(end).format('YYYY-MM-DD'+" "+'HH:mm'));
				$('#titleView').val(title);
				$('#contentView').val(content);
				
				
				$('#deleteCalendar').click(function(){
					 swal({
				  		  title: "일정을 삭제하시겠습니까?",
				  		  icon: "warning",
				  		  buttons: true,
				  		  dangerMode: true,
				  		})
				  		.then((willDelete) => {
				  		  if (willDelete) {
				  			deleteCalendar(info)
				  		var event=calendar.getEventById(info.event.id);
				  			event.remove();
				  			 //calendar.refetchEvents();
				  		  } else {
		
				  		  }
				  		});
					
				})
				
				$('#editCalendar').click(function(){
					console.log(info.event.id)
					swal("수정이 가능합니다");
					 $('#seqView').val(info.event.id)
					 $('#titleView').removeAttr("readonly");
					 $('#startDateView').removeAttr("readonly");
					 $('#endDateView').removeAttr("readonly");
					 $('#contentView').removeAttr("readonly");
					 $('#editCalendar').css("display","none");
					 $('#okeditCalendar').css("display","");
					 $('#editCancel').css("display","")
					 $('#okCalendar').css("display","none");
					 $('#deleteCalendar').css("display","none");					
					})

				$('#editCancel').click(function(){
				$('#titleView').attr("readonly");
					 $('#startDateView').attr("readonly");
					 $('#endDateView').attr("readonly");
					 $('#contentView').attr("readonly");
					 $('#editCalendar').css("display","");
					 $('#okeditCalendar').css("display","none");
					 $('#editCancel').css("display","none")
					 $('#okCalendar').css("display","");
					 $('#deleteCalendar').css("display","");	
				})	 			
    }
    });

   calendar.render();
  });

$(document).ready(function(){
	$("#startDate, #endDate").flatpickr({enableTime: true,time_24hr: true, dateFormat: "Y-m-d H:i"});
	});

</script>
<style>
	body{
		font-size: initial;
		line-height: initial;
	}
   .calendarbody {
    margin: 40px 10px;
    padding: 0;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 14px;
  }

  #calendar {
    max-width: 900px;
    margin: 0 auto;
    background-color: white;
  }

  .w3-modal-content{
  width:25%;
  height: 50%; 
  }
  
  #deleteCalendar , #editCalendar, #insertCalendar, #insertCancel, #okeditCalendar,#editCancel{
  margin:10px;
  }
  #okCalendar{
  margin:10px 10px 10px 0;
  }


  .w3-row{
  height:15%;
  }
  .schedulerBody{
  height:75%;
  }



</style>
</head>
<body>
<div class="calendarbody">
<div id="calendar"> </div>


 <!-- The Modal -->
 <%--  <form action ="${pageContext.request.contextPath}/calendarInsert.pie" method ="post"> --%> 
  <div class="w3-modal" id="schedulerInsert">
      <div class="w3-modal-content w3-card-4 w3-animate-zoom schedulerHead">      
      <header class="w3-container modalhead"> 
          <h4 class="modal-title">일정추가</h4>
         </header>
      
        <div class="w3-container schedulerBody">		      
         <div class="w3-row">
         
         <div class="w3-col m12"><label class="w3-col m2 ">AllDay</label><input style="margin-top:5px;" class="w3-col m1" type="checkbox" id="allDay" name="allDay" /></div><br>
         </div>
         <div class="w3-row">
         <div class="w3-col m12"><label class="w3-col m2">일정명</label><input class="w3-col m10" type='text'name="title" id="title"/></div><br>
         </div>
         <div class="w3-row">
         <div class="w3-col m12"><label class="w3-col m2">시작일</label><input class="w3-col m10" type='text' name="start" id="startDate" autocomplete="off"/></div><br>
         </div>
         <div class="w3-row">
         <div class="w3-col m12"><label class="w3-col m2">종료일</label><input class="w3-col m10" type='text'name="end" id="endDate" autocomplete="off"/></div><br>
         </div>
         <div class="w3-row">
         <div class="w3-col m12"><label class="w3-col m2">내용</label><input class="w3-col m10" type='text'name="content" id="content" autocomplete="off"/></div><br>
         </div>
         <div class="w3-row">
         <div class="w3-col m12"><label class="w3-col m2">색상</label>
         		<select class="w3-col m10" name="color" id="eventColor">
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
             <div class="w3-row">
        	<input class="w3-btn w3-border w3-border-blue w3-round-large w3-display-bottomleft" 
        	onclick="document.getElementById('schedulerInsert').style.display='none'" id="insertCalendar"type ="submit" value ="등록"> 
        	
        	<input class="w3-btn w3-border w3-border-red w3-round-large w3-display-bottomright" 
        	onclick="document.getElementById('schedulerInsert').style.display='none'" type ="button" id="insertCancel"value ="취소"> 
            </div>
      </div>
  </div>
  </div>
   <%-- </form>  --%> 
   
    <form action ="${pageContext.request.contextPath}/calendarUpdate.pie" method ="post"> 
   <div class="w3-modal" id="schedulerView">
       <div class="w3-modal-content w3-card-4 w3-animate-zoom">      
      <header class="w3-container"> 
          <h4 class="modal-title">일정보기</h4>
          
         </header>               
        <div class="w3-container schedulerBody">
         <div class="w3-row">
         <div class="w3-col m12"><label class="w3-col m2">일정명</label><input class="w3-col m10" type='text'name="title" id="titleView" readonly/></div><br>
         </div>
         <div class="w3-row">
         <div class="w3-col m12"><label class="w3-col m2">시작일</label><input class="w3-col m10" type='text' name="start" id="startDateView" readonly/></div><br>
         </div>
         <div class="w3-row">
         <div class="w3-col m12"><label class="w3-col m2">종료일</label><input class="w3-col m10" type='text'name="end"  id="endDateView" readonly/></div><br>
         </div>
         <div class="w3-row">
         <div class="w3-col m12"><label class="w3-col m2">내용</label><input class="w3-col m10" type='text'name="content" id="contentView" readonly/></div><br>
         </div>
         <input type="text" name="seq" id="seqView" hidden/>  
        </div>   
        <div class="w3-row">
        <input class="w3-btn w3-border w3-border-blue w3-round-large w3-display-bottomleft" type ="submit" id="okeditCalendar" 
      		value ="완료" style="display:none;">
      	<input class="w3-btn w3-border w3-border-blue w3-round-large w3-display-bottomleft" type ="button" id="editCalendar"value ="수정">
      	<input class="w3-btn w3-border w3-border-black w3-round-large w3-display-bottommiddle" 
      		onclick="document.getElementById('schedulerView').style.display='none'" type ="button" id="okCalendar"value ="확인">
        <input class="w3-btn w3-border w3-border-red w3-round-large w3-display-bottomright" 
        onclick ="document.getElementById('schedulerView').style.display='none'" type ="button" id="deleteCalendar" value ="삭제"> 
        <input class="w3-btn w3-border w3-border-red w3-round-large w3-display-bottomright" 
        onclick="document.getElementById('schedulerView').style.display='none'" type ="button" id="editCancel" value ="취소" style="display:none;"> 
           

      </div>
      </div>
  </div>
</form>
</div>
</body>
</html>