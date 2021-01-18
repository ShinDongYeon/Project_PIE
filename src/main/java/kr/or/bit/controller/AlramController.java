package kr.or.bit.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.alram;
import kr.or.bit.dto.list;
import kr.or.bit.dto.project_member;
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
			System.out.println("메일메일:"+alramList);
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
		alram.setMemberEmail(memberEmail);
		try {
			alramservice.insertAlram(alram);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonview;
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

	/*
	  @ResponseBody
	  @RequestMapping(value = "projectMemberList.pie", method = RequestMethod.GET)
	  public List<String> projectMemberList(){
	  			List<String> projectMemberList = null; 
	  try { 
		  projectMemberList = alramservice.projectMemberList(); 
	  } catch (Exception e) {
	  e.printStackTrace(); }
	  	System.out.println("멤버리스트"+projectMemberList);
	  return projectMemberList; 
	  }
	 */
}
