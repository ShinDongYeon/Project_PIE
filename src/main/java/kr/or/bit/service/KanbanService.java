package kr.or.bit.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.CardDao;
import kr.or.bit.dao.ListDao;
import kr.or.bit.dto.card;
import kr.or.bit.dto.list;

/*
파일명: KanbanService.java
설명: KanbanService
작성일: 2020-12-28 ~ 
작성자: 문지연,변재홍
*/

@Service
public class KanbanService {

	@Autowired
	private SqlSession sqlsession;
	

	//칸반 리스트 업데이트 (한개씩)
	public boolean updateKanbanList(HashMap<String,Object> listAndProjectNum) {
		ListDao listdao  = sqlsession.getMapper(ListDao.class);
		listdao.updateKanbanList(listAndProjectNum);
		return true;
	}
	
	//전체 카드 업데이트 (한개씩)
	public boolean updateWholeCard(HashMap<String,Object> cardAndProjectNum) {
		CardDao carddao  = sqlsession.getMapper(CardDao.class);
		carddao.updateWholeCard(cardAndProjectNum);
		return true;
	}
	
	//전체 카드 리턴 
	public ArrayList<card> loadWholeCard(int projectNum) {
		CardDao carddao  = sqlsession.getMapper(CardDao.class);
		ArrayList<card> cardlist = new ArrayList<>();
		cardlist = carddao.loadWholeCard(projectNum);
		return cardlist;
	}

	//전체 리스트 리턴 
	public ArrayList<list> loadWholeList(int projectNum) {
		ListDao listdao  = sqlsession.getMapper(ListDao.class);
		ArrayList<list> listList = new ArrayList<>();
		listList = listdao.loadWholeList(projectNum);
		return listList;
	}
	
	//칸반 리스트 추가 
	public boolean insertKanbanListService(HashMap<String,Object> listInfoAndProjectNum) {
		ListDao listdao  = sqlsession.getMapper(ListDao.class);
		listdao.insertKanbanList(listInfoAndProjectNum);
		return true;
	}
	
	//칸반 리스트 seq 가져오기  
	public int getListSeqService(int projectNum) {
		ListDao listdao  = sqlsession.getMapper(ListDao.class);
		int list_seq = listdao.getListSeq(projectNum);
		return list_seq;
	}
	
	//칸반 리스트 seq 가져오기  
	public int getLastListNumService(int projectNum) {
		ListDao listdao  = sqlsession.getMapper(ListDao.class);
		int list_seq = listdao.getLastListNum(projectNum);
		return list_seq;
	}
	
	//칸반 카드 추가 
	public boolean insertKanbanCardService(HashMap<String,Object> cardInfoAndProjectNum) {
		CardDao carddao  = sqlsession.getMapper(CardDao.class);
		carddao.insertKanbanCard(cardInfoAndProjectNum);
		return true;
	}
	
	//칸반 카드 seq 가져오기  
	public int getCardSeqService(int projectNum) {
		CardDao carddao  = sqlsession.getMapper(CardDao.class);
		int card_seq = carddao.getCardSeq(projectNum);
		return card_seq;
	}
		
	
	
	
}
