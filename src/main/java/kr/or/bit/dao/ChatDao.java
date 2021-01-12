package kr.or.bit.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kr.or.bit.dto.room;
import kr.or.bit.dto.roomlist;
import kr.or.bit.dto.user;

public interface ChatDao {
	
	 public List<user> chatUserList(Map<String, Object> chatUserListMap);
	 
	 public List<user> chatUserListByEmail(String[] user_array);
	 
	 public List<String> chatUserEmailListByEmailByOrder(String[] user_array);
	 
	 public List<user> selectedUserClose(Map<String, Object> map);
	 
	 public void insertChattingRoom(String chatting_room_name, int projectNum);
	 
	 public room getChattingRoomByName(String chatting_room_name);
	 
	 public void insertChattingRoomList(Map<String, Object> map);
	 
	 public List<room> getRoomList(Map<String, Object> getRoomListMap);
	 
	 public List<room> getRoomList2(Map<String, Object> getRoomListMap);
	 
	 public room getRoomListBySeq(int room_seq);
	 
	 public List<user> selectedUser(Map<String, Object> selectUserMap);
	 
	 public List<user> searchUser(Map<String, Object> searchUserMap);
	 
	 public List<user> searchAnotherUser(Map<String, Object> map);
	 
	 public void hideRoom(Map<String, Object> hideRoomMap);
	 
	 public void unhideRoom(Map<String, Object> unhideRoomMap);
	 
	 public void redirectMessage(int select);
	 
	 public void deleteRoomList(int chatting_room_seq);
	 
	 public void updateRoom(Map<String, Object> updateMap);
	 
	 public List<room> searchRoom(Map<String, Object> searchRoomMap);
	 
	 public List<room> getRoomListByProjectSeq(int projectNum);
	 
	 public List<String> getChattingRoomList(Map<String, Object> chattingRoomListMap);
	 
	 public List<roomlist> getChattingRoomUserListByRoomSeq(int chatting_room_seq);
	 
}
