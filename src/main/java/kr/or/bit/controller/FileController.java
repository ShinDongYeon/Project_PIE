package kr.or.bit.controller;

import java.io.IOException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.file;
import kr.or.bit.service.FileService;

@Controller
public class FileController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private FileService fileservice;
	
	
	//파일 저장 컨트롤러
	@ResponseBody
	@RequestMapping(value = "file.pie", method = RequestMethod.POST)
	public String uploadFile(@RequestParam("files") ArrayList<MultipartFile> files,
							 @RequestParam("projectNum") int projectNum,
							 @RequestParam("nick") String nick) throws IOException {
		
		boolean check = fileservice.fileUploadService(files, projectNum, nick);
		System.out.println(nick);
		
		if(check) {
			System.out.println("파일 업로드 성공");
			return "success";
		}else {
			System.out.println("파일 업로드 실패");
			return "fail";
		}
  }
	
	
	//파일 리턴 컨트롤러  
	@ResponseBody
	@RequestMapping(value = "showFile.pie", method = RequestMethod.POST)
	public View showFile(@RequestParam("projectNum") int projectNum,
						 Model model) throws IOException {
				
		ArrayList<file> files = fileservice.getFileService(projectNum);
		model.addAttribute("files", files);
	
		return jsonview;
  }
	
	@ResponseBody
	@RequestMapping(value = "downloadFile.pie", method = RequestMethod.POST)
	public String downloadFile() throws IOException {
		return null;
  }
	


}