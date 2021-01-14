$(document).ready(function() {
	
	let project_seq = Number($("#projectNum").val());
	
	let chart1 = document.getElementById('chart-1');
	let cht1 = new Chart(chart1, {
		type: 'bar',
		data: {
			labels: ['리스트', '카드', '체크리스트', '멤버', '캘린더 일정'],
			datasets: [{
				label: '총 수',
				data: [getListCount(project_seq), 
					   getCardCount(project_seq), 
					   getCheckListCount(project_seq), 
					   getMemberCount(project_seq), 
					   getCalendarCount(project_seq)],
				backgroundColor: [
					'rgba(255, 99, 132)',
					'rgba(54, 162, 235)',
					'rgba(255, 206, 86)',
					'rgba(75, 192, 192)',
					'rgba(54, 162, 235)'
				],
				borderColor: '#f2dd68',
				borderWidth: 1
			}]
		},
		options: {
			legend: { 
				position : "bottom",
            	labels: {
                	fontColor: "#f2dd68"
            	}
       		},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
	
	let chart2 = document.getElementById('chart-2');
	let cht2 = new Chart(chart2, {
		type: 'pie',
		data: {
			labels: ['진행완료', '미진행'],
			datasets: [{
				data: [9,1],
				backgroundColor: [
					'#f2dd68',
					'rgba(0, 0, 0)',
				],
				borderColor: '#f2dd68',
				borderWidth: 1
			}]
		},
		options: {
			legend: {
				position : "bottom",
            	labels: {
                	fontColor: "#f2dd68"
            	}
       		},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
	
	let chart3 = document.getElementById('chart-3');
	let cht3 = new Chart(chart3, {
		type: 'polarArea',
		data: {
			labels: ['재구','재홍','동연','지연'],
			datasets: [{
				label: '파이원 진행도',
				data: [9,6,7,7],
				backgroundColor: [
					'rgba(255, 99, 132)',
					'rgba(54, 162, 235)',
					'rgba(255, 206, 86)',
					'rgba(75, 192, 192)'
				],
				borderColor: '#f2dd68',
				borderWidth: 1
			}]
		},
		options: {
			legend: {
				position : "bottom",
            	labels: {
                	fontColor: "#f2dd68"
            	}
       		},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
	
	let chart4 = document.getElementById('chart-4');
	let cht4 = new Chart(chart4, {
		type: 'bar',
		data: {
			labels: ['재구','재홍','동연','지연'],
			datasets: [{
				label: '리스트',
				data: [9,6,7,7],
				backgroundColor: [
					'rgba(255, 99, 132)',
					'rgba(54, 162, 235)',
					'rgba(255, 206, 86)',
					'rgba(75, 192, 192)'
				],
				borderColor: '#f2dd68',
				borderWidth: 1
			}]
		},
		options: {
			legend: {
				position : "bottom",
            	labels: {
                	fontColor: "#f2dd68"
            	}
       		},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
	
	/*파이규모 시작*/
	//리스트 총 개수 가져오기
	function getListCount(projectNum) {
			
			let list_count = 0;
			
			$.ajax({
				type: "post",
				url: "getListCount.pie?projectNum="+projectNum,
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				success: function(data) {
					list_count = data.list_count;
					console.log("리스트 수 : "+list_count);
				}
			});
			return list_count;
	}
	
	//카드 총 개수 가져오기
	function getCardCount(projectNum) {
			
			let card_count = 0;
			
			$.ajax({
				type: "post",
				url: "getCardCount.pie?projectNum="+projectNum,
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				success: function(data) {
					card_count = data.card_count;
					console.log("카드 수 : "+card_count);
				}
			});
			return card_count;
	}
	
	//체크리스트 총 개수 가져오기
	function getCheckListCount(projectNum) {
			
			let checklist_count = 0;
			
			$.ajax({
				type: "post",
				url: "getCheckListCount.pie?projectNum="+projectNum,
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				success: function(data) {
					checklist_count = data.checklist_count;
					console.log("체크리스트 수 : "+checklist_count);
				}
			});
			return checklist_count;
	}
	
	//멤버 총 수 가져오기
	function getMemberCount(projectNum) {
			
			let member_count = 0;
			
			$.ajax({
				type: "post",
				url: "getMemberCount.pie?projectNum="+projectNum,
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				success: function(data) {
					member_count = data.member_count;
					console.log("멤버 수 : "+member_count);
				}
			});
			return member_count;
	}
	
	//캘린더 총 수 가져오기
	function getCalendarCount(projectNum) {
			
			let calendar_count = 0;
			
			$.ajax({
				type: "post",
				url: "getCalendarCount.pie?projectNum="+projectNum,
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				success: function(data) {
					calendar_count = data.calendar_count;
					console.log("캘린더 수 : "+calendar_count);
				}
			});
			return calendar_count;
	}
	/*파이규모 끝*/
	
});

