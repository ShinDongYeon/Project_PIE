package kr.or.bit.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.ChatDao;
import kr.or.bit.dto.room;
import kr.or.bit.dto.user;

@Service
public class ChatService implements ChatDao{
	
	@Autowired
	private SqlSession sqlsession;

	public List<user> chatUserList(){
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.chatUserList();
	}

	public List<user> chatUserListByEmail(String[] user_array){
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.chatUserListByEmail(user_array);
	}
	
	public void insertChattingRoom(String CHATTING_ROOM_NAME){
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		dao.insertChattingRoom(CHATTING_ROOM_NAME);
	}
	
	public List<room> getRoomList() {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		return dao.getRoomList();
	}
	
	public void deleteRoom(int CHATTING_ROOM_SEQ) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		dao.deleteRoom(CHATTING_ROOM_SEQ);
	}
	
	public void updateRoom(int CHATTING_ROOM_SEQ, String CHATTING_ROOM_NAME) {
		ChatDao dao = sqlsession.getMapper(ChatDao.class);
		dao.updateRoom(CHATTING_ROOM_SEQ, CHATTING_ROOM_NAME);
	}
}