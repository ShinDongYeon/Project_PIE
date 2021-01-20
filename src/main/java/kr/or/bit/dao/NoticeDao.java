package kr.or.bit.dao;

import java.util.List;

import kr.or.bit.dto.notice;

public interface NoticeDao {
	
	public void insertNotice(notice notice);
	
	public List<notice> getNoticeList(int project_seq,int page);
	
	public notice getNoticeDetail(int notice_seq);
	
	public int lastNotice_seq();
	
	public int getNoticeTotalNumber(int project_seq);
	
	public void deleteNoticeByProjectSeq(int project_seq);
}
