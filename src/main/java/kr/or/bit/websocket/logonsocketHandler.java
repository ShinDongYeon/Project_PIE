package kr.or.bit.websocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.bit.service.ChatService;

public class logonsocketHandler extends TextWebSocketHandler{
	
	//로그인한 전체 회원 관리
	List<String> sessionList = new ArrayList<>();
	// 1대1
	Map<String, WebSocketSession> userSessionsMap = new HashMap<>();
	ObjectMapper objectMapper = new ObjectMapper();
	
	@Autowired
	private ChatService chatservice;
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("afterConnectionEstablished: "+session);
		String loginuser = getLoginUser(session);
		chatservice.logonUser(loginuser);
		sessionList.add(loginuser);
		userSessionsMap.put(loginuser, session);
		System.out.println("loginuser: " + loginuser);
		System.out.println("sessionList: " + sessionList);
		String json = objectMapper.writeValueAsString(sessionList);
		for(Map.Entry m : userSessionsMap.entrySet()) {
			WebSocketSession sess = (WebSocketSession) m.getValue(); 
			sess.sendMessage(new TextMessage(json));
		}
		
	}

	@Override
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
		String json = objectMapper.writeValueAsString(sessionList);
		for(Map.Entry m : userSessionsMap.entrySet()) {
			WebSocketSession sess = (WebSocketSession) m.getValue(); 
			sess.sendMessage(new TextMessage(json));
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws IOException  {
		String loginuser = getLoginUser(session);
		chatservice.logoutUser(loginuser);
		sessionList.remove(loginuser);
		userSessionsMap.remove(loginuser);
		String json = objectMapper.writeValueAsString(sessionList);
		for(Map.Entry m : userSessionsMap.entrySet()) {
			WebSocketSession sess = (WebSocketSession) m.getValue(); 
			sess.sendMessage(new TextMessage(json));
		}
		
	}

	public String getLoginUser(WebSocketSession session) {
		Map<String, Object> map = session.getAttributes();
		return (String) map.get("loginuser");
	}
}
