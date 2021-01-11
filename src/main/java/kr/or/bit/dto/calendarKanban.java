package kr.or.bit.dto;

import lombok.Data;

@Data
public class calendarKanban {
	
	private String start;
	private String end;
	private String content;
	private int id;
	private Boolean allDay;
	private String color;
	private String title;
	private int card_seq;
}
