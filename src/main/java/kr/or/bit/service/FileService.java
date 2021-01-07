package kr.or.bit.service;

import java.util.HashMap;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kr.or.bit.dao.ListDao;

/*
파일명: KanbanService.java
설명: 칸반 보드에서 리스트와 카드 추가,수정,삭제 및 정렬 작업 후 db에 저장
작성일: 2020-12-28 ~ 2021-01-07
작성자: 문지연,변재홍
*/

@Service
public class FileService {

	@Autowired
	private SqlSession sqlsession;

	// 칸반 리스트 업데이트 (한개씩)
	public boolean updateKanbanList(HashMap<String, Object> listAndProjectNum) {
		ListDao listdao = sqlsession.getMapper(ListDao.class);
		listdao.updateKanbanList(listAndProjectNum);
		return true;
	}
}
