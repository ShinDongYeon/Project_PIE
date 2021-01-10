package kr.or.bit.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.CardMemberDao;
import kr.or.bit.dto.user;

/*
파일명: KanbanCardMemberService.java
설명: 칸반 카드마다 담당자 설정 
작성일: 2021-01-10 ~
작성자: 문지연
*/

@Service
public class KanbanCardMemberService {

	@Autowired
	private SqlSession sqlsession;
	
	//get project Member List
	public List<user> projectMemListService(Map<String, Object> projectMemListMap){
		CardMemberDao cardmemdao = sqlsession.getMapper(CardMemberDao.class);
		return cardmemdao.projectMemList(projectMemListMap);
	}
}