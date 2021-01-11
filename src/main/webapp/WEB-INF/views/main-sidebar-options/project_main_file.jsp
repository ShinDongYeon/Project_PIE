<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<script src="/resources/js/file.js"></script>
</head>
<body>
	<div id="far fa-folder-open" class="right-sidebar-file">
		<!-- drag and drop image -->
		<div class="file-top-wrapper">
			<div class="file-top-icon-wrapper" id = "dropZone">
				<label for="input_file" style = "cursor: pointer;">
				<i class="fas fa-folder-plus file-top-icon"></i>
				</label>
				<div class="file-top-icon-letter">
					Drag and Drop
				</div>			
			</div>
		</div>
				<form name="uploadForm" id="uploadForm" enctype="multipart/form-data" method="get" accept-charset ="UTF-8">
				       <div class="upload-btn-wrapper">
           			   <input type="file" id="input_file" name="files" multiple style="display:none"/>
     				   </div>
				</form>
              		<div class = "new-file-wrapper">
              			
              		</div>
              	<input type="button" class="file-upload-btn" onclick="uploadFile(); return false;" value="업로드">
		
		<!-- file search -->
		<div class="file-search-wrapper">
			<div class="file-search-item-wrapper">
				<div class="file-search-item-letter1">파일명 검색</div>
				<form action="#">
			<!-- 		<select name="#" id="#" class="custom-file-select">
						<option value="#">전체</option>
						<option value="#">?</option>
						<option value="#">??</option>
						<option value="#">???</option>
					</select> -->
					<input id = "file-search-input" class="custom-file-search" type = "text" placeholder = "파일명">
				</form>
			</div>
			<div class="file-search-item-wrapper">
				<div class="file-search-item-letter2">확장자명 검색</div>
				<form action="#">
					<select name="#" id="#" class="custom-file-select">
						<option value="#">전체</option>
						<option value="#">xlsx</option>
						<option value="#">pdf</option>
						<option value="#">ppt</option>
					</select>
				</form>
			</div>
		</div>
		<div id = "fileZone">
		</div>
		<div class = "page-btn-zone">
		 	<!-- <div class = "left-btn"><i class="fas fa-angle-left"></i></div>
			<div class = "btn">1</div>
			<div class = "btn">2</div>
			<div class = "btn">3</div>
			<div class = "btn">4</div>
			<div class = "btn">5</div>
			<div class = "right-btn"><i class="fas fa-angle-right"></i></div> -->
		</div>

		
		<!-- file list -->
<!-- 		<div class="file-list-wrapper">
			<div class="file-list-img">
				<img src="/resources/img/icon/excel.png">
			</div>
			<div class="file-list-letter-wrapper">
				<div class="file-list-letter-title">정산서.xlsx</div>
				<div class="file-list-letter-contents">
					<span>도재구</span>&nbsp;&nbsp;|&nbsp;&nbsp;
					<span>500kb</span>&nbsp;&nbsp;|&nbsp;&nbsp;
					<span>2021.1.1</span>
				</div>
			</div>
			<div class="file-list-cancel">
				<i class="fas fa-times"></i>
			</div>
		</div> -->
		

	</div>
</body>
</html>