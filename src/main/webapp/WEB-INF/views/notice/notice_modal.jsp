<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>PIE</title>
</head>
<body>
<div id="notice_modal_background"></div>
 <!-- The Modal -->
<!--Details Modal-->
	<div id="noticeInsert_modal_contents" class="noticeDetailsModal">
		<div class="notice-modal-detail">
			<!-- Modal close btn -->
			<span class="noticeCloseModal" id="insertCancel"
			onclick="document.getElementById('noticeInsert_modal_contents').style.display='none'">&times;</span>
			
			<!-- Card Title -->
			<div class="notices"></div>
			<h3 class="Title">
			<i class="fas fa-pen"></i> 제목
			</h3>
			<div id="noticeInput" class="noticeTitle">
				<input type="text" id="title" name="title" placeholder=""> 
			</div>
			<!-- Card Details -->
			<div id="noticeDetailsWrap">
				<h2 class="noticeDetails">
					<i class="fas fa-align-left"></i> 내용
				</h2>
			</div>
				<div class="noticeContent">
					<textarea class="ckeditor" id="summernote"></textarea>
					<form name="uploadForm" id="uploadFormNotice" method = "post" enctype="multipart/form-data">
					<input type="file", name="noticefile" id="filename" placeholder="파일 선택" />
					</form>
					<button class="addNoticeInsert-btn" id="insertnotice"
				onclick="document.getElementById('noticeInsert_modal_contents').style.display='none'">등록</button>
				</div>
		</div>
	</div>

<!--Details Modal-->
	<div id="noticeEdit_modal_contents" class="noticeDetailsModal">
		<div class="notice-modal-detail">
			<span class="noticeCloseModal" id="editCancel"
		onclick="document.getElementById('noticeEdit_modal_contents').style.display='none'">&times;</span>
			

			<!-- Card Title -->
			<div class="notices"></div>
			<h3 class="Title">
			<i class="fas fa-pen"></i> 제목
			</h3>
			<div id="noticeInput" class="noticeTitle">
				<input type="text" id="titleView" name="title" readonly /> 
			</div>
			<!-- Card Details -->
			<div id="noticeDetailsWrap">
				<h2 class="noticeDetails">
					<i class="fas fa-align-left"></i> 내용
				</h2>
			</div>
				<div class="noticeContentView" id="noticeContentView" style="display:block;">
				</div>
				<div class="noticeContent" id="noticeContentEdit"style="display:none;">
					<textarea class="ckeditor" id="summernoteEdit"></textarea>
					<input type="file" name="uploadfile" placeholder="파일 선택" />
				</div>
				<a href= '' class="noticedownload" style = 'text-decoration : none'>
				<input type="button" id="downloadfile" name="downloadfile"value="파일다운로드" style="display:none;"/></a>
				<button class="addDetailsEdit-btn" id="editnotice">수정</button>
				<button class="addDetailsEdit-btn" id="deletenotice"
				onclick="document.getElementById('noticeEdit_modal_contents').style.display='none'">삭제</button>
				<button class="addDetailsEdit-btn" id="okeditnotice"
			onclick="document.getElementById('noticeEdit_modal_contents').style.display='none'" style="display:none;">완료</button>
			<button class="addDetailsEdit-btn" id="editCancelnotice"
			onclick="document.getElementById('noticeEdit_modal_contents').style.display='none'" style="display:none;">취소</button>
		</div>
	</div>

</body>
</html>