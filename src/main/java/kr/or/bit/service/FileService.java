package kr.or.bit.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mysql.cj.util.StringUtils;

import kr.or.bit.dao.FileDao;
import kr.or.bit.dto.file;

@Service
public class FileService{
	
	@Autowired
	private SqlSession sqlsession;
	
	//파일 저장 절대 경로 
	private final String UPLOAD_PATH = "/Users/byeonjaehong/Desktop/project3_final_forked/Project_PIE/src/main/webapp/resources/files"; 
	
	//파일 업로드 서비스 
	public boolean fileUploadService(ArrayList<MultipartFile> files, int projectNum, String nick) {
		
		//파일 저장 경로 (프로젝트번호 기준)
		String specific_path = "/file_directory_project_seq_"+projectNum;
		
		File fileOb = new File(UPLOAD_PATH+specific_path);
		
		//폴더 존재 여부 
		if(fileOb.isDirectory()) {
			System.out.println("디렉토리 있음");
		}else {
			System.out.println("디렉토리 없음");
			fileOb.mkdir();
		}
		
		for(int i = 1; i <= (files.size()-1); i ++) {
			System.out.println("list size : "+files.size());
			String fileOGName = files.get(i).getOriginalFilename();
			System.out.println(i+" 번째 파일 OG 명 "+fileOGName);
			File fileCheck = new File(UPLOAD_PATH+specific_path+"/"+fileOGName);

		//파일 확장자 
		String ext = fileOGName.substring(fileOGName.lastIndexOf(".") + 1);
		String upload_file_name = "";
		
		//파일 이름 중복 시 
		if(fileCheck.exists()) {
			System.out.println("파일 이름 중복");
			
			//파일 이름 뒤에 @ 붙여준 후 업로드 진행 
			String Changed_fileName = fileOGName.substring(0, fileOGName.indexOf("."));
			upload_file_name = Changed_fileName+"@."+ext;
		}else {
			upload_file_name = fileOGName;
		}
	
		System.out.println("파일 확장자 : "+ext);
		
			byte[] data;
			try {
				System.out.println("확인 : "+files.get(i).getOriginalFilename());
				
				data = files.get(i).getBytes();
				//절대경로 + 프로젝트번호 + 파일이름 
				FileOutputStream fos = new FileOutputStream(UPLOAD_PATH+specific_path+"/"+upload_file_name);
				//파일 업로드 
				fos.write(data);
				
				System.out.println("저장 시간 : "+makeDate());
				 
				file f = new file();
				
				f.setFile_original_name(fileOGName);
				f.setFile_uploaded_name(upload_file_name);
				
				f.setProject_seq(projectNum);
				f.setExtension(ext);
				f.setUpload_date(makeDate());
				f.setNickName(nick);
				//디비에 파일 정보 저장
				fileUploadToDBMethod(f);
				
				fos.close();
			} catch (IOException e) {
				System.out.println(e.getMessage());
				e.printStackTrace();
				return false;
			}
		}
		return true;
	}
	
	//db에 파일 정보 저장하는 메서드 
	public boolean fileUploadToDBMethod(file fi) {

		FileDao filedao = sqlsession.getMapper(FileDao.class);
		filedao.fileUploadToDB(fi);
		return true;
	}
	
	//시간 리턴하는 함수 
	public String makeDate() {
		String nowDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
		return nowDateTime;
	}
	
	//파일 리턴하는 서비스
	public ArrayList<file> getFileService(int projectNum){

		FileDao filedao = sqlsession.getMapper(FileDao.class);
		ArrayList<file> files = filedao.getFile(projectNum);
		return files;
		
	}
	
	//파일 리턴하는 서비스 (이름으로 검색)
	public ArrayList<file> getFileWithOGNameService(String file_og_name){

		FileDao filedao = sqlsession.getMapper(FileDao.class);
		ArrayList<file> files = filedao.getFileWithOGName(file_og_name);
		return files;
		
	}


}