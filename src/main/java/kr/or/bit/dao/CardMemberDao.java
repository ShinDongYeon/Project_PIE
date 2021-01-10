package kr.or.bit.dao;

import java.util.List;
import java.util.Map;

import kr.or.bit.dto.user;

public interface CardMemberDao {

	public List<user> projectMemList(Map<String, Object> projectMemListMap);
}
