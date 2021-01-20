package kr.or.bit.dao;

import java.util.ArrayList;

import kr.or.bit.dto.noticeComments;

public interface NoticeCommentsDao {
	
	public void insertComments(noticeComments noticecomments);
	
	public ArrayList<noticeComments> loadComments(int notice_seq);
	
	public void deleteNoticeComments(int comments_seq);
	
	public void updateNoticeComments(noticeComments noticecomments);
	
	public void deleteAllNoticeComments(int notice_seq);
	
}
