package kr.or.bit.dto;

import java.util.List;

import lombok.Data;

@Data
public class alram {
	private String nickName;
	private String title;
	private String state;
	private String alramTime;
	private int alramseq;
	private int project_seq;;
	
	private List<String> memberEmail;

}
