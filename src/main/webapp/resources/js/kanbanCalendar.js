var id;
var title;
var start;
var end;
var allDay;
var color;
var content;
var events=[];
let today = new Date();
let hours = today.getHours();
let minutes = today.getMinutes();
$(document).ready(function() {
	function editButton(){
			$('#titleView').attr("readonly",true);
			 $('#startDateView').attr("readonly",true);
			 $('#endDateView').attr("readonly",true);
			 $('#contentView').attr("readonly",true);
			 $('#allDayView').attr("disabled",true);
			 $('#eventColorView').attr("disabled",true);
			 $('#editCalendar').css("display","");
			 $('#okeditCalendar').css("display","none");
			 $('#okeditCalendarDiv').css("display","none");
			 $('#deleteCalendar').css("display","");
			    $("#startDateView, #endDateView").flatpickr({clickOpens:false});
		     	$('#endDateView').val("")
               	$('#titleView').val("")
               	$('#contentView').val("")
			}
		function insertButton(){
           	$('#endDate').val("")
           	$('#title').val("")
           	$('#content').val("")
           	$('#eventColor').val("#D25565")	
			}
$('.setDueDateBtn').click(function(){
	document.getElementById('calendarInsert_modal_contents').style.display='block'
       	document.getElementById('calendar_modal_background').style.display = 'block';
          //$('#startDate').val(info.dateStr + " "+hours+":00")
     
          $("#insertCancelKanBan").unbind('click');
          $('#insertCancelKanBan').click(function(){
        	  insertButton()			
        	  document.getElementById('calendar_modal_background').style.display = 'none';
				})
		$("#insertCalendarKanBan").unbind('click');		
		$('#insertCalendarKanBan').click(function(){
			console.log("인서트하자")
			 document.getElementById('calendar_modal_background').style.display = 'none';
			  if($("input:checkbox[name=allDay]").is(":checked") == true) {
				  allDay=true
				}else{
					allDay=false
					}
		  $.ajax({  
					type : "POST",
					url  : "calendarInsert.pie",
					data:{
						start:$('#startDate').val(),
						end:$('#endDate').val(),
						title:$('#title').val()+"(칸반)",
						content:$('#content').val(),
						allDay:allDay,
						color:$('#eventColor').val(),
						project_seq:$("#projectNum").val(),
						card_seq:$(".modal_card_seq").val()
						},
					success : function(data){	
						insertButton()		
					}
			  })
				  	var alram = {
			  	
			  		email:$("#email").val(),
			  		nick:$("#nick").val(),
					title:"캘린더",
					state:"등록",
					alramTime: moment(today).format('YYYY-MM-DD'+" "+'HH:mm'),
					project_seq:$("#projectNum").val(),
					}
					socket.send(JSON.stringify(alram))	
			})
			});


 $("#startDate, #endDate").flatpickr({enableTime: true,time_24hr: true, dateFormat: "Y-m-d H:i"});
 window.onclick = function(event) {
	if(event.target == document.getElementById('calendar_modal_background')) {
		editButton();
		insertButton();
		document.getElementById('calendar_modal_background').style.display = 'none';
		document.getElementById('calendarEdit_modal_contents').style.display= 'none';
		document.getElementById('calendarInsert_modal_contents').style.display = 'none';
	}
}    

});