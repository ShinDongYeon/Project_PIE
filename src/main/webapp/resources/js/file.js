$(document).ready(function() {
	$("#input_file").bind('change', function() {
		selectFile(this.files);
	});
	
	$(".file-top-icon-wrapper").mouseleave(function(){
		$(".file-top-icon-wrapper").css("background", "#31353d");
	})
	$(".file-top-icon-wrapper").mouseover(function(){
		$(".file-top-icon-wrapper").css("background", "#f2dd68");
	})
	
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
		"<div id='fileTr_" + fIndex + "' class='file-list-wrapper'>"+
			"<div class='file-list-img'>"+
				"<img src='/resources/img/icon/file.png'>"+
			"</div>"+
			"<div class='file-list-letter-wrapper'>"+
				"<div class='file-list-letter-title'>"+fileName+"</div>"+
				"<div class='file-list-letter-contents'>"+
					"<span>"+fileSizeStr+"</span>"+
				"</div>"+
			"</div>"+
			"<div class='file-list-cancel'>"+
				"<label for = 'delete-btn'>"+
				"<i class='fas fa-times'></i>"+
				"<input style = 'display:none;' id = 'delete-btn' type='button' href='#' onclick='deleteFile(" + fIndex + "); return false;'>"+
				"<label>"+
			"</div>"+
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
			url: "file.pie",
			data: formData,
			type: 'POST',
			enctype : 'multipart/form-data', 
			processData: false,
			contentType: false,
			dataType: 'text', 
			cache: false,
			success: function(data) {
				console.log(data);
			}
		});
	}
}