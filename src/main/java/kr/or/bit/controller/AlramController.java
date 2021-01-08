package kr.or.bit.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.bit.dto.alram;
import kr.or.bit.dto.project_member;
import kr.or.bit.service.AlramService;

@Controller
public class AlramController {
	private AlramService alramservice;
	@Autowired
	public void setAlramservice(AlramService alramservice) {
		this.alramservice = alramservice;
	}
	
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
	@RequestMapping(value = "alramLastSeq.pie", method = RequestMethod.POST)
	public int alramLastSeq() {
	int alramLastSeq = 0;
	alramLastSeq = alramservice.alramLastSeq();
	System.out.println(alramLastSeq);
	return alramLastSeq;
	}
	
	@ResponseBody
	@RequestMapping(value = "alramDelete.pie", method = RequestMethod.POST)
	public void deleteAlram(int alramseq) {
    System.out.println("삭제1");
	alramservice.alramDelete(alramseq);
	System.out.println("삭제2");

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
