package kr.or.bit.dao;

import java.util.ArrayList;
import java.util.HashMap;

import kr.or.bit.dto.card;
import kr.or.bit.dto.list;

public interface CheckListDao {
	
	public void insertCheckList(HashMap<String,Object> listAndProjectNum);
	
}
