package com.argument.chatapp.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.argument.chatapp.model.ChatMessage;

/**
 * Controller class for handling chat-related functionality.
 */
@Controller
public class ChatController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public ChatController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/chat.send")
    // @SendTo("/topic/public")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        // System.out.print(chatMessage.getSender() + ": ");
        // System.out.println(chatMessage.getContent());
        //ChatMessage constructor is never called at all
        //Backend relies on setters to update timeStamp
        chatMessage.setTimeStamp();
        // System.out.println(chatMessage.getTimeStamp());
        // System.out.println(chatMessage.getDestination());
        simpMessagingTemplate.convertAndSend("/topic/" + chatMessage.getDestination(), chatMessage);
    }
}
