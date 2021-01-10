package kr.or.bit.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.user;
import kr.or.bit.service.KanbanCardMemberService;

/*
파일명: KanbanCardMember.java
설명: 칸반 카드마다 담당자 설정 
작성일: 2021-01-10 ~ 
작성자: 문지연
*/

@Controller
public class KanbanCardMember {

	@Autowired
	private View jsonview;

	@Autowired
	private KanbanCardMemberService kbCardMemService;

	// Get Project Member List By ProjectNum
	@ResponseBody
	@RequestMapping(value="getProjectMemList", method = RequestMethod.GET)
	public List<user> projectMemList(@RequestParam("sessionEmail") String sessionEmail,
									HttpServletRequest request){
		//get Project Session
		HttpSession httpsession = request.getSession();
		int projectNum = (int)httpsession.getAttribute("projectNum");
				
		List<user> memberList = null;
		Map<String, Object> projectMemListMap = new HashMap<String, Object>();
		System.out.println("card project Members Controller");
		try {
			projectMemListMap.put("sessionEmail", sessionEmail);
			projectMemListMap.put("projectNum", projectNum);
			memberList = kbCardMemService.projectMemListService(projectMemListMap);
			System.out.println("memberList:::"+memberList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return memberList;
	}
}
