package kr.or.bit.controller;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.card;
import kr.or.bit.dto.list;
import kr.or.bit.service.KanbanService;
import kr.or.bit.service.PIEChartService;
import kr.or.bit.util.KanbanSortHandler;

@Controller
public class PIEChartController {
	
	@Autowired
	private PIEChartService chartservice;
	
	@Autowired
	private KanbanService kanbanservice;
	
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
	
	
	/*전체 진행도 시작*/
	//전체 진행도 가져오기 및 계산하기
	@ResponseBody
	@RequestMapping(value = "getTotalProgress.pie", method = RequestMethod.POST)
	public View getTotalProgress(@RequestParam("projectNum") int projectNum, Model model){
				int checklist_total_count = chartservice.getCheckListCountService(projectNum);
				int checklist_checked_count = chartservice.getCheckListCheckedCountService(projectNum);
				int checklist_unchecked_count = chartservice.getCheckListUnCheckedCountService(projectNum);
				
				//소수점 두자리까지 포맷
				DecimalFormat form = new DecimalFormat("#.##");
				
				String done = form.format(((double)checklist_checked_count/(double)checklist_total_count)*100);
				String inProgress = form.format(((double)checklist_unchecked_count/(double)checklist_total_count)*100);

				Map<String, Object> progress = new HashMap<>();
				progress.put("done", done);
				progress.put("inProgress", inProgress);
				model.addAttribute("progress",progress);
				return jsonview; 
		}
	/*전체 진행도 끝*/
	
	/*리스트 진행도 시작*/
	// 해당 프로젝트의 해당되는 칸반 객체를 뷰에게 전달
	@RequestMapping(value = "getListProgress.pie", method = RequestMethod.POST)
	public View getListProgress(@RequestParam("projectNum") int projectNum, Model model) {

		ArrayList<card> cardlist = kanbanservice.loadWholeCard(projectNum);
		ArrayList<list> listList = kanbanservice.loadWholeList(projectNum);
		ArrayList<list> sortedList = KanbanSortHandler.kanbanSort(cardlist,listList);
			
		// 여기까지 오면 카드까지 정렬됨
		model.addAttribute("listList", sortedList);
		return jsonview;
	}
	/*리스트 진행도 끝*/
}

