package com.lavidastitch.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import java.util.List;

/** Body of POST /api/orders. The validation rules match the checkout form in React. */
public record OrderRequest(
        @NotBlank(message = "Please enter your name.") String name,
        @NotBlank(message = "Please enter your email.") @Email(message = "Enter a valid email address.") String email,
        @Pattern(regexp = "\\d{10}", message = "Enter a 10-digit phone number.") String phone,
        @NotBlank(message = "Please enter your address.") String line1,
        @NotBlank(message = "Please enter your city.") String city,
        @NotBlank(message = "Please enter your state.") String state,
        @Pattern(regexp = "\\d{6}", message = "Enter a 6-digit PIN code.") String pincode,
        @NotBlank(message = "Please choose a payment method.") String paymentMethod,
        @NotEmpty(message = "Your bag is empty.") @Valid List<OrderItemRequest> items) {
}
