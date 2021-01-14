package kr.or.bit.dao;

import java.util.List;

import kr.or.bit.dto.calendar;
import kr.or.bit.dto.user;

public interface CalendarDao {

	
	public void insertCalendar(String start, String end, String title, String content, Boolean allDay, String color,int project_seq,int card_seq);
	
	public List<calendar> getCalendarList(int project_seq);
	
	public List<calendar> getCalendarListKanban(String email);
	
	public void editCalendar(String start, String end, String id);
	
	public void deleteCalendar(int id);
	
	public void deleteCalendarKanban(int card_seq);
	
	public void updateCalendar(String start, String end, String title, String content, boolean allDay, String color,String id);
	
	public int getCalendarCount(int projectNum);
	
	
}
