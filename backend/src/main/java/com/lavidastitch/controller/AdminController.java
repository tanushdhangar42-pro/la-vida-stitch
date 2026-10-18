package com.lavidastitch.controller;

import com.lavidastitch.model.ContactMessage;
import com.lavidastitch.model.Order;
import com.lavidastitch.repository.ContactMessageRepository;
import com.lavidastitch.repository.OrderRepository;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** ADMIN only (see SecurityConfig): GET /api/admin/orders and GET /api/admin/messages */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final OrderRepository orderRepository;
    private final ContactMessageRepository contactMessageRepository;

    public AdminController(OrderRepository orderRepository, ContactMessageRepository contactMessageRepository) {
        this.orderRepository = orderRepository;
        this.contactMessageRepository = contactMessageRepository;
    }

    @GetMapping("/orders")
    public List<Order> orders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    @GetMapping("/messages")
    public List<ContactMessage> messages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }
}
