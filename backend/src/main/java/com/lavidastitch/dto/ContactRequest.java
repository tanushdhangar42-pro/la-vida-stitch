package com.lavidastitch.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/** Body of POST /api/contact */
public record ContactRequest(
        @NotBlank(message = "Please enter your name.") String name,
        @NotBlank(message = "Please enter your email.") @Email(message = "Enter a valid email address.") String email,
        String subject,
        @NotBlank(message = "Please write a message.") String message) {
}
