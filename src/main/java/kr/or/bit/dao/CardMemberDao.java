package kr.or.bit.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kr.or.bit.dto.cardMember;
import kr.or.bit.dto.user;

public interface CardMemberDao {

	public List<user> projectMemList(Map<String, Object> projectMemListMap);
	
	public void insertCardMem(HashMap<String, Object> cardMemInfo);
	
	/* public ArrayList<cardMember> showMemberByCard(int cardSeq); */
	
	public List<user> showMemberByCard(Map<String, Object> selectedMemInfo);
}
