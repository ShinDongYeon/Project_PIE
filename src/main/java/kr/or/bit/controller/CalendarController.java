package kr.or.bit.controller;


import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.bit.dto.calendar;
import kr.or.bit.service.CalendarService;
@Controller
public class CalendarController {
	
	private CalendarService calendarservice;
	@Autowired
	public void setCalendarservice(CalendarService calendarservice) {
		this.calendarservice = calendarservice;
	}

	@RequestMapping(value = "fullcalendar.htm", method = RequestMethod.GET)
	public String home() {
			return "calendar_main";
	}
	
	/*
	 * @RequestMapping(value="calendarInsert.pie",method=RequestMethod.POST) public
	 * String calendarInsert(calendar calendar, HttpServletRequest request) {
	 * System.out.println("내용:"+calendar.getContent());
	 * calendarservice.insertCalendar(calendar); String referer =
	 * request.getHeader("Referer"); return "redirect:" + referer; }
	 */
	
	  @ResponseBody  
	  @RequestMapping(value="calendarInsert.pie",method=RequestMethod.POST) public
	  List<calendar> calendarInsert(String start, String end, String title,
	  String content, boolean allDay, String color) {
	  System.out.println("내용:"+start+"/"+end+"/"+title+"/"+content+"/"+
	  allDay+"/"+color);
	  calendarservice.insertCalendar(start,end,title,content,allDay,
	  color); List<calendar> calendarList = null; try {
	  calendarList=calendarservice.calendarList();
	  
	  } catch (Exception e) { e.printStackTrace();
	  System.out.println("에러:"+e.getMessage());
	  
	  } System.out.println(calendarList); return calendarList;
	  
	  }
	 
	
	/*
	 * @RequestMapping(value="calendarInsert.pie",method=RequestMethod.POST) public
	 * void calendarInsert(String startDate, String endDate, String title, String
	 * content, boolean allDay, String eventColor) {
	 * System.out.println("내용:"+startDate+"/"+endDate+"/"+title+"/"+content+"/"+
	 * allDay+"/"+eventColor);
	 * calendarservice.insertCalendar(startDate,endDate,title,content,allDay,
	 * eventColor);
	 * 
	 * 
	 * }
	 */
	
		@RequestMapping(value="calendarUpdate.pie",method=RequestMethod.POST)
		public String calendarUpdate(calendar calendar) {
		System.out.println("내용:"+calendar.getContent());
		try {
			calendarservice.calendarUpdate(calendar);
			System.out.println("번호:"+calendar.getId());
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("에러:"+e.getMessage());
		}
		return "redirect: fullcalendar.htm";
	
	}
	@ResponseBody
	@RequestMapping(value="calendarList.pie", method=RequestMethod.GET)
	public List<calendar> calendarList(){
		List<calendar> calendarList = null;
		try {
			calendarList=calendarservice.calendarList();
			System.out.println("list:"+calendarList);

		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("에러:"+e.getMessage());
			
		}
		return calendarList;
	}
	@ResponseBody
	@RequestMapping(value="calendarEdit.pie", method=RequestMethod.POST)
	public void calendarEdit(String start, String end, String id){
		try {
			SimpleDateFormat org_format = new SimpleDateFormat("EEE MMM dd yyyy HH:mm:ss" ,Locale.ENGLISH);	
			SimpleDateFormat new_format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date startformat = org_format.parse(start);
			Date endformat = org_format.parse(end);
			start =  new_format.format(startformat);
			end =  new_format.format(endformat);
			
			System.out.println("시작:"+start+"/"+"끝:"+end+"/"+"번호:"+id);
			calendarservice.calendarEdit(start, end, id);;
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
			}
	@ResponseBody
	@RequestMapping(value="calendarDelete.pie", method=RequestMethod.POST)
	public void calendarDelete(String id) {
		System.out.println("번호:"+id);
		try {
			calendarservice.calendarDelete(id);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
		
	}
	
}
