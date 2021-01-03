package kr.or.bit.util;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

//security login 성공시 동작하는 클래스 및 함수 
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication auth)
			throws IOException, ServletException {

		System.out.println("security login successed");
		HttpSession session = request.getSession();

		// security로 로그인한 사용자 아이디 session에 주입
		session.setAttribute("loginuser", auth.getName());

		response.sendRedirect("main.pie");
	}
}