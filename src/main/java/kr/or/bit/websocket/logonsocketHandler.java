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
	
	Map<String, WebSocketSession> userSessionsMap = new HashMap<>();
	ObjectMapper objectMapper = new ObjectMapper();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("afterConnectionEstablished: "+session);
		String loginuser = getLoginUser(session);
		//기존에 존재한 회원인지에 대한 유무 검증,
		if(!userSessionsMap.containsKey(loginuser)) {
			//새로운 회원이면 Map에 넣는다
			userSessionsMap.put(loginuser, session);
		}
		String json = objectMapper.writeValueAsString(userSessionsMap.keySet());
		for(Map.Entry m : userSessionsMap.entrySet()) {
			WebSocketSession sess = (WebSocketSession) m.getValue(); 
			sess.sendMessage(new TextMessage(json));
		}
		
		System.out.println("loginuser: " + loginuser);
		System.out.println("sessionList: " + userSessionsMap);
		
	}

	@Override
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
		String json = objectMapper.writeValueAsString(userSessionsMap.keySet());
		for(Map.Entry m : userSessionsMap.entrySet()) {
			WebSocketSession sess = (WebSocketSession) m.getValue(); 
			sess.sendMessage(new TextMessage(json));
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws IOException  {
		String loginuser = getLoginUser(session);
		userSessionsMap.remove(loginuser);
		String json = objectMapper.writeValueAsString(userSessionsMap.keySet());
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
