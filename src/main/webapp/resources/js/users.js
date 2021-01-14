	$(document).ready(function() {
		$.ajax({
			type: "GET",
			url: "usersList.pie",
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			data: {project_seq:$("#projectNum").val()},
			success: function(data) {
				createUsers(data);
				}
		})
		})
		function createUsers(data){
		let usersList="";
		$.each(data,function(index,users){
			usersList += 	'<div class="users-item-wrapper">\
							<div class="users-top-wrapper">\
							<div class="users-user"><i class="fas fa-user"></i></div>\
							<div class="users-username">'+users.nickName+'</div>\
							</div>\
							<div class="users-middle-wrapper">\
							<div class="users-reply">\
							<i class="far fa-envelope"></i>메일:'+users.email+'</div>\
							</div>\
							</div>'
			
		})
		$('#users').append(usersList)
		}