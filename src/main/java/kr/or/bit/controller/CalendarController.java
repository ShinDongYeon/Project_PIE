package kr.or.bit.controller;


import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

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
			return "fullcalendar";
	}
	
	@RequestMapping(value="calendarInsert.pie",method=RequestMethod.POST)
	public String calendarInsert(calendar calendar) {
		System.out.println("내용:"+calendar.getContent());
		calendarservice.insertCalendar(calendar);
		return "redirect: fullcalendar.htm";
	}
	
		@RequestMapping(value="calendarUpdate.pie",method=RequestMethod.POST)
		public String calendarUpdate(calendar calendar) {
		System.out.println("내용:"+calendar.getContent());
		try {
			calendarservice.calendarUpdate(calendar);
			System.out.println("번호:"+calendar.getSeq());
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

		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("에러:"+e.getMessage());
			
		}
		return calendarList;
	}
	@ResponseBody
	@RequestMapping(value="calendarEdit.pie", method=RequestMethod.POST)
	public void calendarEdit(String startDate, String endDate, String seq){
		try {
			SimpleDateFormat org_format = new SimpleDateFormat("EEE MMM dd yyyy HH:mm:ss" ,Locale.ENGLISH);	
			SimpleDateFormat new_format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date startformat = org_format.parse(startDate);
			Date endformat = org_format.parse(endDate);
			startDate =  new_format.format(startformat);
			endDate =  new_format.format(endformat);
			
			System.out.println("시작:"+startDate+"/"+"끝:"+endDate+"/"+"번호:"+seq);
			calendarservice.calendarEdit(startDate, endDate, seq);;
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
			}
	@ResponseBody
	@RequestMapping(value="calendarDelete.pie", method=RequestMethod.POST)
	public void calendarDelete(String seq) {
		System.out.println("번호:"+seq);
		try {
			calendarservice.calendarDelete(seq);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
		
	}
	
}
