$(document).ready(function() {
	let chart1 = document.getElementById('chart-1').getContext('2d');
	let cht1 = new Chart(chart1, {
		type: 'bar',
		data: {
			labels: ['리스트', '카드', '체크리스트', '멤버'],
			datasets: [{
				label: '총 수',
				data: [12, 19, 3, 5],
				backgroundColor: [
					'rgba(255, 99, 132)',
					'rgba(54, 162, 235)',
					'rgba(255, 206, 86)',
					'rgba(75, 192, 192)'
				],
				borderWidth: 1
			}]
		},
		options: {
			legend: {
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
	
	let chart2 = document.getElementById('chart-2').getContext('2d');
	let cht2 = new Chart(chart2, {
		type: 'pie',
		data: {
			labels: ['프로젝트 진행도', '미진행'],
			datasets: [{
				data: [9,1],
				backgroundColor: [
					'rgba(54, 162, 235)',
					'rgba(0, 0, 0)',
				],
				borderWidth: 1
			}]
		},
		options: {
			legend: {
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
});

