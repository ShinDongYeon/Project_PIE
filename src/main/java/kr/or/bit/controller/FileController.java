package kr.or.bit.controller;

import java.util.ArrayList;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;


@Controller
public class FileController {
	
	private final String UPLOAD_PATH = "Project_PIE/src/main/webapp/resources/files"; 
	
	@ResponseBody
	@RequestMapping(value = "file.pie", method = RequestMethod.POST)
	public String uploadFile(@RequestParam("files") ArrayList<MultipartFile> files) {
		
		
		System.out.println(files);
		for(int i = 0; i < files.size(); i ++) {
			System.out.println(files.get(i).getOriginalFilename());
			
		}
		
//		 String filename = file.getName();
//		 String fileOGName =  file.getOriginalFilename();
//		 
//		 System.out.println("파일 og 네임 : "+fileOGName);
//		 System.out.println("파일 네임 : "+filename);
//		 System.out.println("파일 객체 : "+file);

		return "success";
	}
}
