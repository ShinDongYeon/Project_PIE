package kr.or.bit.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.bit.dto.room;
import kr.or.bit.dto.user;
import kr.or.bit.service.ChatService;

@Controller
public class ChatController {
	
	@Autowired
	private ChatService chatservice;

	@ResponseBody
	@RequestMapping(value="/ChatMembers", method = RequestMethod.GET)
	public List<user> chatUserList(){
		List<user> memberList = null;
		System.out.println("ChatMembers Controller");
		try {
			memberList = chatservice.chatUserList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return memberList;
	}
	
	@ResponseBody
	@RequestMapping(value="/ChatMembers", method = RequestMethod.POST)
	public List<room> makeRoom(HttpServletRequest request, String[] user_array){
		List<user> memberList = null;
		List<room> roomList = null;
		try {
			memberList = chatservice.chatUserListByEmail(user_array);
			String CHATTING_ROOM_NAME = "";
			
			int index = 0;
			for(user user : memberList) {
				if(memberList.size()-1 == index++) {
					CHATTING_ROOM_NAME += user.getNickName();
				}else {
					CHATTING_ROOM_NAME += user.getNickName() + ",";
				}
			}
			System.out.println("CHATTING_ROOM_NAME: " + CHATTING_ROOM_NAME);
			
			chatservice.insertChattingRoom(CHATTING_ROOM_NAME);
			roomList = chatservice.getRoomList();
			System.out.println("roomList:" + roomList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return roomList;
	}
	
	@ResponseBody
	@RequestMapping(value="/ChatRoomList", method = RequestMethod.GET)
	public List<room> chatRoomList(){
		List<room> chat_room_list = null;
		try {
			chat_room_list = chatservice.getRoomList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return chat_room_list;
	}
	
	@ResponseBody
	@RequestMapping(value="/ChatRoomList", method = RequestMethod.DELETE)
	public void deleteRoom(@RequestParam("CHATTING_ROOM_SEQ") int CHATTING_ROOM_SEQ){
		try {
			chatservice.deleteRoom(CHATTING_ROOM_SEQ);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@ResponseBody
	@RequestMapping(value="/ChatRoomList", method = RequestMethod.PUT)
	public void updateRoom(	@RequestParam("CHATTING_ROOM_SEQ") int CHATTING_ROOM_SEQ,
							@RequestParam("CHATTING_ROOM_NAME") String CHATTING_ROOM_NAME){
		try {
			chatservice.updateRoom(CHATTING_ROOM_SEQ, CHATTING_ROOM_NAME);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
}
