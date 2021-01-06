package kr.or.bit.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class FileController {

	@RequestMapping(value = "file.pie", method = RequestMethod.POST)
	public String uploadFile(MultipartFile multipartFile) {
//		 //파일 저장 경로 
//		 String uploadPath = "Project_PIE/src/main/webapp/resources/files";
//		 
//		 System.out.println("파일 객체 : "+file);
//		 System.out.println("파일명 : "+file.getOriginalFilename());
//		 
//	     String fileName = file.getOriginalFilename();
//	        File target = new File(uploadPath, fileName);
//	        
//	        //경로 생성
//	        if ( ! new File(uploadPath).exists()) {
//	            new File(uploadPath).mkdirs();
//	        }
//	        //파일 복사
//	        try {
//	            FileCopyUtils.copy(file.getBytes(), target);
//	        } catch(Exception e) {
//	            e.printStackTrace();
//	        }
	
		
		System.out.println("==================");
		System.out.println("파일 객체 : "+multipartFile);

		return null;
	}

	

}
