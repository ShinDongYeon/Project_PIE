package kr.or.bit.dao;

import java.util.HashMap;

public interface CheckListDao {
	
	public void insertCheckList(HashMap<String,Object> checkListInfo);
	
	public int getLastCheckSeq();
}
