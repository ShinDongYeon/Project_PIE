package kr.or.bit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.bit.dto.users;
import kr.or.bit.service.UsersService;

@Controller
public class UsersController {
	
	@Autowired
	UsersService usersservice;
	
	@ResponseBody
	@RequestMapping (value= "usersList.pie", method = RequestMethod.GET)
	public List<users> usersList(int project_seq){
		List<users> usersList = null;
		try {
			usersList = usersservice.usersList(project_seq);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return usersList;
	}
}
