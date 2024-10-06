package in.tusharprabhu.chatapp.model;

import lombok.*;

import java.nio.file.FileStore;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
/**
 * Represents a chat message in the chat application.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {
    private String content;
    private String sender;
    private MessageType type;
    private String timeStamp;

    /**
     * Enum representing the type of the chat message.
     */
    public enum MessageType {
        CHAT, LEAVE, JOIN
    }

    public ChatMessage(MessageType t, String s)
    {
        type = t;
        sender = s;
        // this.timeStamp = (ZonedDateTime.now()).format(DateTimeFormatter.ofPattern("MM-dd-yyyy HH:mm"));
    }

    /**
     * Gets the content of the chat message.
     *
     * return the content of the chat message
     */
    public String getContent() {
        return content;
    }

    /**
     * Sets the content of the chat message.
     *
     * param content the content of the chat message
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * Gets the sender of the chat message.
     *
     * return the sender of the chat message
     */
    public String getSender() {
        return sender;
    }

    /**
     * Sets the sender of the chat message.
     *
     * param sender the sender of the chat message
     */
    public void setSender(String sender) {
        this.sender = sender;
    }

    /**
     * Gets the type of the chat message.
     *
     * return the type of the chat message
     */
    public MessageType getType() {
        return type;
    }

    /**
     * Sets the type of the chat message.
     *
     * param type the type of the chat message
     */
    public void setType(MessageType type) {
        this.type = type;
    }

    public String getTimeStamp() 
    {
        return timeStamp;
    }
    public void setTimeStamp() 
    {
        timeStamp = (ZonedDateTime.now()).format(DateTimeFormatter.ofPattern("MM-dd-yyyy HH:mm"));
    }
}
