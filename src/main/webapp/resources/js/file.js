
//페이지 버튼 개수 
let totalNum = null;

//현재 머물고 있는 페이지
let currentPage = 1;

//파일 로드하는 함수
function loadFiles(projectNum, page) {
	$("#fileZone").empty();
	$.ajax({
		type: "post",
		url: "showFile.pie?projectNum=" + projectNum + "&page=" + page,
		contentType: "application/json; charset=UTF-8",
		dataType: "json",
		async: false,
		success: function(data) {
			$.each(data.files, function(index, item) {

				console.log(item.file_original_name);

				let file = makeFileOnPage(item.nickName, item.upload_date,
					item.file_original_name, item.file_seq,
					item.file_uploaded_name, item.project_seq);
				$("#fileZone").append(file);
			});
		}
	});
}
//파일 카운트 
function getFileTotalNumber(projectNum) {
	//let total = 0;
	$.ajax({
		type: "post",
		url: "getFileTotalNumber.pie?projectNum=" + projectNum,
		contentType: "application/json; charset=UTF-8",
		dataType: "json",
		async: false,
		success: function(data) {
			console.log("토탈넘버");
			totalNum = data.totalNumber;
		}
	});
	//return total;
}


//파일 만들기 		
function makeFileOnPage(nickName, upload_date, file_original_name, file_seq, file_uploaded_name, project_seq) {

	let file = "<a href= 'fileDownload.pie?project_seq=" + project_seq + "&file_uploaded_name=" + file_uploaded_name + "' style = 'text-decoration : none'>" +
		"<div class='file-list-wrapper'>" +
		"<input id = 'file_seq' type = 'hidden' value = '" + file_seq + "'>" +
		"<input id = 'file_uploaded_name' type = 'hidden' value = '" + file_uploaded_name + "'>" +
		"<div class='file-list-img'>" +
		"<img src='/resources/img/icon/file.png'>" +
		"</div>" +
		"<div class='file-list-letter-wrapper'>" +
		"<div class='file-list-letter-title'>" + file_original_name + "</div>" +
		"<div class='file-list-letter-contents'>" +
		"<span>" + nickName + "</span>&nbsp;&nbsp;|&nbsp;&nbsp;" +
		"<span>" + upload_date + "</span>" +
		"</div>" +
		"</div>" +
		"<div class='file-list-cancel'>" +
		"<i class='fas fa-times'></i>" +
		"</div>" +
		"</div></a>";
	return file;
}
//파일 검색시 파일 로드하는 ajax 
$(document).on("keyup", "#file-search-input", function(e) {

	console.log($("#file-search-input").val());

	let fileOb = new Object();
	fileOb.file_original_name = $("#file-search-input").val();
	let fileName = JSON.stringify(fileOb);


	$.ajax({
		type: "post",
		url: "fileSerchWithName.pie",
		contentType: "application/json; charset=UTF-8",
		dataType: "json",
		async: false,
		data: fileName,
		success: function(data) {
			$("#fileZone").empty();
			$.each(data.files, function(index, item) {
				let file = makeFileOnPage(item.nickName, item.upload_date,
					item.file_original_name, item.file_seq,
					item.file_uploaded_name, item.project_seq);
				$("#fileZone").append(file);
			});
			//검색어가 없으면 기본 파일로드 함수 실행 		
			if (data === null) {
				loadFiles($("#projectNum").val());
			}
		},
		error: function(data) {
			console.log(data);
		}
	});

});

