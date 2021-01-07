$(function(){
   getEmoticons($('.emoji-area'));
   
   //12. 메시지를 적어서 전송 버튼을 눌렀을때 실행 되는 것
/*
    $('#send').click(()=>{
      //보내는거
      
      if($('#message').val()){
          }
      console.log($('#message').val());
       websocket.send($('#message').val());
      
       if($('#msg_file').val() != ''){
          console.log($('#msg_file').val());
         console.log($('#msg_file')[0].files[0]);
         websocket.send($('#msg_file')[0].files[0]);    

         }
      //받는거 
      websocket.onmessage=(evt)=>{
         writeMsg(evt);
      }
   });
*/

   //엔터치면 전송되는거 
   $('#message').on("keyup", (event) => {
      if (event.keyCode === 13) {
         event.preventDefault();
         $('#send').click();
      }

   });

   $('#fileSend').click(()=>{
      $('#msg_file').click();
   });

let emoji_content = $('.emoji-content');

   // 모달처럼 이모티콘 닫기
   $(document).on('click', (ev) => {
      if(emoji_content.hasClass('appear')){
         switchAnimation(emoji_content);
      }
   });

   // 이모티콘 태그 토글 : 캡쳐링 방지
   $('.smile-o').on('click', (ev) =>{
      ev.stopPropagation();
      switchAnimation(emoji_content);
   });

   // 캡쳐링 방지
   emoji_content.on('click', (ev) => {
      ev.stopPropagation();
   });

       
});

function getEmoticons(target){
   $.ajax(
      {
         url : "../resources/json/emoticon.json",
         type : "GET",
         dataType : "json",
         beforeSend : () => {
            // 보내기 전
         },
         
         complete: (jqXHR, textStatus) => {
            console.log(jqXHR + "/" + textStatus);
         },

         success : (data) => {
            
            console.log( Object.keys(data) );
            
            $.each(data, (key, value) => {
               
               console.log("테마 : " + key);
               console.log("표시 : " + value[0].emoji);   // HTML 엔티티(&#과 10진수;)
               console.log("코드 : " + value[0].code + " / " + "설명 : " + value[0].description);
               console.log("테마별 길이 : " + value.length);
               console.log("------------------------------");

               // 이모티콘 테마 태그
               let emojiBlock = '<hr class="hr-small">'
                           + '<div class="emoji-head" title="'+ key + '">'
                           + '<h5 class="emoji-theme">' + key + '</h5>'
                           + '</div>'
                           + '<hr class="hr-small">'
                           + '<div class="each-list">';

               for(let seq in value){
                  emojiBlock += '<div class="list-item"'
                             + 'id="' + value[seq].no + '" title="' + value[seq].description + '">' 
                             + '<span class="emoticon" onclick="inputEmoji(this)">' + value[seq].emoji + '</span>'
                             + '</div>';
               }
               
               emojiBlock += '<hr class="hr-small">';
               
               target.append(emojiBlock);
            });
         },

         error : (xhr) => {
            console.log("상태코드 : " + xhr.status + " ERROR");
         }
      }
   );
}

// 이모티콘 커서 위치 조정 함수
$.fn.setCursorPosition = function( pos )
{
  this.each( function( index, elem ) {
    if( elem.setSelectionRange ) {
      elem.setSelectionRange(pos, pos);
    } else if( elem.createTextRange ) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  });

  return this;
};


// 이모티콘 리스너
function inputEmoji(me){
   let element = document.getElementById('message');
   let strOriginal = element.value;
   let iStartPos = element.selectionStart;
   let iEndPos = element.selectionEnd;
	
	//이모티콘 1개일 때 확대
	if(me.innerHTML.length == 1 || me.innerHTML.length == 2){
		
	}
   let strFront = "";
   let strEnd = "";

   console.log(iStartPos + " / " + iEndPos);
   if(iStartPos == iEndPos) {
      
      strFront = strOriginal.substring(0, iStartPos);
      strEnd = strOriginal.substring(iStartPos, strOriginal.length);

      console.log(strFront + " / " + strEnd);
   } else return;
   element.value = strFront + me.innerHTML + strEnd;
   console.log(strFront.length + " |자리| " + me.innerHTML.length)
   $('#message').focus().setCursorPosition(strFront.length + me.innerHTML.length);
}

// 이모티콘 켜기/끄기
function switchAnimation(target) {
   if(target.hasClass('appear')){
      target.addClass('disappear');
      setTimeout( () => { 
         target.removeClass('appear'); 
         target.css('display','none'); 
      }, 580 );
   }else {
      target.removeClass('disappear').addClass('appear');
      target.css('display','block');
   }
}