package kr.or.bit.dao;

import java.util.List;

import kr.or.bit.dto.calendar;
import kr.or.bit.dto.user;

public interface CalendarDao {

	public void insertCalendar(calendar calendar);
	
	public List<calendar> getCalendarList();
	
	public void editCalendar(String startDate, String endDate, String seq);
	
	public void deleteCalendar(String seq);
	
	public void updateCalendar(calendar calendar);
}
