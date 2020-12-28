/*right sidebar contents wrapper*/
window.onload = function(){
	let btnClassName;
	let tmpBtnClassName = 'fas fa-star';
	let wrapper = document.getElementById('right-sidebar-contents-wrapper');	
		
	$('#sidebar-star').click(function(){
		btnClassName = $(this)[0].className;
		sidebarToggle();
	});
	$('#sidebar-bell').click(function(){
		btnClassName = $(this)[0].className;
		sidebarToggle();
	});
	$('#sidebar-file').click(function(){
		btnClassName = $(this)[0].className;
		sidebarToggle();
	});
	$('#sidebar-chat').click(function(){
		btnClassName = $(this)[0].className;
		sidebarToggle();
	});
	$('#sidebar-calendar').click(function(){
		btnClassName = $(this)[0].className;
		sidebarToggle();
	});
	$('#sidebar-users').click(function(){
		btnClassName = $(this)[0].className;
		sidebarToggle();
	});
	
	//star
	function sidebarToggle(){
		let contentDiv = document.getElementById(btnClassName);
		
		if(wrapper.className === 'right-sidebar-contents-wrapper-hidden'){
			wrapper.className = 'right-sidebar-contents-wrapper-display';			
			document.getElementById(tmpBtnClassName).style.width = '0px';
			document.getElementById(tmpBtnClassName).style.visibility = 'hidden';
			contentDiv.style.width = '100%';
			contentDiv.style.visibility = 'visible';
			tmpBtnClassName = btnClassName;
		} else {
			if(btnClassName === tmpBtnClassName){
				wrapper.className = 'right-sidebar-contents-wrapper-hidden';
				contentDiv.style.width = '0px';
				contentDiv.style.visibility = 'hidden';
			} else{ //이전에 클릭한 버튼과 일치하지 않을 때
				contentDiv.style.width  = '100%';
				contentDiv.style.visibility  = 'visible';
				document.getElementById(tmpBtnClassName).style.width = '0px';
				document.getElementById(tmpBtnClassName).style.visibility = 'hidden';
				tmpBtnClassName = btnClassName;
			}			
		}
	};
};
/*//right sidebar contents wrapper*/