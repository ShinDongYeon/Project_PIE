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
<link rel="stylesheet"
	href="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="http://code.jquery.com/jquery.min.js"></script>
<script src="http://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<link rel="stylesheet" href="/resources/css/kanban-board.css">
<script src="/resources/js/kanban-board.js"></script>
<title>KANBAN-BOARD</title>
</head>
<body>
        <div id="kanbanPage-wrapper">
            <!-- A title of a project -->
            <div id="projectTitleWrap">
                <div id="projectTitle">KANBAN BOARD</div>
                <form id="projectTitleEdit">
                    <input type="text" id="projectTitleInput" placeholder="Project Title">
                    <input type="submit" style="display: none;">
                </form>
            </div>
            <!--KANBAN BOARD LISTS-->
            <div id="listWrap">
                <!--To-do List-->
                <div class="list"> 
                    <div class="listTitleWrap">
                        <div class="listTitle">To-Do</div>                
                        <span class="deleteList">&times;</span>
                        <form class="listTitleEdit">
                            <input type="text" class="listTitleInput" placeholder="List Title">
                        </form>
                    </div>
                    <!--To-do Card-->
                    <div class="cardWrap"></div>
                    <div class="cardAddWrap">
                        <div class="addCardLabel">+ Add another Card</div>
                        <form class="addCard" style="display: none;">
                            <textarea class="addCardTitle" id="addCardTitle" cols="30" rows="10" placeholder="Enter a Card Title"></textarea>
                            <button class="addCard-btn">Add Card</button><span class="close" id="closeCard">&times;</span>
                        </form>
                    </div>
                </div>
                <!--In progress List-->
                <div class="list">
                    <div class="listTitleWrap">
                        <div class="listTitle">In Progress</div>
                        <span class="deleteList">&times;</span>
                        <form class="listTitleEdit">
                            <input type="text" class="listTitleInput" placeholder="List Title">
                        </form>
                    </div>
                    <!--In progress Card-->
                    <div class="cardWrap"></div>
                    <div class="cardAddWrap">
                        <div class="addCardLabel">+ Add another Card</div>
                        <form class="addCard" style="display: none;">
                            <textarea class="addCardTitle" id="addCardTitle" cols="30" rows="10" placeholder="Card Title"></textarea>
                            <button class="addCard-btn">Add Card</button><span class="close" id="closeCard">&times;</span>
                        </form>
                    </div>
                </div>
                <!--Done List-->
                <div class="list">
                    <div class="listTitleWrap">
                        <div class="listTitle">Done</div>
                        <span class="deleteList">&times;</span>
                        <form class="listTitleEdit">
                            <input type="text" class="listTitleInput" placeholder="List Title">
                        </form>
                    </div>
                    <!--Done Card-->
                    <div class="cardWrap"></div>
                    <div class="cardAddWrap">
                        <div class="addCardLabel">+ Add another Card</div>
                        <form class="addCard" style="display: none;">
                            <textarea class="addCardTitle" id="addCardTitle" cols="30" rows="10" placeholder="Card Title"></textarea>
                            <button class="addCard-btn">Add Card</button><span class="close" id="closeCard">&times;</span>
                        </form>
                    </div>
                </div>
            </div>
            <!--Add another List-->
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