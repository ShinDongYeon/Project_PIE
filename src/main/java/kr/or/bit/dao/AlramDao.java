package kr.or.bit.dao;

import java.util.List;

import kr.or.bit.dto.alram;
import kr.or.bit.dto.project_member;

public interface AlramDao {

	public void insertAlram(alram alram);
	
	public List<alram> getAlramList(String email);
	
	public int getAlramLastSeq();
	
	public void deleteAlram(int alrmaseq);
	
	public List<String> projectMemberList();

}
