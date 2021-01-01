package kr.or.bit.controller;

import java.util.Locale;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	//index
	@RequestMapping(value = "index.htm", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		return "login";
	}
	
	//로그인 성공 후 projectList 페이지로 이동 
	@RequestMapping(value = "projectList.pie", method = RequestMethod.GET)
	public String projectList() {
		return "projectList";
	}
	
	//회원가입 페이지로 이동 
	@RequestMapping(value = "join.pie", method = RequestMethod.GET)
	public String join() {
		return "user/register";
	}
	
	//비밀번호 찾기 페이지로 이동
	@RequestMapping(value = "findPassword.pie", method = RequestMethod.GET)
	public String findPassword() {
		return "user/pwdForgot";
	}
	
	//이메일 인증 번호 보내고 인증 확인 페이지로 이동 
	@RequestMapping(value = "pwdForgot_emailRequest.pie", method = RequestMethod.GET)
	public String pwdForgot_emailRequest() {
		return "user/pwdForgot_emailRequest";
	}
	
	
}
