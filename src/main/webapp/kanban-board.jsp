<!-- 
파일명: kanban-board.jsp
설명: kanban-board jsp
작성일: 2020-12-28
작성자: 문지연 -->

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<link rel="stylesheet" href="/resources/css/kanban-board.css">
<!-- <script src="/resources/js/kanban-board.js"></script> -->
<script src="/resources/js/sortKanban.js"></script>
<title>KANBAN-BOARD</title>
</head>
<body>
        <div id="kanbanPage-wrapper">
            <!-- A title of a project -->
            <div id="projectTitleWrap">
                <div id="projectTitle">PROJECT TITLE</div>
                <form id="projectTitleEdit">
                    <input type="text" id="projectTitleInput" placeholder="">
                    <input type="submit" style="display: none;">
                </form>
            </div>
            <!--KANBAN BOARD LISTS-->
       <div id="listWrap">
            <!--Add another List-->
            
        </div>
        <div id="addListWrap">
                <div id="addListLabel">+ Add another List</div>
                <form id="addList">
                    <input type="text" id="addListTitleInput" placeholder="Enter a List Title">
                    <button class="addList-btn">Add List</button><span class="close" id="closeList">&times;</span>
                </form>
            </div>
        </div>
      

        <!--Details Modal-->
        <div id="detailsModal" class="detailsModal">
            <div class="modal-detail">
                <span class="closeModal" id="closeModal">&times;</span>
                <div class="cardTitleMo">Card Title</div>
                <h2><i class="fa fa-check"></i> CheckList</h2>
		            <form id="checkListForm">
		                <i class="fa fa-plus"></i> Add an item
		            </form>
            </div>
        </div>
</body>
</html>