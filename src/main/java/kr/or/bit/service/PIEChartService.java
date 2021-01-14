package kr.or.bit.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.CalendarDao;
import kr.or.bit.dao.CardDao;
import kr.or.bit.dao.CheckListDao;
import kr.or.bit.dao.ListDao;
import kr.or.bit.dao.Project_memberDao;

@Service
public class PIEChartService {
	
	@Autowired
	private SqlSession sqlsession;
	
	//리스트 총 개수 리턴 서비스
	public int getListCountService(int projectNum) {
		ListDao listdao = sqlsession.getMapper(ListDao.class);
		int list_count = listdao.getlListCount(projectNum);
		return list_count;
	}
	//카드 총 개수 리턴 서비스
	public int getCardCountService(int projectNum) {
		CardDao carddao = sqlsession.getMapper(CardDao.class);
		int card_count = carddao.getlCardCount(projectNum);
		return card_count;
	}
	//체크리스트 총 개수 리턴 서비스
	public int getCheckListCountService(int projectNum) {
		CheckListDao checklistdao = sqlsession.getMapper(CheckListDao.class);
		int checklist_count = checklistdao.getlCheckListCount(projectNum);
		return checklist_count;
	}
	//체크리스트 체크된 개수 리턴 서비스
	public int getCheckListCheckedCountService(int projectNum) {
		CheckListDao checklistdao = sqlsession.getMapper(CheckListDao.class);
		int checklist_checked_count = checklistdao.getCheckListCheckedCount(projectNum);
		return checklist_checked_count;
	}
	//체크리스트 체크안된 개수 리턴 서비스
	public int getCheckListUnCheckedCountService(int projectNum) {
		CheckListDao checklistdao = sqlsession.getMapper(CheckListDao.class);
		int checklist_unchecked_count = checklistdao.getCheckListUnCheckedCount(projectNum);
		return checklist_unchecked_count;
	}
	//멤버 수 리턴 서비스
	public int getMemberCountService(int projectNum) {
		Project_memberDao pmdao = sqlsession.getMapper(Project_memberDao.class);
		int member_count = pmdao.getMemberCount(projectNum);
		return member_count;
	}
	//캘린더 수 리턴 서비스 
	public int getCalendarCountService(int projectNum) {
		CalendarDao cdao = sqlsession.getMapper(CalendarDao.class);
		int calendar_count = cdao.getCalendarCount(projectNum);
		return calendar_count;
	}
	
}
