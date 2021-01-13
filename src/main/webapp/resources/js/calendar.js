var id;
var title;
var start;
var end;
var allDay;
var color;
var content;
var events = [];

let today = new Date();
let hours = today.getHours();
let minutes = today.getMinutes();
function editCalendar(info) {
	id = info.event.id;
	start = info.event.start;
	end = info.event.end;
	if (info.event.allDay == true) {
		if (info.event.start !== info.event.end)
			endDate = moment(info.event.end).subtract(1, 'days')._d;
	}
	var msg;
	$.ajax({
		type: 'POST',
		data: {
			id: id,
			start: start,
			end: end
		},
		datetype: 'json',
		async: false,
		url: "calendarEdit.pie",
		success: function(data) {
		}
	})
}
function deleteCalendar(info) {
	if (info.event.extendedProps.card_seq == 0) {
		$.ajax({
			type: "POST",
			url: "calendarDelete.pie",
			data: {
				id: info.event.id
			},
			success: function(data) {
			}
		});
	} else {
		$.ajax({
			type: "POST",
			url: "calendarDelete.pie",
			data: {
				id: info.event.id
			},
			success: function(data) {
			}
		});
	}
}
var eventsFeed = function(info, successCallback, failureCallback) {
	$.ajax({
		type: "GET",
		url: "calendarList.pie",
		data: {
			project_seq: $("#projectNum").val()
		},
		dataType: 'json',
		success: function(data) {
			var fixedDate = data.map(function(array) {
				if (array.allDay === true && array.start !== array.end) {
					array.end = moment(array.end).add(1, 'days'); // 이틀 이상 AllDay 일정인 경우 달력에 표기시 하루를 더해야 정상출력
				}
				array.end = moment(array.end).format('YYYY-MM-DD' + " " + 'HH:mm')
				return array;
			})
			successCallback(fixedDate);
		}
	})
}

