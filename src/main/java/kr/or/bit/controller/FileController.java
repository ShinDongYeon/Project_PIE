package kr.or.bit.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.log;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.or.bit.service.FileService;


@Controller
public class FileController {
	
	
	@Autowired
	private FileService fileservice;
	
	private final String UPLOAD_PATH = "Project_PIE/src/main/webapp/resources/files"; 
	
	@ResponseBody
	@RequestMapping(value = "file.pie", method = RequestMethod.POST)
	public String uploadFile(@RequestParam("files") ArrayList<MultipartFile> files,
							 @RequestParam("projectNum") int projectNum) {
		
		System.out.println("projectNum : "+projectNum);
		
		System.out.println("file obj : "+files);
		
		for(int i = 0; i < files.size(); i ++) {
			System.out.println(files.get(i).getOriginalFilename());
			
		}
		
	
		File targetFile = new File(UPLOAD_PATH.resolve(multipartFile.getOriginalFilename()).toString()); 
		try { 
			InputStream fileStream = multipartFile.getInputStream(); 
			FileUtils.copyInputStreamToFile(fileStream, targetFile); 
		} catch (IOException e) { 
			FileUtils.deleteQuietly(targetFile); 
			log.error("Failed to upload ", e); }

		
		return "success";
	}
}
