package kr.or.bit.websocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

public class connectsocketHandler extends TextWebSocketHandler{
	
	//로그인한 전체 회원 관리
	List<String> sessionList = new ArrayList<>();
	// 1대1
	private Map<String, HashMap<String,WebSocketSession>> usermap = SessionMaps.getUserMap();
	//Map<String, WebSocketSession> userSessionsMap = new HashMap<>();
	ObjectMapper objectMapper = new ObjectMapper();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		String loginuser = getLoginUser(session);
		//기존에 존재한 회원인지에 대한 유무 검증,
		if (SessionMaps.getUserMap().containsKey(loginuser)) { //기존에 존재해 Map에 저장되어 있었다면,
			usermap.get(loginuser).put(session.getId(),session); // 클라이언트 session값 저장
			System.out.println("채팅방 존재했음");
			
		}else {
			System.out.println("새로 생성된 채팅방"); // 채팅방이 새로 생성되었다면 
			Map<String,WebSocketSession> list = new HashMap<String , WebSocketSession>(); 
			list.put(session.getId(),session); // 클라이언트의 sessionId와 session 객체를 Map에 저장한 후
			usermap.put(loginuser, (HashMap<String, WebSocketSession>) list); // usermap에 Put함으로써 새로운 채팅방 생성
			sessionList.add(loginuser);
		}
		/*
		if(!userSessionsMap.containsKey(loginuser)) {
			//새로운 회원이면 Map에 넣는다
			userSessionsMap.put(loginuser, session);
			sessionList.add(loginuser);
		}
		*/
		/*
		String json = objectMapper.writeValueAsString(sessionList);
		for(Map.Entry m : usermap.get(loginuser).entrySet()) {
			WebSocketSession sess = (WebSocketSession) m.getValue(); 
			sess.sendMessage(new TextMessage(json));
		}
		*/
		
	}

	@Override
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
		String loginuser = getLoginUser(session);
		String json = objectMapper.writeValueAsString(sessionList);
		//for(int i=0; i < usermap.keySet().size(); i++) {
		//	usermap.get();
		//}
		for(String key : usermap.keySet()) {
			for(Map.Entry m : usermap.get(loginuser).entrySet()) {
				WebSocketSession sess = (WebSocketSession) m.getValue(); 
				sess.sendMessage(message);
			}
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws IOException  {
		String loginuser = getLoginUser(session);
		usermap.get(loginuser).remove(session.getId());  // 채팅방에서 클라이언트라 접속을 끊으면, 참여중인 목록에서 session을 삭제한 후
		//session.close();
		//sessionList.remove(loginuser);
		//userSessionsMap.remove(loginuser);
		/*
		String json = objectMapper.writeValueAsString(sessionList);
		for(Map.Entry m : usermap.get(loginuser).entrySet()) {
			WebSocketSession sess = (WebSocketSession) m.getValue(); 
			sess.sendMessage(new TextMessage(json));
		}
		*/
	}

	public String getLoginUser(WebSocketSession session) {
		Map<String, Object> map = session.getAttributes();
		return (String) map.get("loginuser");
		
	}
}