function editButton() {
	$('#titleView').attr("readonly", true);
	$('#startDateView').attr("readonly", true);
	$('#endDateView').attr("readonly", true);
	$('#contentView').attr("readonly", true);
	$('#allDayView').attr("disabled", true);
	$('#eventColorView').attr("disabled", true);
	$('#editCalendar').css("display", "");
	$('#okeditCalendar').css("display", "none");
	$('#editCancelCalendar').css("display", "none");
	$('#deleteCalendar').css("display", "");
	$("#startDateView, #endDateView").flatpickr({ clickOpens: false });
	$('#endDateView').val("")
	$('#titleView').val("")
	$('#contentView').val("")
}
function insertButton() {
	$('#endDate').val("")
	$('#title').val("")
	$('#content').val("")
	$('#eventColor').val("#D25565")
}
document.addEventListener('DOMContentLoaded', function() {
	var calendarEl = document.getElementById('calendar');

	var calendar = new FullCalendar.Calendar(calendarEl, {
		plugins: ['interaction', 'dayGrid', 'timeGrid', 'list', 'ui'],
		themeSystem: 'jquery-ui',
		header: {
			left: 'prev,today,next',
			center: 'title',
			right: 'dayGridMonth,listMonth'

		},
		buttonText: {
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
		eventLimit: true,
		displayEventTime: true,
  		displayEventEnd: true,
		forceEventDuration: true,
		minTime: '00:00:00',
		maxTime: '24:00:00',
		timeFormat: 'HH:mm',
		slotLabelFormat: 'HH:mm',
		dayMaxEvents: true,
		locales: 'ko',
		dateClick: function(info) {
			document.getElementById('detailsInsertModal').style.display = 'block'
			document.getElementById('calendar_modal_background').style.display = 'block';
			$('#startDate').val(info.dateStr + " " + hours + ":00")
			$("#insertCancel").unbind('click');
			$('#insertCancel').click(function() {
				insertButton()
				document.getElementById('calendar_modal_background').style.display = 'none';
			})
			$("#insertCalendar").unbind('click');
			$('#insertCalendar').click(function() {
				document.getElementById('calendar_modal_background').style.display = 'none';
				if ($("input:checkbox[name=allDay]").is(":checked") == true) {
					allDay = true
				} else {
					allDay = false
				}
				$.ajax({
					type: "POST",
					url: "calendarInsert.pie",
					data: {
						start: $('#startDate').val(),
						end: $('#endDate').val(),
						title: $('#title').val(),
						content: $('#content').val(),
						allDay: allDay,
						color: $('#eventColor').val(),
						project_seq: $("#projectNum").val(),
						card_seq: 0
					},
					success: function(data) {
						calendar.refetchEvents();
						insertButton()
					}
				})
				$.ajax({
					type: "POST",
					url: "alramLastSeq.pie",
					success: function(data) {
				let alramOb = new Object();
				alramOb.email=$("#email").val()
				alramOb.nickName=$("#nick").val()
				alramOb.title="캘린더"
				alramOb.state="등록"
				alramOb.alramTime=moment(today).format('YYYY-MM-DD' + " " + 'HH:mm')
				alramOb.project_seq=Number($("#projectNum").val())
				alramOb.alramseq = (data+1)
				let alram = JSON.stringify(alramOb);
						$.ajax({
							type: "POST",
							url: "alramInsert.pie",
							contentType: "application/json; charset=UTF-8",
							dataType: "json",
							async: false,
							data: alram,
							success: function(data) {
							socket.send("등록")
								},
							
						})

					}
				})
			})
		},
		eventDrop: function(info) {
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
					}
				});
		},
		eventResize: function(info) {
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
					}
				});

		},
		eventSources: [{
			events: eventsFeed

		}],
		eventClick: function(info) {
			document.getElementById('calendarEdit_modal_contents').style.display = 'block'
			document.getElementById('calendar_modal_background').style.display = 'block';
			start = info.event.start;
			end = info.event.end;
			title = info.event.title;
			content = info.event.extendedProps.content;
			if (info.event.allDay === true) {
				$("#allDayView").prop("checked", true)
			} else {
				$("#allDayView").prop("checked", false)
			}
			$('#eventColorView').val(info.event.borderColor)
			if (info.event.allDay === true) {
				if (info.event.start !== info.event.end)
					end = moment(info.event.end).subtract(1, 'days')._d;
			}
			$('#startDateView').val(moment(start).format('YYYY-MM-DD' + " " + 'HH:mm'));
			$('#endDateView').val(moment(end).format('YYYY-MM-DD' + " " + 'HH:mm'));
			$('#titleView').val(title);
			$('#contentView').val(content);
			$("#deleteCalendar").unbind('click');
			$('#deleteCalendar').click(function() {
				swal({
					title: "일정을 삭제하시겠습니까?",
					icon: "warning",
					buttons: true,
					dangerMode: true,
				})
					.then((willDelete) => {
						if (willDelete) {
							deleteCalendar(info)
							var event = calendar.getEventById(info.event.id);
							event.remove();
						} else {

						}
					});
			})
			$("#editCancel").unbind('click');
			$('#editCancel').click(function() {
				editButton()
				document.getElementById('calendar_modal_background').style.display = 'none';
			})
			$("#editCalendar").unbind('click');
			$('#editCalendar').click(function() {
				swal("수정이 가능합니다");
				$('#seqView').val(info.event.id)
				$('#titleView').removeAttr("readonly");
				$('#startDateView').removeAttr("readonly");
				$('#endDateView').removeAttr("readonly");
				$('#contentView').removeAttr("readonly");
				$('#allDayView').removeAttr("disabled");
				$('#eventColorView').removeAttr("disabled");
				$('#editCalendar').css("display", "none");
				$('#okeditCalendar').css("display", "");
				$('#editCancelCalendar').css("display", "");
				$('#deleteCalendar').css("display", "none");
				$("#startDateView, #endDateView").flatpickr({ enableTime: true, time_24hr: true, dateFormat: "Y-m-d H:i" }, 'disableMobile', false);
			})
			$('#editCancelCalendar').click(function() {
				document.getElementById('calendar_modal_background').style.display = 'none';
				editButton()
			})
			$("#okeditCalendar").unbind('click');
			$('#okeditCalendar').click(function() {
				document.getElementById('calendar_modal_background').style.display = 'none';
				if ($("input:checkbox[id=allDayView]").is(":checked") == true) {
					allDay = true
				} else {
					allDay = false
				}
				$.ajax({
					type: "POST",
					url: "calendarUpdate.pie",
					data: {
						id: $('#seqView').val(),
						start: $('#startDateView').val(),
						end: $('#endDateView').val(),
						title: $('#titleView').val(),
						content: $('#contentView').val(),
						allDay: allDay,
						color: $('#eventColorView').val()
					},
					success: function(data) {
						calendar.refetchEvents();
						editButton()

					}
				})

					$.ajax({
					type: "POST",
					url: "alramLastSeq.pie",
					success: function(data) {
				let alramOb = new Object();
				alramOb.email=$("#email").val()
				alramOb.nickName=$("#nick").val()
				alramOb.title="캘린더"
				alramOb.state="수정"
				alramOb.alramTime=moment(today).format('YYYY-MM-DD' + " " + 'HH:mm')
				alramOb.project_seq=Number($("#projectNum").val())
				alramOb.alramseq = (data+1)
				let alram = JSON.stringify(alramOb);
						$.ajax({
							type: "POST",
							url: "alramInsert.pie",
							contentType: "application/json; charset=UTF-8",
							dataType: "json",
							async: false,
							data: alram,
							success: function(data) {
							socket.send("등록")
								},
						})
					}
				})

			})

		}
	});

	calendar.render();
});

$(document).ready(function() {
	$("#startDate, #endDate").flatpickr({ enableTime: true, time_24hr: true, dateFormat: "Y-m-d H:i" });
	window.onclick = function(event) {
		if (event.target === document.getElementById('calendar_modal_background')) {
			editButton();
			insertButton();
			document.getElementById('calendar_modal_background').style.display = 'none';
			document.getElementById('calendarEdit_modal_contents').style.display = 'none';
			document.getElementById('detailsInsertModal').style.display = 'none';
			
		}
	}

});
