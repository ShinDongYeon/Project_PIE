package kr.or.bit.dao;

import java.util.ArrayList;

import kr.or.bit.dto.cardComments;

public interface CardCommentsDao {
	
	public void insertComments(cardComments comm);
	
	public ArrayList<cardComments> loadComments(int cardSeq);
	
	public void deleteCardComment(int commSeq);
	
}
