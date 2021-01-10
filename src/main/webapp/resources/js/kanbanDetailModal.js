/*
파일명: checkList.js
설명: 칸반 카드 상세페이지 내 구현될 체크리스트, 담당자 등록 jqery&js
작성일: 2021-01-04 ~ 2021-01-12
작성자: 문지연
*/

$(document).ready(function() {

	function makeChkList(check_seq, check_name, ischecked) {
		let chkTag = '<span class="todo-wrap"><input type="checkbox" data-check-seq="' +
			check_seq + '" isChecked="' + ischecked + '"/><label for="' + check_seq +
			'" class="todo"><i class="fa fa-check"></i>' + check_name + '</label>' +
			'<span class="delete-item" title="remove"><i class="fa fa-times-circle"></i></span></span>';
		return chkTag;
	}

	//show progress bar by checked boxes
	function progressBar() {
		let total = $('.todo-wrap').length;
		let checked = $('.todo-wrap').find('input[ischecked="1"]').length;
		let percentage = parseInt(((checked / total) * 100), 10);
		
		$('.progressbar').progressbar({
			value: percentage
		});
		
		if(isNaN(percentage)||percentage<0){
			$('.progressbar-label').text(0 + "%");
		}else{
			$('.progressbar-label').text(percentage + "%");
		}
		
	}
	//get Modal Id
	const details = document.getElementById("detailsModal");

	//Open clicked Modal
	$(document).on("click", ".cardContent", function(e) {
		e.preventDefault();
		details.style.display = "block";
		//set clicked Card Content cardSeq as a value
		$('.modal_card_seq').attr("value", $(this).data().cardSeq);
		let cardSeq = Number($('.modal_card_seq').attr("value"));
		console.log("cardSeq:" + cardSeq);
		//get card Title
		$('.cardTitleMo').text($(this).context.innerText);

		//get saved checkList
		$.ajax({
			type: "post",
			url: "loadCheckList.pie?cardSeq=" + cardSeq,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				let chkList = data.chkList;
				$.each(chkList, function(index, item) {
					let chkTag = makeChkList(item.check_seq, item.check_name, item.ischecked);
					$("#add-todo").parent().prepend(chkTag);
				});
			}
		});

		//show checked status
		$('.todo-wrap').each(function() {
			let chkVal = $(this).children('input').attr('ischecked');
			if (chkVal == 1) {
				$(this).children('input').prop('checked', true);
			}
		});

		//show progress Bar
		progressBar();
	});

	//close Modal
	$(document).on("click", ".closeModal", function(e) {
		e.preventDefault();
		details.style.display = "none";
		$(".todo-wrap").remove();
	});

	window.onclick = function(e) {
		if (e.target == details) {
			details.style.display = "none";
			$(".todo-wrap").remove();
		}
	}

	//open edit card Title form in Modal
	$(document).on("click", ".cardTitleMo", function(e) {
		e.preventDefault();
		let cardTitleForm = $(this).parent().children("#cardTitleForm");
		cardTitleForm.children("#cardTitleInput").attr("placeholder", $(this).html());
		$(".cardTitleMo").hide();
		cardTitleForm.show();
		cardTitleForm.children("#cardTitleInput").focus();
	});

	//make edit card Title disappear
	$(document).on("click", function(e) {
		if (!$(e.target).closest(".cardTitleMo").length) {
			$("#cardTitleForm").hide();
			$(".cardTitleMo").show();
		}
	});

	//edit card Title in Modal
	$(document).on("submit", ".cardTitleForm", function(e) {
		e.preventDefault();
		let editedCardTitle = $(this).parents().children().children("#cardTitleInput").val();
		let modal_card_seq = $(this).parents().children().children('.modal_card_seq').attr('value');

		let cardOb = new Object();
		cardOb.card_seq = modal_card_seq;
		cardOb.card_name = editedCardTitle;

		let card = JSON.stringify(cardOb);
		if (editedCardTitle.length > 0) {
			$.ajax({
				type: "post",
				url: "editKanbanCardTitle.pie",
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				data: card,
				success: function(data) {
					console.log(data);
				}
			});
			$('.cardTitleMo').html(editedCardTitle);
			$("[data-card-seq=" + modal_card_seq + "]").html(editedCardTitle);
			$(this).parents().children().children("#cardTitleInput").val("");
			$('.cardTitleForm').hide();
			$('.cardTitleMo').show();
		}
	});


	/*CheckList in Modal*/
	$('#add-todo').click(function() {
		let lastSibling = Number($('#checkListForm > .todo-wrap:last-of-type > input').attr('data-check-seq'));
		let cardSeq = Number($(this).parents().children().children('.modal_card_seq').val());
		console.log("cardModalSeq:" + cardSeq);

		$.ajax({
			type: "post",
			url: "getLastCheckSeqNum.pie",
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				console.log(data);
				lastSibling = data.data;
			}
		});

		let newId = Number(lastSibling) + 1;
		console.log("lastSibling:" + lastSibling);
		$(this).before('<span class="editing todo-wrap"><input type="checkbox" data-check-seq="' +
			newId + '"/><label for="' + newId +
			'" class="todo"><i class="fa fa-check"></i><input type="text" class="input-todo" id="input-todo' +
			newId + '"/></label></div>');
		$('#input-todo' + newId + '').parent().parent().animate({
			height: "40px"
		}, 200)
		$('#input-todo' + newId + '').focus();

		$('#input-todo' + newId + '').enterKey(function() {
			$(this).trigger('enterEvent');
		})

		$('#input-todo' + newId + '').on('blur enterEvent', function(e) {
			//prevent enter submit when it's null
			$(document).on("keydown", "form", function(event) {
				return event.key != "Enter";
			});

			//add checkList
			let checkTitle = $('#input-todo' + newId + '').val();
			if (checkTitle.length > 0) {
				e.preventDefault();
				$(this).before(checkTitle);
				$(this).parent().parent().removeClass('editing');
				$(this).parent().after('<span class="delete-item" title="remove"><i class="fa fa-times-circle"></i></span>');
				$(this).remove();

				let checkOb = new Object;
				checkOb.check_seq = newId;
				checkOb.check_name = checkTitle;
				checkOb.card_seq = cardSeq;

				let check = JSON.stringify(checkOb);

				$.ajax({
					type: "post",
					url: "insertCheckList.pie",
					contentType: "application/json; charset=UTF-8",
					dataType: "json",
					async: false,
					data: check,
					success: function(data) {
						console.log(data);
						progressBar();
					}
				});
			} else {
				$('.editing').animate({
					height: '0px'
				}, 200);
				setTimeout(function() {
					$('.editing').remove()
				}, 400);
			}
			console.log("new Id:" + newId);
			console.log("title:" + checkTitle);
			console.log("cardSeq:" + cardSeq);
		})
	});

	//change checked status & progress bar
	$(document).on('click', '.fa-check', function() {
		let chkBox = $(this).parent().prev();
		let chk = chkBox.is(':checked');
		let checkSeq = chkBox.attr('data-check-seq');
		if (chk) {
			console.log("unchecked");
			chkBox.prop('checked', false);
			chkBox.attr('ischecked', '0');
			progressBar();
		} else {
			console.log("checked");
			chkBox.prop('checked', true);
			chkBox.attr('ischecked', '1');
			progressBar();
		}


		console.log(chkBox.attr('ischecked'));
		console.log(checkSeq);
		let chkOb = new Object();
		chkOb.ischecked = chkBox.attr('ischecked');
		chkOb.check_seq = checkSeq;

		let check = JSON.stringify(chkOb);

		$.ajax({
			type: "post",
			url: "editCheckedStatus.pie",
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			data: check,
			success: function(data) {
				console.log(data);
			}
		})


	});

	/*Remove CheckList in Modal*/
	$(document).on('click', '.delete-item', function() {
		let cardSeq = Number($(this).parents().children().children('.modal_card_seq').val());
		let checkSeq = Number($(this).prev().attr('for'));
		let ischecked = Number($(this).prev().prev().attr('ischecked'));
		let checkOb = new Object();
		checkOb.card_seq = cardSeq;
		checkOb.check_seq = checkSeq;
		checkOb.ischecked = ischecked;

		let check = JSON.stringify(checkOb);
		let deletedItem = $(this).parent();
		
		//change progress bar
		let total = $(this).parents().children('.todo-wrap').length-1;
		let checked = 0;
		console.log("total:" + total);
		if(ischecked===1){
			checked = $(this).parents().children('.todo-wrap').find('input[ischecked="1"]').length-1;
		}else{
			checked = $(this).parents().children('.todo-wrap').find('input[ischecked="1"]').length
		}
		console.log("checked:" + checked);
		let percentage = parseInt(((checked/ total) * 100), 10);

		$('.progressbar').progressbar({
			value: percentage
		});
		if(isNaN(percentage)||percentage<0){
			$('.progressbar-label').text(0 + "%");
		}else{
			$('.progressbar-label').text(percentage + "%");
		}
		$.ajax({
			url: "deleteChkList.pie?cardSeq=" + cardSeq,
			contentType: "application/json; charset=UTF-8",
			type: "post",
			async: "false",
			dataType: "json",
			data: check,
			success: function(data) {
				console.log(data);
				deletedItem.animate({
					left: "-30%",
					height: 0,
					opacity: 0
				}, 200);
				setTimeout(function() { $(deletedItem).remove(); }, 1000);
			}

		});
	});

	/*Enter Key Event Handler*/
	$.fn.enterKey = function(fnc) {
		return this.each(function() {
			$(this).keypress(function(ev) {
				var keycode = (ev.keyCode ? ev.keyCode : ev.which);
				if (keycode == '13') {
					fnc.call(this, ev);
				}
			})
		})
	}
	
	/*Open Card Members Modal*/
	const memModal = document.getElementById("inviteModal");

	//Open clicked Modal
	$(document).on("click", ".cardMembersBtn", function(e) {
		e.preventDefault();
		memModal.style.display = "block";
		
		//get projectSeq$CardSeq
		cardSeq=$(this).parents().children().children(".modal_card_seq").val();
		console.log("cardSeq:::"+cardSeq);
		$(".invite-detail").attr("data-invite-card",cardSeq);
		
		//get project Member List
		$.ajax({
			type: "get",
			url: "getProjectMemList?sessionEmail="+$('#session_email').val(),
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				console.log(data);
				let memberLi = "Member List";
				$.each(data, function(index, item) {
					memberLi += "<div id='crtChat-select-users-wrapper-"+index+"' class='crtChat-select-users-wrapper'>"+
					"<div class='crtChat-select-user-wrapper'>"+
						"<div class='crtChat-select-user-subWrapper'>"+
							"<div class='crtChat-select-user-pic'>"+
								"<i class='fas fa-user'></i>"+					
							"</div>"+
							"<div class='crtChat-select-user-letters-wrapper'>"+
								"<div id='crtChat-select-user-name-"+index+"' class='crtChat-select-user-name'>"+
									item.nickName+
								"</div>"+
								"<div id='crtChat-select-user-email-"+index+"' class='crtChat-select-user-email'>"+
									item.email+
								"</div>"+
							"</div>"+
						"</div>"+
						"<div id='crtChat-select-user-btn-"+index+"' class='crtChat-select-user-btn'>"+
							"<i onclick='selectUser(this)' class='fas fa-plus'></i>"+
						"</div>"+
					"</div>"+
				"</div>";
	});
	$('.projectMemList').append(memberLi);	
			}
		});
		});
	
	window.onclick = function(e) {
		if (e.target == memModal) {
			memModal.style.display = "none";
			$('.projectMemList').empty();	
		}
	}
});