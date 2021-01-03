package kr.or.bit.dao;

import java.util.List;

import kr.or.bit.dto.room;
import kr.or.bit.dto.user;

public interface ChatDao {
	
	 public List<user> chatUserList();
	 
	 public List<user> chatUserListByEmail(String[] user_array);
	 
	 public void insertChattingRoom(String CHATTING_ROOM_NAME);
	 
	 public List<room> getRoomList();
	 
	 public void deleteRoom(int CHATTING_ROOM_SEQ);
	 
	 public void updateRoom(int CHATTING_ROOM_SEQ, String CHATTING_ROOM_NAME);
	 
}
