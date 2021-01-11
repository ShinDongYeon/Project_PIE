package kr.or.bit.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import kr.or.bit.dao.CalendarDaoKanban;
import kr.or.bit.dto.calendarKanban;


@Service
public class CalendarServiceKanban {
	@Autowired
	private SqlSession sqlsession;
	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}

	public void insertCalendarKanban(String start, String end, String title, String content, Boolean allDay, String color,int project_seq,int card_seq)throws Exception{
		CalendarDaoKanban calendardaoKanban = sqlsession.getMapper(CalendarDaoKanban.class);
		calendardaoKanban.insertCalendarKanban(start,end,title,content,allDay,color,project_seq,card_seq);
	
	}

	public List<calendarKanban> calendarList_Kanban(int project_seq) throws Exception {
		CalendarDaoKanban calendardaoKanban = sqlsession.getMapper(CalendarDaoKanban.class);
		return calendardaoKanban.getCalendarList_Kanban(project_seq);

}
}