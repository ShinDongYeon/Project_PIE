package kr.or.bit.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.AlramDao;
import kr.or.bit.dto.alram;

@Service
public class PIEChartService {
	
	@Autowired
	private SqlSession sqlsession;
	
}
