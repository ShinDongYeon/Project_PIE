package kr.or.bit.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kr.or.bit.dto.card;
import kr.or.bit.dto.list;
import kr.or.bit.dto.user;

public interface CardDao {
	
	public void updateWholeCard(HashMap<String,Object> cardAndProjectNum);
	
	public ArrayList<card> loadWholeCard(int projectNum);
	
	public void insertKanbanCard(HashMap<String,Object> cardAndProjectNum);
	
	public int getCardSeq(int projectNum);
	
	public void deleteKanbanCard(int cardSeq);
	
	public void editKanbanCardTitle(card ca);
	
	public void updateCardContent(card ca);
}
