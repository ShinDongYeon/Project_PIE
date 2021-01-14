package kr.or.bit.service;

import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kr.or.bit.dao.UserDao;

@Service
public class UserProfileService{
	
	@Autowired
	private SqlSession sqlsession;

	//재홍
	private final String UPLOAD_PATH = "/Users/byeonjaehong/Desktop/project3_final_forked/Project_PIE/src/main/webapp/resources/profile"; 
	
	//동연
	//private final String UPLOAD_PATH = "C:\\aaaa\\Project_PIE\\src\\main\\webapp\\resources\\profile";

	//재구
	//private final String UPLOAD_PATH = "C:\\develop\\Spring\\PIE_workspace2\\Project_PIE\\src\\main\\webapp\\resources\\profile"; 
	
	//지연
	//private final String UPLOAD_PATH = "C:\\Users\\jiyeo\\Desktop\\Project_PIE\\src\\main\\webapp\\resources\\profile"; 
	
	//파일 업로드 서비스 
	public void profileUploadService(MultipartFile file, String email) {
		String fileOGName = file.getOriginalFilename();
		String fullName = UPLOAD_PATH+"/"+email+"_"+fileOGName;

			byte[] data;
			try {
				data = file.getBytes();
				//절대경로 + 파일이름 
				FileOutputStream fos = new FileOutputStream(fullName);
				
				//DB INSERT 
				profileUploadToDBMethod(email, fileOGName);
				
				//파일 업로드 
				fos.write(data);
				fos.close();
			} catch (IOException e) {
				System.out.println(e.getMessage());
				e.printStackTrace();
			}
	}
	
	//db에 프로필 정보 저장하는 메서드 
	public void profileUploadToDBMethod(String email, String fullName) {
		UserDao userdao = sqlsession.getMapper(UserDao.class);
		userdao.profileUploadToDB(email, fullName);
	}
	
	//profile 리턴하는 서비
	public String getProfileService(String email){
		UserDao userdao = sqlsession.getMapper(UserDao.class);
		String profile = userdao.getProfile(email);
		return profile;
	}
}