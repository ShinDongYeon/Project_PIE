package kr.or.bit.dto;

import lombok.Data;

@Data
public class calendar {
	
	private String startDate;
	private String endDate;
	private String content;
	private int seq;
	private boolean allDay;
	private String eventColor;
	private String title;
}
