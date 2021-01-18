package kr.or.bit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.notice;
import kr.or.bit.service.NoticeService;
@Controller
public class NoticeController {
	@Autowired
	private View jsonview;
	@Autowired
	private NoticeService noticeservice;
	
	@RequestMapping(value="noticeInsert.pie", method = RequestMethod.POST)
	public View noticeInsert(@RequestBody notice notice, Model model) {
		try {
			noticeservice.insertNotice(notice);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return jsonview;
	}

}
