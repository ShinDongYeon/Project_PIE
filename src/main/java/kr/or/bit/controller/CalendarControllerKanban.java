package kr.or.bit.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import kr.or.bit.dto.calendarKanban;
import kr.or.bit.service.CalendarServiceKanban;

@Controller
public class CalendarControllerKanban {

	private CalendarServiceKanban calendarservicekanban;

	@Autowired
	public void setCalendarservicekanban(CalendarServiceKanban calendarservicekanban) {
		this.calendarservicekanban = calendarservicekanban;
	}
	@ResponseBody
	@RequestMapping(value = "calendarKanbanInsert.pie", method = RequestMethod.POST)
	public String calendarKanbanInsert(String start, String end, String title, String content, Boolean allDay,
			String color,int project_seq,int card_seq) {
		try {
			calendarservicekanban.insertCalendarKanban(start, end, title, content, allDay, color,project_seq,card_seq);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("에러:" + e.getMessage());
		}
			return "a";
	}


	@ResponseBody
	@RequestMapping(value = "calendarList_Kanban.pie", method = RequestMethod.GET)
	public List<calendarKanban> calendarList_Kanban(int project_seq) {
		List<calendarKanban> calendarList_Kanban = null;
		try {
			calendarList_Kanban = calendarservicekanban.calendarList_Kanban(project_seq);

		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("에러:" + e.getMessage());

		}
		return calendarList_Kanban;
	}





}
