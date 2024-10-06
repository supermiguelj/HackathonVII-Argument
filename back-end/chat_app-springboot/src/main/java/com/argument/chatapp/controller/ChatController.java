package com.argument.chatapp.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.argument.chatapp.model.ChatMessage;

/**
 * Controller class for handling chat-related functionality.
 */
@Controller
public class ChatController {

    /**
     * Registers a user for chat.
     * 
     * param chatMessage The chat message containing the sender's information.
     * param headerAccessor The SimpMessageHeaderAccessor object used to access session attributes.
     * return The registered chat message.
     */
    // @MessageMapping("/chat.register")
    // @SendTo("/topic/public")
    // public ChatMessage register(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
    //     headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
    //     return chatMessage;
    // }

    /**
     * Sends a chat message to all connected users.
     * 
     * param chatMessage The chat message to be sent.
     * return The sent chat message.
     */
    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        System.out.print(chatMessage.getSender() + ": ");
        System.out.println(chatMessage.getContent());
        //ChatMessage constructor is never called at all
        //Backend relies on setters to update timeStamp
        chatMessage.setTimeStamp();
        System.out.println(chatMessage.getTimeStamp());
        return chatMessage;
    }
}
