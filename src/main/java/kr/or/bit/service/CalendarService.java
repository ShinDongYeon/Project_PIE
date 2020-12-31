package kr.or.bit.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.CalendarDao;
import kr.or.bit.dto.calendar;


@Service
public class CalendarService {
	@Autowired
	private SqlSession sqlsession;
	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}
	
	public String insertCalendar(calendar calendar) {
		CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
		System.out.println("날짜:"+calendar.getStartDate());
		try {
			calendardao.insertCalendar(calendar);
			System.out.println("날짜2:"+calendar.getEndDate());
			System.out.println("insert성공");
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("에러:"+e.getMessage());
		}
		return "fullcalendar";
	}
	
	public List<calendar> calendarList() throws Exception {
		CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
		return calendardao.getCalendarList();
	}
	
	public void calendarEdit(String startDate, String endDate, String seq) throws Exception {
		CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
		calendardao.editCalendar(startDate,endDate,seq);
	}
	public void calendarDelete(String seq) throws Exception {
		CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
		calendardao.deleteCalendar(seq);
	}
	public void calendarUpdate(calendar calendar) throws Exception {
		CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
		calendardao.updateCalendar(calendar);
	}
}
