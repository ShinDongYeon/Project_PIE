package kr.or.bit.controller;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.project;
import kr.or.bit.service.ProjectService;

/*
파일명: ProjectController.java
설명: 프로젝트 추가,수정,삭제 및 정렬 작업 후 db에 저장
작성일: 2020-12-31 ~ 
작성자: 문지연,변재홍
*/
@Controller
public class ProjectController {
	
		@Autowired
		private View jsonview;
		
		@Autowired
		private ProjectService projectservice;

		//Edit project Title
		@ResponseBody
		@RequestMapping(value = "editProjectTitle.pie", method = RequestMethod.POST)
		public View editProjectTitle(@RequestBody project pro, Model model){
					projectservice.editProjectTitleService(pro);
					System.out.println("프로젝트 제목 수정 완료");
					model.addAttribute("data", "success");
					return jsonview;
			}
		
		@RequestMapping(value = "createPIE.pie", method = RequestMethod.POST)
		public String createPIE(project pro){
					projectservice.createPieService(pro);
					System.out.println(pro);
					return "main/main";
			}
		
		@ResponseBody
		@RequestMapping(value = "getPieList.pie", method = RequestMethod.POST)
		public View getPieList(@RequestParam("userEmail")String userEmail, Model model){
					System.out.println("컨트롤러에서 받은 이메일 : "+userEmail);
					ArrayList<project> pieList = projectservice.getPieListService(userEmail);
					
					System.out.println(pieList);
					
					model.addAttribute("pieList",pieList);
			return jsonview;
			}
		
		
		
	}				
