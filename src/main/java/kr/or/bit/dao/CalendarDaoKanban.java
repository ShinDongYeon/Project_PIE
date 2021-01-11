package kr.or.bit.dao;

import java.util.List;


import kr.or.bit.dto.calendarKanban;
import kr.or.bit.dto.user;

public interface CalendarDaoKanban {


	public void insertCalendarKanban(String start, String end, String title, String content, Boolean allDay, String color,int project_seq,int card_seq);

	public List<calendarKanban> getCalendarList_Kanban(int project_seq);

}
