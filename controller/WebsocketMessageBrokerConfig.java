package com.argument.websocket.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebsocketMessageBrokerConfig implements WebSocketMessageBrokerConfigurer {
	
	@Override
	//Configures Spring to allow for WebSockets
	public void configureMessageBroker(MessageBrokerRegistry config) {
		config.enableSimpleBroker("/topic");
		config.setApplicationDestinationPrefixes("/app");
	}
	
	@Override
	//Configures Spring to allow for STOMP endpoints
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/broadcast");
	}
}
