package kr.or.bit.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kr.or.bit.dao.FileDao;
import kr.or.bit.dao.UserDao;
import kr.or.bit.dto.file;

@Service
public class UserProfileService{
	
	@Autowired
	private SqlSession sqlsession;
	
	//profile 리턴하는 서비
	public String getProfileService(String email){
		UserDao userdao = sqlsession.getMapper(UserDao.class);
		String profile = userdao.getProfile(email);
		return profile;
	}
	
	//파일 저장 절대 경로 
	private final String UPLOAD_PATH = "/Users/byeonjaehong/Desktop/project3_final_forked/Project_PIE/src/main/webapp/resources/profile"; 
	
	//파일 업로드 서비스 
	public boolean profileUploadService(MultipartFile file, String email) {
		String fileOGName = file.getOriginalFilename();
		
		File fileOb = new File(UPLOAD_PATH+"/"+fileOGName);
		
		String upload_file_name = "";
		
		
		/////여기서 디비에서 파일이름 셀렉트 해서 있으면 다른이름으로 바꿔줌 
		/////기존 파일 인서트도 마찬가지로 디비에서 셀렉트 추가 
		
		//파일 이름 중복 시 
		/*
		if(fileOb.exists()) {
			System.out.println("파일 이름 중복");
			String ext = fileOGName.substring(fileOGName.lastIndexOf(".") + 1);
			//파일 이름 뒤에 @ 붙여준 후 업로드 진행 
			String Changed_fileName = fileOGName.substring(0, fileOGName.indexOf("."));
			upload_file_name = Changed_fileName+"@."+ext;
		}else {
			upload_file_name = fileOGName;
		}
		*/
		
		//////////디비에서 파일이름으로 조회 

			byte[] data;
			try {
				data = file.getBytes();
				//절대경로 + 파일이름 
				FileOutputStream fos = new FileOutputStream(UPLOAD_PATH+"/"+email+"_"+upload_file_name);
				
				System.out.println(upload_file_name);
				
				//파일 업로드 
				fos.write(data);
				fos.close();
			} catch (IOException e) {
				System.out.println(e.getMessage());
				e.printStackTrace();
				return false;
			}
		
		return true;
	}
}