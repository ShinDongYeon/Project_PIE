package kr.or.bit.websocket;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.bit.dto.alram;
import kr.or.bit.dto.user;
import kr.or.bit.service.AlramService;

@Controller
public class websocketHandler extends TextWebSocketHandler{
		//로그인한 전체 회원 관리
		List<WebSocketSession> sessionList = new ArrayList<>();
		// 1대1
		Map<String, WebSocketSession>	userSessionsMap = new HashMap<>();
		ObjectMapper objectMapper = new ObjectMapper();
		private AlramService alramservice;
		@Autowired
		public void setAlramservice(AlramService alramservice) {
			this.alramservice = alramservice;
		}
		//서버에 접속 성공했을때
		@Override
		public void afterConnectionEstablished(WebSocketSession session) {
			System.out.println("afterConnectionEstablished: "+session);
			sessionList.add(session);
			String senderEmail = getLoginUser(session);
			userSessionsMap.put(senderEmail, session);
			System.out.println("연결됨:"+senderEmail);
		}
		@Override
		protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
			System.out.println("받음:"+message);
			String senderId = getLoginUser(session);
			///////////////////////////////////////////////////////
			JSONObject jsonObj = JsonToObjectParser(message.getPayload());
			System.out.println(jsonObj);
			String deleteNum = (String) jsonObj.get("deleteNum");
			String email = (String) jsonObj.get("email");
			String project_num = (String)jsonObj.get("project_seq");
			int project_seq = Integer.parseInt(project_num);
			alram alram = new alram();
			////////////////////////////////////////////////////////
			 if(deleteNum.equals("0")) {
				 List<alram> alramList = alramservice.alramList(email,project_seq);
				 int alramCount = alramList.size()-1;
				 alram.setAlramCount(alramCount);
				 String json = objectMapper.writeValueAsString(alram);
				 for(WebSocketSession sess: sessionList) {
			 sess.sendMessage(new TextMessage(json)); 
			 } 
			 }else {
				String nickName = (String) jsonObj.get("nick");
				String title = (String) jsonObj.get("title");
				String state = (String) jsonObj.get("state");
				String alramTime = (String) jsonObj.get("alramTime");
				String page = jsonObj.get("alramseq").toString();
				int alramseq = Integer.parseInt(page);
				System.out.println("알람seq:"+alramseq);
			List<String> memberEmail = alramservice.projectMemberList(project_seq);
			memberEmail.remove(senderId);
			alram.setNickName(nickName);
			alram.setState(state);
			alram.setTitle(title);
			alram.setAlramTime(alramTime);	
			alram.setMemberEmail(memberEmail);
			alram.setProject_seq(project_seq);
			alram.setAlramseq(alramseq);
			alramservice.insertAlram(alram);//알람 DB insert
			List<alram> alramList = alramservice.alramList(email,project_seq);
			alram.setEmail(email);
			int alramCount = alramList.size();
			int alramLsatSeq = alramservice.alramLastSeq();
			alram.setAlramCount(alramCount);
			String json = objectMapper.writeValueAsString(alram);
			for(WebSocketSession sess: sessionList) {		
					sess.sendMessage(new TextMessage(json));
					}
			 }
		}
		@Override
		public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
			sessionList.remove(session);
			System.out.println("끊김:"+session.getId());
		}
		private String getEmail(WebSocketSession session) {
			Map<String, Object> httpSession = session.getAttributes();
			user loginUser = (user)httpSession.get("user");
			
			if(loginUser == null) {
				return session.getId();
			}else {
				return loginUser.getEmail();
			}
				
		}
		private static JSONObject JsonToObjectParser(String jsonStr) {
			JSONParser parser = new JSONParser();
			JSONObject obj = null;
			try {
				obj = (JSONObject) parser.parse(jsonStr);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			return obj;
		}
		public String getLoginUser(WebSocketSession session) {
			Map<String, Object> map = session.getAttributes();
			return (String) map.get("loginuser");
		}
}
