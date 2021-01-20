package kr.or.bit.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.alram;
import kr.or.bit.service.AlramService;

@Controller
public class AlramController {
	private AlramService alramservice;
	@Autowired
	public void setAlramservice(AlramService alramservice) {
		this.alramservice = alramservice;
	}
	@Autowired
	private View jsonview;
	
	@ResponseBody
	@RequestMapping(value = "alramList.pie", method = RequestMethod.GET)
	public List<alram> alramList(String email,int project_seq){
		List<alram> alramList = null;
		try {
			alramList = alramservice.alramList(email,project_seq);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return alramList;	
	}
	
	@ResponseBody
	@RequestMapping(value = "alramInsert.pie", method = RequestMethod.POST)
	public View alarmInsert(@RequestBody alram alram,Model model) {
		List<String> memberEmail = alramservice.projectMemberList(alram.getProject_seq());
		memberEmail.remove(alram.getEmail());
		System.out.println("야야야야야"+memberEmail);
		if(!memberEmail.isEmpty()) {
		alram.setMemberEmail(memberEmail);
		try {
			alramservice.insertAlram(alram);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonview;
		}
		return null;
	}
	
	
	@ResponseBody
	@RequestMapping(value = "alramLastSeq.pie", method = RequestMethod.POST)
	public int alramLastSeq() {
	int alramLastSeq = 0;
	alramLastSeq = alramservice.alramLastSeq();
	return alramLastSeq;
	}
	
	@ResponseBody
	@RequestMapping(value = "alramDelete.pie", method = RequestMethod.POST)
	public int deleteAlram(int alramseq,String email,int project_seq) {
	int alarmCount = 0;
	try {
		alramservice.alramDelete(alramseq,email);
		alarmCount = alramservice.alramList(email, project_seq).size();
	} catch (Exception e) {
		e.printStackTrace();
	}
		return alarmCount;
	}

}
