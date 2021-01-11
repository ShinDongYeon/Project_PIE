package kr.or.bit.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
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
	//파일 이름으로 검색 리턴 컨트롤러   
	@ResponseBody
	@RequestMapping(value = "fileSerchWithName.pie", method = RequestMethod.POST)
	public View fileSerchWithName(@RequestBody file fileName, Model model) throws IOException {
		System.out.println(fileName.getFile_original_name());
		ArrayList<file> files = fileservice.getFileWithOGNameService(fileName.getFile_original_name());
		model.addAttribute("files", files);
		return jsonview;
  }
	
	//파일 다운로드 컨트롤러 
	//다운받을 파일 이름 받고 DownloadView로 이동
	@RequestMapping(value = "fileDownload.pie", method = RequestMethod.GET)
	public ModelAndView download(@RequestParam("project_seq")int project_seq,
								 @RequestParam("file_uploaded_name")String file_uploaded_name,
								 ModelAndView mv) {
		String fullPath = "/Users/byeonjaehong/Desktop/project3_final_forked/Project_PIE/src/main/webapp/resources/files/file_directory_project_seq_"+project_seq + "/" + file_uploaded_name;
		File file = new File(fullPath);
		
		mv.setViewName("downloadView");
		mv.addObject("downloadFile", file);
		return mv;
	}
}
