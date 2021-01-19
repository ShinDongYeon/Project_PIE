$(document).ready(function() {
	//칸반 페이지 이동
	$('#sidebar-kanban').click(function() {
		location.href = "goToMain.pie?projectNum=" + $("#projectNum").val();
	});

	//캘린더 페이지 이동
	$('#sidebar-calendar').click(function() {
		location.href = "fullcalendar.htm";
	});

	//차트 페이지 이동
	$('#sidebar-chart').click(function() {
		location.href = "chart.pie?projectNum=" + $("#projectNum").val();
	});
	
	//현재 사이드바 태그
	let currentSideBar = null;

	//즐겨찾기 사이드바 오픈
	$('#sidebar-star').click(function() {
		sideBarOpen("right-sidebar-contents-wrapper-bookmark");
	});

	//알람 사이드바 오픈
	$('#sidebar-bell').click(function() {
		sideBarOpen("right-sidebar-contents-wrapper-alarm");
	});

	//파일 사이드바 오픈
	$('#sidebar-file').click(function() {
		sideBarOpen("right-sidebar-contents-wrapper-file");
	});

	//채팅 사이드바 오픈
	$('#sidebar-chat').click(function() {
		sideBarOpen("right-sidebar-contents-wrapper-chat");
	});

	//멤버 사이드바 오픈
	$('#sidebar-users').click(function() {
		sideBarOpen("right-sidebar-contents-wrapper-users");
	});
	
	//사이드바 오픈 함수
	function sideBarOpen(clickedBtnId) {
		if (currentSideBar === document.getElementById(clickedBtnId)) {
			currentSideBar.className = "right-sidebar-contents-wrapper-hidden";
			currentSideBar = null;
		}else if(currentSideBar === null){
			currentSideBar = document.getElementById(clickedBtnId);
			document.getElementById(clickedBtnId).className = "right-sidebar-contents-wrapper-display";
		}else {
			currentSideBar.className = "right-sidebar-contents-wrapper-hidden";
			currentSideBar = document.getElementById(clickedBtnId);
			document.getElementById(clickedBtnId).className = "right-sidebar-contents-wrapper-display";
		}
	}


});



