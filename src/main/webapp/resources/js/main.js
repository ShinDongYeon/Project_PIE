$(document).ready(function(){
	var modal_background = document.getElementById('userEdit_modal_background');
	var modal_userEdit = document.getElementById('userEdit_modal_contents');
	var modal_pwdCheck = document.getElementById('userEdit_pwdCheck_modal_contents');
	var modal_withdrawal = document.getElementById('userEdit_withdrawal_modal_contents');
	
	$('#user_edit').click(function(){
		modal_background.style.display = 'block';
		modal_userEdit.style.display= 'block';
	});
	
	$('#userEdit_main_withdrawal_btn').click(function(){
		modal_userEdit.style.display = 'none';
		modal_pwdCheck.style.display = 'block';
	});
	
	$('#userEdit_withdrawal_complete_btn').click(function(){
		modal_pwdCheck.style.display = 'none';
		modal_withdrawal.style.display = 'block';
	});
	
	window.onclick = function(event) {
		if(event.target == modal_background) {
			modal_background.style.display = 'none';
			modal_userEdit.style.display= 'none';
			modal_pwdCheck.style.display = 'none';
			modal_withdrawal.style.display = 'none';
		}
	}
});