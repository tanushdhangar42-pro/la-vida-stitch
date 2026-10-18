package com.lavidastitch.service;

import com.lavidastitch.dto.OrderItemRequest;
import com.lavidastitch.dto.OrderRequest;
import com.lavidastitch.exception.ApiException;
import com.lavidastitch.model.Order;
import com.lavidastitch.model.OrderItem;
import com.lavidastitch.model.User;
import com.lavidastitch.repository.OrderRepository;
import com.lavidastitch.repository.UserRepository;
import java.security.SecureRandom;
import java.util.List;
import java.util.Set;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Business logic for placing orders: totals, shipping rule and saving to MySQL. */
@Service
public class OrderService {

    private static final Set<String> PAYMENT_METHODS = Set.of("upi", "card", "netbanking", "cod");
    private static final int FREE_SHIPPING_ABOVE = 999;
    private static final int SHIPPING_FEE = 79;
    private static final int COD_FEE = 40;

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final SecureRandom random = new SecureRandom();

    public OrderService(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Order placeOrder(OrderRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Please sign in again."));

        String method = request.paymentMethod().toLowerCase();
        if (!PAYMENT_METHODS.contains(method)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Unknown payment method.");
        }

        Order order = new Order();
        order.setUser(user);
        order.setName(request.name().trim());
        order.setEmail(request.email().trim());
        order.setPhone(request.phone());
        order.setLine1(request.line1().trim());
        order.setCity(request.city().trim());
        order.setState(request.state().trim());
        order.setPincode(request.pincode());
        order.setPaymentMethod(method);

        int subtotal = 0;
        for (OrderItemRequest line : request.items()) {
            OrderItem item = new OrderItem();
            item.setProductId(line.productId());
            item.setName(line.name());
            item.setPatchIds(line.patchIds() == null ? "" : String.join(",", line.patchIds()));
            item.setPatchName(line.patchName());
            item.setSize(line.size());
            item.setColor(line.color());
            item.setQuantity(line.quantity());
            item.setUnitPrice(line.unitPrice());
            order.addItem(item);
            subtotal += line.unitPrice() * line.quantity();
        }

        // The totals are calculated on the server, not trusted from the browser.
        int shipping = (subtotal == 0 || subtotal >= FREE_SHIPPING_ABOVE) ? 0 : SHIPPING_FEE;
        int codFee = method.equals("cod") ? COD_FEE : 0;
        order.setSubtotal(subtotal);
        order.setShipping(shipping);
        order.setCodFee(codFee);
        order.setTotal(subtotal + shipping + codFee);
        order.setOrderCode(newOrderCode());

        return orderRepository.save(order);
    }

    public List<Order> ordersOf(String userEmail) {
        return orderRepository.findByUserEmailOrderByCreatedAtDesc(userEmail);
    }

    private String newOrderCode() {
        String code;
        do {
            code = "LVS" + (100000 + random.nextInt(900000));
        } while (orderRepository.existsByOrderCode(code));
        return code;
    }
}
