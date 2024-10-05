package com.argument.chatMessage;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class Message {
	private String content;
	private String sender;
	private String recipient;
	private String timeStamp;
	
	public Message(String newContent, String newSender, String newRecipient) {
		this.content = newContent;
		this.sender = newSender;
		this.recipient = newRecipient;
		//Sets timeStamp of Message to current time
		this.timeStamp = (ZonedDateTime.now()).format(DateTimeFormatter.ofPattern("MM-dd-yyyy HH:mm"));
	}
	
	//My lombok library was not functioning properly, so I resulted in writing the boiler plate getters setters
	public String getContent() {return this.content;}
	public String getSender() {return this.sender;}
	public String getRecipient() {return this.recipient;}
	public String timeStamp() {return this.timeStamp;}
	
}
