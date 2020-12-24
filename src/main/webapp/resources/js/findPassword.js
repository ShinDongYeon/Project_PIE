//submit 전 검증 변수 : 둘다 true여야 form 전송 가능 
let firstPwdCheck = false;
let doublePwdCheck = false;

//submit 전 검증 함수 
function check(){
	if(!firstPwdCheck){
		alert("비밀번호를 확인해주세요.");
		$("#pwd").val("");
		$("#pwdCheck").val("");
		$("#pwd").focus();
		return false;
	}
	if(!doublePwdCheck){
		alert("비밀번호 확인이 틀렸습니다.");
		$("#pwd").val("");
		$("#pwdCheck").val("");
		$("#pwdCheck").focus();
		return false;
	}
	return true;
}

	$(document).ready(function(){
		//이메일 존재여부 체크 ajax 
		$('#emailCheck').click(function(){
			  $.ajax(
					 {  
						type : "post",
						url  : "searchEmail.do",
						data : { email :$('#email').val()},
						async : false,
						success : function(data){
								if(data.user === null){
									alert("존재하지 않는 이메일 입니다.");
								}else{
									alert("입력하신 이메일로 인증번호를 전송하였습니다.");
									//이메일로 인증번호 전송
									  $.ajax(
											 {  
												type : "post",
												url  : "findPassword.do",
												data : { email :$('#email').val()},
												async : false,
												success : function(data){
													console.log(data);
													//인증번호 텍스트 박스 만들기 
													let success = "<input type = 'text' placeholder = '인증번호' id ='certifyNum' ><input type = 'button' value ='확인' id = 'certifyCheck'>";
													$("#certify").append(success);
													
												} 
											 } 
									       )  
								}
						} 
					 } 
			       )   
		});
		//인증번호 확인
		$(document).on('click', '#certifyCheck', function(){
				if($('#certifyNum').val() === ''){
						alert("인증번호를 입력해주세요.");
						return;
				}
			  $.ajax(
						 {  
							type : "post",
							url  : "certifyCheck.do",
							data : { certifyNum :$('#certifyNum').val()},
							async : false,
							success : function(data){
									console.log(data);
									if(data === "success"){
										//비밀번호 변경폼 동적 생성 
										alert("인증 번호 확인 완료");
										$("#certify").remove();
										$("#emailCheck").remove();
										$(".p").html("비밀번호 변경");
										$('#email').prop('readonly', true);
										$("body").append("<form onsubmit='return check()' action='modifyPassword.do'method='post'><div id = 'pwdDiv'><input type = 'password' id = 'pwd' name = 'pwd' placeholder = '새로운 비밀번호'></div>"+
														 "<div id = 'pwdCheckDiv'><input type = 'password' id = 'pwdCheck' placeholder = '새로운 비밀번호 확인'></div>"+
														 "<div><input type = 'submit' id = 'modifyPwd' value = '비밀번호 변경'></div>"+
														 "<input type = 'hidden' value = "+$('#email').val()+" name = 'email'></form>");
									}else{
										alert("인증실패 !");
									}
							} 
						 } 
				       )   
		});
	
		//검증 확인, 실패 변수 
		let success = "<p class = 'successOrFail' style ='font-size: small; margin : 0; color : blue; padding-top : 0; padding-bottom : 0;'>올바른 형식입니다.</p>";
		let fail = "<p class = 'successOrFail' style ='font-size: small; margin : 0; color : red; padding-top : 0; padding-bottom : 0;'>올바르지 않은 형식입니다.</p>";

		//비밀번호 정규표현식 
		//8 ~ 16자 영문, 숫자, 특수문자 각 1개 이상 조합
		function isPassword(asValue) {
			let regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
			return regExp.test(asValue);
		}

		//비밀번호 정규표현 확인 함수
			$(document).on('keyup', '#pwd', function(){
			console.log(firstPwdCheck);
			console.log($("#pwd").val())
			if($("#pwd").val().search(/\s/) != -1){
				alert("공백은 허용되지 않습니다.");
				$("#pwd").val("");
			}
			if(isPassword($("#pwd").val())){
				$(".successOrFail").remove();
				$("#pwdDiv").append(success);
				firstPwdCheck = true;
			}else{
				$(".successOrFail").remove();
				$("#pwdDiv").append(fail);
				firstPwdCheck = false;
			}
		});
		//비밀번호 2차 확인 함수
			$(document).on('keyup', '#pwdCheck', function(){
			if($("#pwdCheck").val().search(/\s/) != -1){
				alert("공백은 허용되지 않습니다.");
				$("#pwdCheck").val("");
			}
			if($("#pwd").val()===$("#pwdCheck").val()){
				$(".pwdCheckMessage").remove();
				$("#pwdCheckDiv").append("<p class = 'pwdCheckMessage' style ='font-size: small; margin : 0; color : blue; padding-top : 0; padding-bottom : 0;'>비밀번호와 동일합니다.</p>");
				doublePwdCheck = true;
			}else{
				$(".pwdCheckMessage").remove();
				$("#pwdCheckDiv").append("<p class = 'pwdCheckMessage' style ='font-size: small; margin : 0; color : red; padding-top : 0; padding-bottom : 0;'>비밀번호와 동일하지않습니다.</p>");
				doublePwdCheck = false;
			}
		});
	});