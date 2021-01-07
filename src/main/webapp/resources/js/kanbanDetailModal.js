/*
파일명: checkList.js
설명: 칸반 카드 상세페이지 내 구현될 체크리스트 jqery&js
작성일: 2021-01-04 ~ 
작성자: 문지연
*/

$(document).ready(function() {
	//get projectSeq
	let pjNumByController = null;

	$.ajax({
		type: "post",
		contentType: "application/json; charset=UTF-8",
		dataType: "json",
		url: "getProjectNum.pie",
		async: false,
		success: function(data) {
			pjNumByController = data.projectNum;
		}
	})

	let projectNum = pjNumByController;
	console.log("project seq : " + projectNum);
	
	function makeChkList(check_seq,check_name,ischecked){
		let chkTag = '<span class="todo-wrap"><input type="checkbox" data-check-seq="' +
			check_seq+'" isChecked="'+ischecked+'"/><label for="' + check_seq +
			'" class="todo"><i class="fa fa-check"></i>'+check_name+'</label>'+
			'<span class="delete-item" title="remove"><i class="fa fa-times-circle"></i></span></span>';
		return chkTag;
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
			url: "loadCheckList.pie?cardSeq="+cardSeq,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data){
				let chkList = data.chkList;
				$.each(chkList, function(index,item){
					let chkTag = makeChkList(item.check_seq,item.check_name,item.ischecked);
					$("#add-todo").parent().prepend(chkTag);
				});
			}
		});
		
		$('.todo-wrap').each(function(){
			let chkVal = $(this).children('input').attr('ischecked');
			if(chkVal==1){
			$(this).children('input').prop('checked',true);
		}
		});
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
		}
	}

	//open edit card Title form in Modal
	$(document).on("click", ".cardTitleMo", function(e) {
		e.preventDefault();
		let cardTitleForm = $(this).parent().children("#cardTitleForm");
		$(this).hide();
		cardTitleForm.children("#cardTitleInput").attr("placeholder", $(this).html());
		cardTitleForm.show();
		cardTitleForm.focus();
	});
	
	//make proTitleInput disappear
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
			$('.cardTitleMo').text(editedCardTitle);
			$("[data-card-seq=" + modal_card_seq + "]").text(editedCardTitle);
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
	
	//change checked status
	$(document).on('click', '.fa-check', function() {
		let chkBox = $(this).parent().prev();
		let chk = chkBox.is(':checked');
		let checkSeq = chkBox.attr('data-check-seq');
		if (chk) {
			console.log("unchecked");
			chkBox.prop('checked', false);
			chkBox.attr('ischecked', '0');
		} else {
			console.log("checked");
			chkBox.prop('checked', true);
			chkBox.attr('ischecked', '1');
		}
		console.log(chkBox.attr('ischecked'));
		console.log(checkSeq);
		let chkOb = new Object();
		chkOb.ischecked=chkBox.attr('ischecked');
		chkOb.check_seq=checkSeq;
		
		let check = JSON.stringify(chkOb);
		
		$.ajax({
			type: "post",
			url: "editCheckedStatus.pie",
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			data: check,
			success: function(data){
				console.log(data);
			}
		})
		
		
	});

	/*Remove CheckList in Modal*/
	$(document).on('click','.delete-item',function(){
		console.log($(this));
		let cardSeq = Number($(this).parents().children().children('.modal_card_seq').val());
		let checkSeq =Number($(this).prev().attr('for'));
		
		let checkOb = new Object();
		checkOb.card_seq=cardSeq;
		checkOb.check_seq=checkSeq;
		
		let check = JSON.stringify(checkOb);
		let deletedItem = $(this).parent();
		
		$.ajax({
			url: "deleteChkList.pie?cardSeq="+cardSeq,
			contentType: "application/json; charset=UTF-8",
			type: "post",
			async: "false",
			dataType: "json",
			data: check,
			success: function(data){
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
});