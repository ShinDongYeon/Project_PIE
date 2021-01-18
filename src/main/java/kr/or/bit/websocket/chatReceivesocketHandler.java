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

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.bit.service.ChatService;

public class chatReceivesocketHandler extends TextWebSocketHandler{
	
	@Autowired
	private ChatService chatservice;
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
	
	}

	@Override
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
		Map<String, Object> pushAlarmMap = new HashMap<String, Object>();
		String select = getCurrentChatRoom(session);
		String loginuser = getLoginUser(session);
		pushAlarmMap.put("select", Integer.parseInt(select));
		pushAlarmMap.put("loginuser", loginuser);
		
		
		while(true) {
			if(chatservice.alarmIsNotNull(pushAlarmMap) != 0) {
				chatservice.pushAlarmNotMe(pushAlarmMap);
				break;
			}
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws IOException  {

	}

	
	
	//채팅방의 정보를 받아오는 함수
	public String getCurrentChatRoom(WebSocketSession session) {
		Map<String, Object> map = session.getAttributes();
		return (String) map.get("select");
	}
	public String getLoginUser(WebSocketSession session) {
		Map<String, Object> map = session.getAttributes();
		return (String) map.get("loginuser");
	}
}
