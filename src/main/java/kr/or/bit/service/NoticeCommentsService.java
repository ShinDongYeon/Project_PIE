package kr.or.bit.service;

import java.util.ArrayList;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.NoticeCommentsDao;
import kr.or.bit.dto.noticeComments;

@Service
public class NoticeCommentsService {

	@Autowired
	private SqlSession sqlsession;
	
	//댓글 등록
	public boolean insertNoticeComments(noticeComments noticecomments) {
		NoticeCommentsDao noticecommentsdao = sqlsession.getMapper(NoticeCommentsDao.class);
		noticecommentsdao.insertComments(noticecomments);
		return true;
	}
	
	//댓글 로드
	public ArrayList<noticeComments> loadNoticeComments(int notice_seq){
		NoticeCommentsDao noticecommentsdao = sqlsession.getMapper(NoticeCommentsDao.class);
		ArrayList<noticeComments> commentsList = new ArrayList<>();
		commentsList = noticecommentsdao.loadComments(notice_seq);
		return commentsList;
	}
	
	//댓글 삭제
	public void deleteNoticeComments(int notice_comments_seq) {
		NoticeCommentsDao noticecommentsdao = sqlsession.getMapper(NoticeCommentsDao.class);
		noticecommentsdao.deleteNoticeComments(notice_comments_seq);
	}
	
	//댓글 수정
	public void updateNoticeComments(noticeComments noticecomments) {
		NoticeCommentsDao noticecommentsdao = sqlsession.getMapper(NoticeCommentsDao.class);
		noticecommentsdao.updateNoticeComments(noticecomments);
	}
	
}
