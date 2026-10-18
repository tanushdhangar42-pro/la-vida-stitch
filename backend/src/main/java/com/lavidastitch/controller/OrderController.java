package com.lavidastitch.controller;

import com.lavidastitch.dto.OrderRequest;
import com.lavidastitch.model.Order;
import com.lavidastitch.service.OrderService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Needs login: POST /api/orders (place an order) and GET /api/orders/my (my orders). */
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public Order place(@Valid @RequestBody OrderRequest request, Authentication authentication) {
        return orderService.placeOrder(request, authentication.getName());
    }

    @GetMapping("/my")
    public List<Order> mine(Authentication authentication) {
        return orderService.ordersOf(authentication.getName());
    }
}
