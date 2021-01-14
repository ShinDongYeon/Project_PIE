package kr.or.bit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import kr.or.bit.service.PIEChartService;

@Controller
public class PIEChartController {
	
	@Autowired
	private PIEChartService chartservice;
	
	@Autowired
	private View jsonview;
	
	@RequestMapping(value = "chart.pie", method = RequestMethod.GET)
	public String goToChart(@RequestParam("projectNum") int projectNum){
				return "chart/chart_main";
		}
	
	/*파이규모 차트*/
	//리스트 개수 가져오기 
	@ResponseBody
	@RequestMapping(value = "getListCount.pie", method = RequestMethod.POST)
	public View getListCount(@RequestParam("projectNum") int projectNum, Model model){
				int list_count = chartservice.getListCountService(projectNum);
				model.addAttribute("list_count",list_count);
				return jsonview; 
		}
	
	//카드 개수 가져오기 
	@ResponseBody
	@RequestMapping(value = "getCardCount.pie", method = RequestMethod.POST)
	public View getCardCount(@RequestParam("projectNum") int projectNum, Model model){
				int card_count = chartservice.getCardCountService(projectNum);
				model.addAttribute("card_count",card_count);
				return jsonview; 
		}
	
	//체크리스트 개수 가져오기 
	@ResponseBody
	@RequestMapping(value = "getCheckListCount.pie", method = RequestMethod.POST)
	public View getCheckListCount(@RequestParam("projectNum") int projectNum, Model model){
				int checklist_count = chartservice.getCheckListCountService(projectNum);
				model.addAttribute("checklist_count",checklist_count);
				return jsonview; 
		}
	
	//멤버 수 가져오기 
	@ResponseBody
	@RequestMapping(value = "getMemberCount.pie", method = RequestMethod.POST)
	public View getMemberCount(@RequestParam("projectNum") int projectNum, Model model){
				int member_count = chartservice.getMemberCountService(projectNum);
				model.addAttribute("member_count",member_count);
				return jsonview; 
		}
	
	//캘린더 수 가져오기 
	@ResponseBody
	@RequestMapping(value = "getCalendarCount.pie", method = RequestMethod.POST)
	public View getCalendarCount(@RequestParam("projectNum") int projectNum, Model model){
				int calendar_count = chartservice.getCalendarCountService(projectNum);
				model.addAttribute("calendar_count",calendar_count);
				return jsonview; 
		}
	/*파이규모 끝*/
}

