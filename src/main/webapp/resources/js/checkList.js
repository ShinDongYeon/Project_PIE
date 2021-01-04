/*
파일명: checkList.js
설명: 칸반 카드 상세페이지 내 구현될 체크리스트 jqery&js
작성일: 2021-01-04 ~ 
작성자: 문지연
*/

/*CheckList in Modal*/
$(document).ready(function(){
	$('#add-todo').click(function() {
		const lastSibling = $('#checkListFrom > .todo-wrap:last-of-type > input').attr('id');
		const newId = Number(lastSibling) + 1;
	
		$(this).before('<span class="editing todo-wrap"><input type="checkbox" id="' +
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
	
		$('#input-todo' + newId + '').on('blur enterEvent', function() {
			const todoTitle = $('#input-todo' + newId + '').val();
			const todoTitleLength = todoTitle.length;
			if (todoTitleLength > 0) {
				$(this).before(todoTitle);
				$(this).parent().parent().removeClass('editing');
				$(this).parent().after('<span class="delete-item" title="remove"><i class="fa fa-times-circle"></i></span>');
				$(this).remove();
				$('.delete-item').click(function() {
					var parentItem = $(this).parent();
					parentItem.animate({
						left: "-30%",
						height: 0,
						opacity: 0
					}, 200);
					setTimeout(function() { $(parentItem).remove(); }, 1000);
				});
			}
			else {
				$('.editing').animate({
					height: '0px'
				}, 200);
				setTimeout(function() {
					$('.editing').remove()
				}, 400)
			}
		})
	
	});
	
	/*Remove CheckList in Modal*/
	$('.delete-item').click(function() {
		var parentItem = $(this).parent();
		parentItem.animate({
			left: "-30%",
			height: 0,
			opacity: 0
		}, 200);
		setTimeout(function() { $(parentItem).remove(); }, 1000);
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