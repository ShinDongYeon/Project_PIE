package kr.or.bit.controller;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.View;
import kr.or.bit.dto.user;
import kr.or.bit.service.UserProfileService;

@Controller
public class UserProfileImageController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private UserProfileService ups;
	
	//프로필 리턴 컨트롤러
	@ResponseBody
	@RequestMapping(value = "getProfile.pie", method = RequestMethod.POST)
	public View uploadFile(@RequestBody user u, Model model) throws IOException {
		String profile = ups.getProfileService(u.getEmail());
		user us = new user();
		us.setProfile(profile);
		System.out.println(profile);
		model.addAttribute("profile", us);
		return jsonview;
  }
	
	//프로필 저장 컨트롤러
	@ResponseBody
	@RequestMapping(value = "uploadProfile.pie", method = RequestMethod.POST)
	public String uploadFile(@RequestParam("profile") MultipartFile file, 
							 @RequestParam("email") String email) throws IOException {
		ups.profileUploadService(file, email);
		return null;
  }
}







