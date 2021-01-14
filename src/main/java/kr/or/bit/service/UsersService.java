package kr.or.bit.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.UsersDao;
import kr.or.bit.dto.users;

@Service
public class UsersService {
	@Autowired
	private SqlSession sqlsession;
	
	public List<users> usersList(int project_seq) throws Exception{
		UsersDao usersdao = sqlsession.getMapper(UsersDao.class);
		return usersdao.getUserList(project_seq);
	}

	
}
