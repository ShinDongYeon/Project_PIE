$(document).ready(function() {
	let chart1 = document.getElementById('chart-1');
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
});

