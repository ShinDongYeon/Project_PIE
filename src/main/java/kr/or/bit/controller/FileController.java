package kr.or.bit.controller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
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
import org.springframework.web.servlet.View;

import kr.or.bit.dto.file;
import kr.or.bit.service.FileService;
import kr.or.bit.util.HttpDownLoader;

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
	//파일 저장 절대 경로 
	private String UPLOAD_PATH = "/Users/byeonjaehong/Desktop/project3_final_forked/Project_PIE/src/main/webapp/resources/files"; 
		
	//파일 다운로드 컨트롤러 
	@ResponseBody
	@RequestMapping(value = "downloadFile.pie", method = RequestMethod.POST)
	public View downloadFile(@RequestBody file fi, HttpServletResponse response, 
						     HttpServletRequest request) throws IOException {
		
		UPLOAD_PATH += "/file_directory_project_seq_"+fi.getProject_seq();
		String fileName = fi.getFile_uploaded_name();
		System.out.println(fileName);
		System.out.println("플젝번호 : " + fi.getFile_seq());
		System.out.println(UPLOAD_PATH + "/" + fileName);
		System.out.println(UPLOAD_PATH);
		
		File file = new File(UPLOAD_PATH + "/" + fileName); 
		FileInputStream fis = null; BufferedInputStream bis = null; 
		ServletOutputStream sos = null; 
		try { 
			fis = new FileInputStream(file); 
			bis = new BufferedInputStream(fis); 
			sos = response.getOutputStream(); 
			String reFilename = ""; 
			boolean isMSIE = request.getHeader("user-agent").indexOf("MSIE") != -1 || request.getHeader("user-agent").indexOf("Trident") != -1; if(isMSIE) { 
				reFilename = URLEncoder.encode("이미지 파일.jpg", "utf-8"); 
				reFilename = reFilename.replaceAll("\\+", "%20"); 
				
				}else { 
					reFilename = new String("이미지 파일.jpg".getBytes("utf-8"), "ISO-8859-1"); 
				} 
					response.setContentType("application/octet-stream;charset=utf-8"); 
					response.addHeader("Content-Disposition", "attachment;filename=\""+reFilename+"\""); 
					response.setContentLength((int)file.length()); int read = 0; while((read = bis.read()) != -1) { 
						sos.write(read); 
						} 
					}catch(IOException e) { 
						e.printStackTrace(); 
						}finally { 
							try { 
								sos.close(); 
								bis.close(); 
								}catch (IOException e) { 
									e.printStackTrace(); 
									} 
							} 
		return null;
  }	
}
