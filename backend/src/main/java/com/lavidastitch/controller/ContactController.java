package com.lavidastitch.controller;

import com.lavidastitch.dto.ContactRequest;
import com.lavidastitch.model.ContactMessage;
import com.lavidastitch.repository.ContactMessageRepository;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** POST /api/contact : saves a message from the Contact page. */
@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;

    public ContactController(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @PostMapping
    public Map<String, String> send(@Valid @RequestBody ContactRequest request) {
        ContactMessage message = new ContactMessage();
        message.setName(request.name().trim());
        message.setEmail(request.email().trim());
        message.setSubject(request.subject());
        message.setMessage(request.message().trim());
        contactMessageRepository.save(message);
        return Map.of("message", "Message received.");
    }
}
