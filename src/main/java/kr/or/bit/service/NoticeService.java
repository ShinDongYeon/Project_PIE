package kr.or.bit.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.NoticeDao;
import kr.or.bit.dto.notice;

@Service
public class NoticeService {
	@Autowired
	private SqlSession sqlsession;
	
	public void insertNotice(notice notice)throws Exception {
		NoticeDao noticedao = sqlsession.getMapper(NoticeDao.class);
		noticedao.insertNotice(notice);
	}
	
	public List<notice> getNoticeList(int project_seq)throws Exception{
		NoticeDao noticedao = sqlsession.getMapper(NoticeDao.class);
		return noticedao.getNoticeList(project_seq);
	}
	public notice getNoticeDatail(int notice_seq)throws Exception{
		NoticeDao noticedao = sqlsession.getMapper(NoticeDao.class);
		return noticedao.getNoticeDetail(notice_seq);
	}
	public int lastNotice_seq()throws Exception{
		NoticeDao noticedao = sqlsession.getMapper(NoticeDao.class);
		return noticedao.lastNotice_seq();
	}
}
