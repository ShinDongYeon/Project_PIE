package kr.or.bit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import kr.or.bit.service.PIEChartService;

@Controller
public class PIEChartController {
	
	@Autowired
	private PIEChartService chartservice;
	
	//파이 버튼을 눌러서 해당 프로젝트로 이동 (프로젝트 넘버 가지고)
	@RequestMapping(value = "chart.pie", method = RequestMethod.GET)
	public String goToMain(@RequestParam("projectNum") int projectNum){
				System.out.println("입장한 프로젝트 넘버 : "+projectNum);
				return "chart/chart_main";
		}

}