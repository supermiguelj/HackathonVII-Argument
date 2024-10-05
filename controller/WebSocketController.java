package com.argument.websocket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.argument.chatMessage.Message;

// /topic/broadcast is a placeholder for a filepath to the front-end

@Controller
public class WebSocketController {
	
	@Autowired
	private SimpMessagingTemplate msgTemplate;
	/*
	@GetMapping
	//Returns the name of the stomp html template for ThymeLeaf
	public String getWebsocket() {
		return "stomp-broadcast";
	}
	*/
	
	//Maps incoming messages from the /apps/ToUser directory 
	@MessageMapping("/sendToUser")
	//Manages private messages sent from the above destination 
	public void handlePM(@Payload Message newMessage) throws Exception {
		//Gets username of recipient
		String recipientUsername = newMessage.getRecipient();
		
		//Sends message to recipient's private directory (/user/{username}/queue/messages)
		msgTemplate.convertAndSendToUser(recipientUsername, "/queue/messages", newMessage);
	}
}
