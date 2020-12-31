/*
파일명: kanban-board.js
설명: kanban-board front 
작성일: 2020-12-28 ~
작성자: 문지연
*/

$(document).ready(function(){


    const proTitle = $("#projectTitle");
    const proTitleEdit = $("#projectTitleEdit");
    
    /*Project Title*/
    proTitle.dblclick(function(e){
        e.preventDefault();
        proTitleEdit.val(proTitle.html());
        proTitle.hide();
        proTitleEdit.show();
        proTitleEdit.children("#projectTitle").focus();
    });

    proTitleEdit.submit(function(e){
        e.preventDefault();
        let title = $("#projectTitleInput").val();
        if(title==""){
            title = "NEW PROJECT";
        }
        proTitle.html(title);
        proTitleEdit.hide();
        proTitle.show();
    });

    /*List Title*/
    
    $(document).on("dblclick",".listTitle",function(e){
        e.preventDefault();
        const listTitleEdit = $(this).parent().children(".listTitleEdit");
        listTitleEdit.children(".	listTitleInput").val($(this).html());
        listTitleEdit.children(".listTitleInput").focus();
        $(this).hide();
        $(this).parent().children(".deleteList").hide();
        listTitleEdit.show();
    });

    $(document).on("submit",".listTitleEdit",function(e){
        e.preventDefault();
        const listTitle = $(this).parent().children(".listTitle");
        const lt_val = $(this).children(".listTitleInput").val();
        listTitle.html(lt_val);
        $(this).hide();
        listTitle.show();
        $(this).parent().children(".deleteList").show();
    });


    /*Add Card Label*/
    $(document).on("click",".addCardLabel",function(e){
        e.preventDefault();
        $(this).hide();
        $(this).parent().children("form").show();
        $(this).parent().children("form").children("textarea").focus();
    });

    $(document).on("submit",".addCard",function(e){
        e.preventDefault();
        const cardLabel = $(this).parent().children(".addCardLabel");
        const cardTitleVal = $(this).children(".addCardTitle").val();
        if(cardTitleVal.length>0){
            $(this).parents(".list").children(".cardWrap").append(
                '<div class="cardContent">'+cardTitleVal+'</div>'
                );
        }
        $(this).children(".addCardTitle").val("");
        $(this).hide();
        cardLabel.show();
        $(".cardWrap").sortable({
            connectWith: ".cardWrap",
            placeholder: "card-placeholder"
        });
    });

    const details = document.getElementById("detailsModal");

    $(document).on("click",".cardContent",function(e){
        e.preventDefault();
        details.style.display="block";
    });

    $(document).on("click",".closeModal",function(e){
        e.preventDefault();
        details.style.display="none";
    });

    window.onclick=function(e){
        if(e.target==details){
            details.style.display="none";
        }
    }


    $(document).on("click",".addCard-btn",function(e){
        e.preventDefault();
        $(this).parent(".addCard").submit();
    });

    $(document).on("click","#closeCard",function(e){
        e.preventDefault();
        $(this).parent(".addCard").children(".addCardTitle").val("");
        $(this).parent(".addCard").hide();
        $(this).parents(".cardAddWrap").children(".addCardLabel").show();
    });

    /*Add a List*/
    const addListTitle = $("#addListLabel");
    const addListForm = $("#addList");
    addListTitle.click(function(e){
        e.preventDefault();
        $(this).hide();
        $(this).parent().children("#addList").show();
        $(this).parent().children("#addListTitleInput").focus();
    });

    addListForm.submit(function(e){
        e.preventDefault();
        const listTitle = $("#addListTitleInput").val();
        if(listTitle.length>0){
            $("#listWrap").append(
                '<div class="list">'+
                '<div class="listTitleWrap">'+
                    '<div class="listTitle">'+listTitle+'</div>'+
                    '<span class="deleteList">&times;</span>'+
                    '<form class="listTitleEdit">'+
                        '<input type="text" class="listTitleInput" placeholder="List Title">'+
                    '</form>'+
                '</div>'+
                '<div class="cardWrap"></div>'+
                '<div class="cardAddWrap">'+
                    '<div class="addCardLabel">+ Add another Card</div>'+
                    '<form class="addCard" style="display: none;">'+
                        '<textarea class="addCardTitle" id="addCardTitle" cols="30" rows="10" placeholder="Enter a Card Title"></textarea>'+
                        '<button class="addCard-btn">Add Card</button><span class="close" id="closeCard">&times;</span>'+
                    '</form></div></div>'
            );
        }
        $(this).children("#addListTitleInput").val("");
        addListForm.hide();
        addListTitle.show();
        $(".cardWrap").sortable({
            connectWith: ".cardWrap",
            placeholder: "card-placeholder"
        });
    });

    $(document).on("click",".deleteList",function(e){
        swal({
            title:'Warning',
            text:'Are u sure to delete the List?',
            icon:'warning',
            closeOnClickOutside:false,
            dangerMode : true,
            buttons: {
                cancle : {
                    text : 'Cancel',
                    value : false
                },
                confirm : {
                    text : 'Delete',
                    value : true
                }
            }
        });
    });
    
    

    
    $("#closeList").click(function(e){
        $("#addListTitleInput").val("");
        addListForm.hide();
        addListTitle.show();
    });
    
    
	
	
    $("#listWrap").sortable({
        placeholder: "list-placeholder",
        handle: ".listTitleWrap",
    });

    $(".cardWrap").sortable({
        connectWith: ".cardWrap",
        placeholder: "card-placeholder"
    });
   
});