//페이지 로드되면 
$(document).ready(function() {
	loadFiles($("#projectNum").val(), 1);
	getFileTotalNumber($("#projectNum").val());

	//페이지 버튼 
	function btn(num) {
		let btn = "<div class = 'btn'>" + num + "</div>";
		return btn;
	}

	//현재 페이지 버튼 
	function current_page_btn(num) {
		let current_page_btn = "<div class = 'current-page-btn'>" + num + "</div>";
		return current_page_btn;
	}

	//페이지 버튼 만드는 루프 
	function pageBtnLoop(total_page_btn, curPage) {
		console.log(curPage);
		
		//시작 페이지 
		start_page = ((Math.ceil((curPage / 5))) * 5) - 4;
		
		//버튼을 최대 5개 까지만 만드는 카운트 
		let count = 0;
	
		for (let i = start_page; i <= total_page_btn; i++) {
			console.log("page");
			if(count === 5){
				break;
			}else{
				if (i === Number(curPage)) {
					console.log("hi");
					$(".page-btn-zone").append(current_page_btn(i));
				} else {
					let btnDoc = btn(i);
					$(".page-btn-zone").append(btnDoc);
				}
			count += 1;
			}
		}
	}
	
	//해당 프로젝트의 전체 파일 개수를 기준으로 하여 페이징 버튼을 만들어주는 함수 
	function makePageBtn(totalCount, curPage) {
		curPage = Number(curPage);
		
		let total_page_btn = null;

		//나누고 나머지가 있으면  딱 떨어지는 수가 아님 
		if (totalCount % 5 == 0) {
			total_page_btn = totalCount / 5;
		} else {
			total_page_btn = Math.floor((totalCount / 5)) + 1;
		}

		if (total_page_btn === 5 || total_page_btn <= 5) {
			//버튼 둘다 안 만듬 
			pageBtnLoop(total_page_btn, curPage);

		}else if (total_page_btn > curPage) {
			//오른쪽 버튼만 만듬 
			pageBtnLoop(total_page_btn, curPage);
			let right_btn = "<div class = 'right-btn'><i class='fas fa-angle-right'></i></div>";
			$(".page-btn-zone").append(right_btn);
			
		}else if (total_page_btn < curPage){
			//왼쪽 버튼만 만듬
			let left_btn = "<div class = 'left_btn-btn'><i class='fas fa-angle-right'></i></div>";
			$(".page-btn-zone").append(left_btn);
			pageBtnLoop(total_page_btn, curPage);

			
		
		}
		currentPage = curPage;
		
	}
	
	makePageBtn(totalNum, 1);

	console.log(totalNum);
	$("#input_file").on('change', function(e) {
		e.preventDefault();
		selectFile(this.files);
	});

	$(".file-top-icon-wrapper").mouseleave(function() {
		$(".file-top-icon-wrapper").css("background", "#31353d");
	})
	$(".file-top-icon-wrapper").mouseover(function() {
		$(".file-top-icon-wrapper").css("background", "#f2dd68");
	})

	$(".btn").mouseover(function() {
		$(this).css("color", "grey");
	})
	$(".btn").mouseleave(function() {
		$(this).css("color", "#f2dd68");
	})
	//페이징 버튼 클릭 이벤트
$(document).on("click", ".btn", function(e) {
	$(".page-btn-zone").empty();
	console.log("btn clicked");
	console.log($(this)[0].innerText);
	let page = $(this)[0].innerText
	loadFiles($("#projectNum").val(), page);
	makePageBtn(totalNum, page);
	console.log("현재 페이지");
	console.log(currentPage);
});

//오른쪽 버튼 클릭 이벤트 
$(document).on("click", ".right-btn", function(e) {
	console.log("right clicked");
	$(".page-btn-zone").empty();
	
	currentPage = Number(currentPage)+1;
	console.log("현재 페이지");
	console.log(currentPage);
	
	loadFiles($("#projectNum").val(), currentPage);
	makePageBtn(totalNum, currentPage);
	
});

//왼쪽 버튼 클릭 이벤트
$(document).on("click", ".left-btn", function(e) {
	console.log("left clicked");
	$(".page-btn-zone").empty();
	
	currentPage = Number(currentPage)-1;
	
	loadFiles($("#projectNum").val(), currentPage);
	makePageBtn(totalNum, currentPage);
	console.log("현재 페이지");
	console.log(currentPage);
});

});


	
// 파일 리스트 번호
let fileIndex = 0;
// 등록할 전체 파일 사이즈
let totalFileSize = 0;
// 파일 리스트
let fileList = new Array();
// 파일 사이즈 리스트
let fileSizeList = new Array();
// 등록 가능한 파일 사이즈 MB
let uploadSize = 50;
// 등록 가능한 총 파일 사이즈 MB
let maxUploadSize = 500;

$(function() {
	// 파일 드롭 다운
	fileDropDown();
});

// 파일 드롭 다운
function fileDropDown() {
	let dropZone = $("#dropZone");
	//Drag기능 
	dropZone.on('dragenter', function(e) {
		e.stopPropagation();
		e.preventDefault();
		// 드롭다운 영역 css
		dropZone.css('background-color', '#f2dd68');
	});
	dropZone.on('dragleave', function(e) {
		e.stopPropagation();
		e.preventDefault();
		// 드롭다운 영역 css
		dropZone.css('background-color', '#31353d');
	});
	dropZone.on('dragover', function(e) {
		e.stopPropagation();
		e.preventDefault();
		// 드롭다운 영역 css
		dropZone.css('background-color', '#f2dd68');
	});
	dropZone.on('drop', function(e) {
		e.preventDefault();
		// 드롭다운 영역 css
		dropZone.css('background-color', '#31353d');
		let files = e.originalEvent.dataTransfer.files;
		if (files != null) {
			if (files.length < 1) {
				/* alert("폴더 업로드 불가"); */
				console.log("폴더 업로드 불가");
				return;
			} else {
				selectFile(files)
			}
		} else {
			alert("ERROR");
		}
	});
}

