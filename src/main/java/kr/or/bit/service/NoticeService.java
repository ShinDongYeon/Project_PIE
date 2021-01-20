package kr.or.bit.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.NoticeDao;
import kr.or.bit.dto.notice;

/*
파일명: NoticeService.java
설명: 게시판 서비스 
작성일: 2021-01-10 ~ 
작성자: 신동연
*/
@Service
public class NoticeService {
	@Autowired
	private SqlSession sqlsession;
	
	public void insertNotice(notice notice)throws Exception {
		NoticeDao noticedao = sqlsession.getMapper(NoticeDao.class);
		noticedao.insertNotice(notice);
	}
	
	public List<notice> getNoticeList(int project_seq, int page)throws Exception{
		NoticeDao noticedao = sqlsession.getMapper(NoticeDao.class);
		return noticedao.getNoticeList(project_seq,page);
	}
	public notice getNoticeDatail(int notice_seq)throws Exception{
		NoticeDao noticedao = sqlsession.getMapper(NoticeDao.class);
		return noticedao.getNoticeDetail(notice_seq);
	}
	public int lastNotice_seq()throws Exception{
		NoticeDao noticedao = sqlsession.getMapper(NoticeDao.class);
		return noticedao.lastNotice_seq();
	}
	public int getNoticeTotalNumber(int project_seq)throws Exception{
		NoticeDao noticedao = sqlsession.getMapper(NoticeDao.class);
		return noticedao.getNoticeTotalNumber(project_seq);
	}
	public void noticeUpdate(notice notice)throws Exception {
		NoticeDao noticedao = sqlsession.getMapper(NoticeDao.class);
		noticedao.noticeUpdate(notice);
	}
	public void noticeDelete(int notice_seq)throws Exception {
		NoticeDao noticedao = sqlsession.getMapper(NoticeDao.class);
		noticedao.noticeDelete(notice_seq);
	}
}
