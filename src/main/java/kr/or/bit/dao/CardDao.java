package kr.or.bit.dao;

import java.util.ArrayList;
import java.util.HashMap;

import kr.or.bit.dto.card;

public interface CardDao {
	
	public void updateWholeCard(HashMap<String,Object> cardAndProjectNum);
	
	public ArrayList<card> loadWholeCard(int projectNum);
	
	public void insertKanbanCard(HashMap<String,Object> cardAndProjectNum);
	
	public int getCardSeq(int projectNum);
	
	public void deleteKanbanCard(int cardSeq);
}