// 파일 선택시
function selectFile(fileObject) {
	let files = null;

	files = fileObject;

	// 다중파일 등록
	if (files != null) {

		for (let i = 0; i < files.length; i++) {
			// 파일 이름
			let fileName = files[i].name;
			let fileNameArr = fileName.split("\.");
			// 확장자
			let ext = fileNameArr[fileNameArr.length - 1];

			let fileSize = files[i].size; // 파일 사이즈(단위 :byte)
			console.log("fileSize=" + fileSize);
			if (fileSize <= 0) {
				console.log("0kb file return");
				return;
			}

			let fileSizeKb = fileSize / 1024; // 파일 사이즈(단위 :kb)
			let fileSizeMb = fileSizeKb / 1024;    // 파일 사이즈(단위 :Mb)

			let fileSizeStr = "";
			if ((1024 * 1024) <= fileSize) {    // 파일 용량이 1메가 이상인 경우 
				console.log("fileSizeMb=" + fileSizeMb.toFixed(2));
				fileSizeStr = fileSizeMb.toFixed(2) + " Mb";
			} else if ((1024) <= fileSize) {
				console.log("fileSizeKb=" + parseInt(fileSizeKb));
				fileSizeStr = parseInt(fileSizeKb) + " kb";
			} else {
				console.log("fileSize=" + parseInt(fileSize));
				fileSizeStr = parseInt(fileSize) + " byte";
			}

			/* if ($.inArray(ext, [ 'exe', 'bat', 'sh', 'java', 'jsp', 'html', 'js', 'css', 'xml' ]) >= 0) {
				// 확장자 체크
				alert("등록 불가 확장자");
				break; */
			if ($.inArray(ext, ['hwp', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'png', 'pdf', 'jpg', 'jpeg', 'gif', 'zip']) <= 0) {
				// 확장자 체크
				/* alert("등록이 불가능한 파일 입니다.");
				break; */
				alert("등록이 불가능한 파일 입니다.(" + fileName + ")");
			} else if (fileSizeMb > uploadSize) {
				// 파일 사이즈 체크
				alert("용량 초과\n업로드 가능 용량 : " + uploadSize + " MB");
				break;
			} else {
				// 전체 파일 사이즈
				totalFileSize += fileSizeMb;

				// 파일 배열에 넣기
				fileList[fileIndex] = files[i];

				// 파일 사이즈 배열에 넣기
				fileSizeList[fileIndex] = fileSizeMb;

				// 업로드 파일 목록 생성
				addFileList(fileIndex, fileName, fileSizeStr);

				// 파일 번호 증가
				fileIndex++;
			}
		}
	} else {
		alert("ERROR");
	}



}

// 업로드 파일 목록 생성
function addFileList(fIndex, fileName, fileSizeStr) {

	let newFile =
		"<div id='fileTr_" + fIndex + "' class='file-list-wrapper'>" +
		"<div class='file-list-img'>" +
		"<img src='/resources/img/icon/file.png'>" +
		"</div>" +
		"<div class='file-list-letter-wrapper'>" +
		"<div class='file-list-letter-title'>" + fileName + "</div>" +
		"<div class='file-list-letter-contents'>" +
		"<span>" + fileSizeStr + "</span>" +
		"</div>" +
		"</div>" +
		"<div class='file-list-cancel'>" +
		"<label for = 'delete-btn'>" +
		"<i class='fas fa-times'></i>" +
		"<input style = 'display:none;' id = 'delete-btn' type='button' href='#' onclick='deleteFile(" + fIndex + "); return false;'>" +
		"<label>" +
		"</div>" +
		"</div>";

	$('.new-file-wrapper').after(newFile);
}

// 업로드 파일 삭제
function deleteFile(fIndex) {
	console.log("deleteFile.fIndex=" + fIndex);
	// 전체 파일 사이즈 수정
	totalFileSize -= fileSizeList[fIndex];

	// 파일 배열에서 삭제
	delete fileList[fIndex];

	// 파일 사이즈 배열 삭제
	delete fileSizeList[fIndex];

	// 업로드 파일 테이블 목록에서 삭제
	$("#fileTr_" + fIndex).remove();

	console.log("totalFileSize=" + totalFileSize);

	if (totalFileSize > 0) {
		$("#fileDragDesc").hide();
		$("fileListTable").show();
	} else {
		$("#fileDragDesc").show();
		$("fileListTable").hide();
	}
}

// 파일 등록
function uploadFile() {
	// 등록할 파일 리스트
	let uploadFileList = Object.keys(fileList);

	// 파일이 있는지 체크
	if (uploadFileList.length == 0) {
		// 파일등록 경고창
		alert("파일이 없습니다.");
		return;
	}

	// 용량을 500MB를 넘을 경우 업로드 불가
	if (totalFileSize > maxUploadSize) {
		// 파일 사이즈 초과 경고창
		alert("총 용량 초과\n총 업로드 가능 용량 : " + maxUploadSize + " MB");
		return;
	}

	if (confirm("등록 하시겠습니까?")) {
		// 등록할 파일 리스트를 formData로 데이터 입력
		let form = $('#uploadForm')[0];
		let formData = new FormData(form);
		for (let i = 0; i < uploadFileList.length; i++) {
			formData.append('files', fileList[uploadFileList[i]]);
		}


		$.ajax({
			url: "file.pie?projectNum=" + $("#projectNum").val() + "&nick=" + $("#nick").val(),
			data: formData,
			type: 'POST',
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			async: false,
			dataType: 'text',
			cache: false,
			success: function(data) {
				console.log(data);

				//파일 전송 후 남아있는 파일 데이터 삭제 
				console.log(projectNum);


				const fileSize = fileList.lengt; 
				for (let i = 0; i < fileSize; i++) {
					deleteFile(i);
				}

				loadFiles($("#projectNum").val());

			}
		});
	}
}
