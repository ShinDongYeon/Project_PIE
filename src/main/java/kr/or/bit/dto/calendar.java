package kr.or.bit.dto;

import lombok.Data;

@Data
public class calendar {
	
	private String start;
	private String end;
	private String content;
	private int id;
	private boolean allDay;
	private String color;
	private String title;
}
