/*right sidebar contents wrapper*/

$(document).ready(function(){
	var modal = document.getElementById('crtChat-modal')
	var crtChatCancelBtn = document.getElementById('crtChat-btn-cancel');
	var crtChatBtn = document.getElementById('crtChatBtn');
	var crtChatBackground = document.getElementById('crtChat-modal-background');
	
	crtChatBtn.onclick = function() {
		modal.style.display = 'block';
		crtChatBackground.style.display = 'block';
	}
	
	crtChatCancelBtn.onclick = function(){
		modal.style.display = 'none';
		crtChatBackground.style.display = 'none';
	}
	
	window.onclick = function(event) {
		if(event.target == crtChatBackground) {
			modal.style.display = 'none';
			crtChatBackground.style.display = 'none';
		}
	}
	
	
});
/*//right sidebar contents wrapper*/